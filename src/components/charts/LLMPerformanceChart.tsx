'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { BarRectangleItem } from 'recharts';
import type {
  LLMPortfolioStrategy,
  StrategyKey,
  StrategyConfig,
  PortfolioRow,
  LLMPerformanceChartProps,
  CustomTooltipProps,
} from '@/types/components';
import { getTickerName } from '@/utils';

const STRATEGY_COLORS: Record<string, { color: string; barColor: string }> = {
  chatGPT: { color: '#1e55cc', barColor: 'rgba(37, 99, 235, 0.40)' },
  claude: { color: '#F4A261', barColor: 'rgba(244, 162, 97, 0.40)' },
  grok: { color: '#374151', barColor: 'rgba(55, 65, 81, 0.40)' },
  deepseek: { color: '#4a8fde', barColor: 'rgba(133, 177, 228, 0.45)' },
  spy: { color: '#6B7280', barColor: 'rgba(107, 114, 128, 0.40)' },
};

const PREFERRED_ORDER = [
  'chatGPT',
  'claude',
  'grok',
  'deepseek',
  'spy',
] as const;

const EXPECTED_HOLDINGS_COUNT = 10;
const BAR_ANIMATION_DURATION = 200;
const MOBILE_PX_PER_POINT = 140;
const MOBILE_MIN_CHART_WIDTH = 320;

function getOrderedStrategyKeys(rows: PortfolioRow[]): string[] {
  const availableKeys = new Set<string>();

  for (const row of rows) {
    Object.keys(row.strategyData).forEach((key) => availableKeys.add(key));
  }

  const preferredKeys = PREFERRED_ORDER.filter((key) => availableKeys.has(key));
  const remainingKeys = [...availableKeys]
    .filter(
      (key) =>
        !PREFERRED_ORDER.includes(key as (typeof PREFERRED_ORDER)[number]),
    )
    .sort();

  return [...preferredKeys, ...remainingKeys];
}

const POSITIVE_COLOR = '#16A34A';
const POSITIVE_FILL = 'rgba(22, 163, 74, 0.35)';
const NEGATIVE_COLOR = '#E63030';
const NEGATIVE_FILL = 'rgba(220, 38, 38, 0.35)';
const NEUTRAL_COLOR = '#F2B70A';
const NEUTRAL_FILL = 'rgba(250, 204, 21, 0.45)';

const CUMULATIVE_MONTH_KEY = '__cumulative__';

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});

const MONTH_NAMES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

function monthNumberFromName(monthKey: string): number | null {
  const normalized = monthKey.trim().toLowerCase();
  const index = MONTH_NAMES.findIndex(
    (name) => name === normalized || name.startsWith(normalized),
  );
  return index === -1 ? null : index + 1;
}

function parseMonthKey(
  monthKey: string,
): { year: number; month: number } | null {
  const [first, second] = monthKey.split('-').map(Number);

  const isYearFirst = first > 999;
  const year = isYearFirst ? first : second;
  const month = isYearFirst ? second : first;

  if (!year || !month || month < 1 || month > 12) {
    return null;
  }

  return { year, month };
}

function isCurrentMonth(monthKey: string): boolean {
  if (monthKey === CUMULATIVE_MONTH_KEY) {
    return false;
  }

  const now = new Date();
  const parsed = parseMonthKey(monthKey);
  if (parsed) {
    return (
      parsed.year === now.getFullYear() && parsed.month === now.getMonth() + 1
    );
  }

  return monthNumberFromName(monthKey) === now.getMonth() + 1;
}

function formatMonth(monthKey: string): string {
  if (monthKey === CUMULATIVE_MONTH_KEY) {
    return 'Total';
  }

  const parsed = parseMonthKey(monthKey);
  const base = parsed
    ? monthFormatter.format(new Date(parsed.year, parsed.month - 1, 1))
    : monthKey;

  return `${base}${isCurrentMonth(monthKey) ? '*' : ''}`;
}

function formatPercent(value: number, digits = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`;
}

interface BarLabelProps {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  value?: string | number | boolean | null;
}

function renderBarLabel(isMobile: boolean, labelText: string) {
  return function BarLabel(props: BarLabelProps) {
    const x = Number(props.x);
    const y = Number(props.y);
    const width = Number(props.width);
    const rawHeight = Number(props.height);
    const value = Number(props.value);

    if (!Number.isFinite(value) || !Number.isFinite(rawHeight)) {
      return null;
    }

    // Recharts can hand back a negative height for downward (red) bars, so
    // normalize it before measuring or positioning the label.
    const barHeight = Math.abs(rawHeight);
    if (barHeight <= 0) {
      return null;
    }

    const fontSize = isMobile ? 7 : 9;
    const charWidth = fontSize * 0.62;
    // Bars are vertical, so the label is rotated and its length is the bar height.
    const maxChars = Math.floor((barHeight - 4) / charWidth);
    if (maxChars < 1) {
      return null;
    }

    const fullText = labelText;
    let text = fullText;
    if (fullText.length > maxChars) {
      if (maxChars < 2) {
        return null;
      }
      text = `${fullText.slice(0, maxChars - 1)}…`;
    }

    const centerX = x + width / 2;
    // Anchor at the bottom edge of the bar so the label always reads upward
    // from there, whether the bar points up (green) or down (red).
    const bottomY = Math.max(y, y + rawHeight) - 3;

    return (
      <text
        x={centerX}
        y={bottomY}
        fill="#000000"
        fontSize={fontSize}
        fontWeight={600}
        textAnchor="start"
        dominantBaseline="central"
        transform={`rotate(-90, ${centerX}, ${bottomY})`}
        pointerEvents="none"
      >
        {text}
      </text>
    );
  };
}

function isNeutralReturn(
  value: number,
  spyValue: number,
  isSpy: boolean,
): boolean {
  // SPY is the benchmark, so it can't beat or trail itself.
  if (isSpy || !Number.isFinite(spyValue)) {
    return false;
  }

  const positiveButTrailing = value >= 0 && value <= spyValue;
  const negativeButBeating = value < 0 && value > spyValue;
  return positiveButTrailing || negativeButBeating;
}

function getReturnFill(
  value: number,
  spyValue: number,
  isSpy: boolean,
): string {
  if (isNeutralReturn(value, spyValue, isSpy)) {
    return NEUTRAL_FILL;
  }

  return value >= 0 ? POSITIVE_FILL : NEGATIVE_FILL;
}

function getReturnColor(
  value: number,
  spyValue: number,
  isSpy: boolean,
): string {
  if (isNeutralReturn(value, spyValue, isSpy)) {
    return NEUTRAL_COLOR;
  }

  return value >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR;
}

function sumCumulativePercent(monthlyPercents: number[]): number {
  return monthlyPercents.reduce((total, pct) => total + pct, 0);
}

function toLabel(key: string): string {
  return key === 'spy' ? 'S&P 500' : key.charAt(0).toUpperCase() + key.slice(1);
}

const STOCK_PERFORMANCE_CAP = 25;

function getStockPerformanceStyle(value: number): CSSProperties {
  const ratio =
    Math.min(Math.abs(value), STOCK_PERFORMANCE_CAP) / STOCK_PERFORMANCE_CAP;
  const lightness = 94 - ratio * 30; // 94% (near white) down to 64% (muted) at the cap
  const hue = value >= 0 ? 142 : 4;
  const saturation = 38;

  return {
    backgroundColor: `hsl(${hue} ${saturation}% ${lightness}%)`,
    borderColor: `hsl(${hue} ${saturation}% ${Math.max(lightness - 15, 45)}%)`,
    color: '#1E293B',
  };
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function resolveMonthNumber(monthKey: string): number | null {
  return parseMonthKey(monthKey)?.month ?? monthNumberFromName(monthKey);
}

// The sheet stores bare month names ("March", "August", ...) with no year, so
// years are inferred by walking backward from the most recent row (assumed to
// be the current year) and decrementing whenever the month number wraps.
function buildMonthYears(chartData: PortfolioRow[]): number[] {
  const currentYear = new Date().getFullYear();
  const years = new Array<number>(chartData.length);
  years[chartData.length - 1] = currentYear;

  for (let i = chartData.length - 2; i >= 0; i--) {
    const currentNum = resolveMonthNumber(chartData[i].month);
    const nextNum = resolveMonthNumber(chartData[i + 1].month);
    years[i] =
      currentNum !== null && nextNum !== null && currentNum > nextNum
        ? years[i + 1] - 1
        : years[i + 1];
  }

  return years;
}

function getMonthDateRange(
  monthKey: string,
  chartData: PortfolioRow[],
): { start: string; end: string } | null {
  if (chartData.length === 0) {
    return null;
  }

  const monthYears = buildMonthYears(chartData);

  if (monthKey === CUMULATIVE_MONTH_KEY) {
    const firstMonthNumber = resolveMonthNumber(chartData[0].month);
    if (firstMonthNumber === null) {
      return null;
    }
    return {
      start: toISODate(
        new Date(Date.UTC(monthYears[0], firstMonthNumber - 1, 1)),
      ),
      end: toISODate(new Date()),
    };
  }

  const rowIndex = chartData.findIndex((row) => row.month === monthKey);
  const monthNumber = resolveMonthNumber(monthKey);
  if (rowIndex === -1 || monthNumber === null) {
    return null;
  }

  const year = parseMonthKey(monthKey)?.year ?? monthYears[rowIndex];
  const start = new Date(Date.UTC(year, monthNumber - 1, 1));
  const end = isCurrentMonth(monthKey)
    ? new Date()
    : new Date(Date.UTC(year, monthNumber, 0));

  return { start: toISODate(start), end: toISODate(end) };
}

function CustomTooltip({
  active,
  payload,
  label,
  activeStrategies,
}: CustomTooltipProps) {
  if (!active || !payload?.length || !label) {
    return null;
  }

  const row = payload[0].payload;

  return (
    <div className="rounded-md border border-slate-200 bg-white/95 p-2 text-xs shadow-md backdrop-blur-sm">
      <p className="mb-1 font-semibold text-slate-900">{formatMonth(label)}</p>
      <div className="space-y-1.5">
        {activeStrategies.map((strategy) => {
          const value = Number(row[`${strategy.key}_return`]);
          const spyValue = Number(row.spy_return);

          return (
            <div
              key={strategy.key}
              className="flex items-start justify-between gap-3"
            >
              <span className="font-medium text-slate-700">
                {strategy.label}
              </span>
              <div className="text-right text-slate-700">
                <div
                  style={{
                    color: getReturnColor(
                      value,
                      spyValue,
                      strategy.key === 'spy',
                    ),
                  }}
                >
                  {formatPercent(value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LLMPerformanceChart({ data }: LLMPerformanceChartProps) {
  const chartData = useMemo<PortfolioRow[]>(
    () =>
      data.map((row) => {
        const strategyEntries = Object.entries(row).filter(
          ([key, value]) =>
            key !== 'month' &&
            typeof value === 'object' &&
            value !== null &&
            'return' in value &&
            'stocks' in value,
        ) as Array<[string, LLMPortfolioStrategy]>;

        const flattenedReturns = strategyEntries.reduce<Record<string, number>>(
          (acc, [strategyKey, strategyValue]) => {
            acc[`${strategyKey}_return`] = Number(strategyValue.return);
            return acc;
          },
          {},
        );

        const strategyData = strategyEntries.reduce<
          Record<string, LLMPortfolioStrategy>
        >((acc, [strategyKey, strategyValue]) => {
          if (process.env.NODE_ENV !== 'production' && strategyKey !== 'spy') {
            if (strategyValue.stocks.length !== EXPECTED_HOLDINGS_COUNT) {
              throw new Error(
                `Invalid holdings count for ${strategyKey} in ${row.month}: expected ${EXPECTED_HOLDINGS_COUNT}, got ${strategyValue.stocks.length}.`,
              );
            }
          }
          acc[strategyKey] = strategyValue;
          return acc;
        }, {});

        return {
          month: row.month,
          strategyData,
          ...flattenedReturns,
        };
      }),
    [data],
  );

  const strategies = useMemo<StrategyConfig[]>(() => {
    const orderedReturnKeys = getOrderedStrategyKeys(chartData);
    if (orderedReturnKeys.length === 0) {
      return [];
    }

    return orderedReturnKeys.map((key, _) => {
      const colors = STRATEGY_COLORS[key];

      return {
        key,
        label: toLabel(key),
        color: colors.color,
        barColor: colors.barColor,
      };
    });
  }, [chartData]);

  const displayChartData = useMemo<PortfolioRow[]>(() => {
    if (chartData.length === 0 || strategies.length === 0) {
      return chartData;
    }

    const cumulativeReturns = strategies.reduce<Record<string, number>>(
      (acc, strategy) => {
        const monthly = chartData.map((row) =>
          Number(row[`${strategy.key}_return`]),
        );
        acc[`${strategy.key}_return`] = sumCumulativePercent(monthly);
        return acc;
      },
      {},
    );

    const lastRow = chartData[chartData.length - 1];
    const cumulativeRow: PortfolioRow = {
      month: CUMULATIVE_MONTH_KEY,
      strategyData: { ...lastRow.strategyData },
      ...cumulativeReturns,
    };

    return [cumulativeRow, ...chartData];
  }, [chartData, strategies]);

  const cumulativeHoldingsByStrategy = useMemo<Record<string, string[]>>(() => {
    return chartData.reduce<Record<string, string[]>>((acc, row) => {
      Object.entries(row.strategyData).forEach(
        ([strategyKey, strategyValue]) => {
          const existing = new Set(acc[strategyKey] ?? []);
          strategyValue.stocks.forEach((ticker) => {
            if (typeof ticker === 'string') {
              existing.add(ticker);
            }
          });
          acc[strategyKey] = Array.from(existing);
        },
      );
      return acc;
    }, {});
  }, [chartData]);

  // Tracks which months each ticker was actually held under each strategy, so
  // the cumulative ("All") view can sum only the months a stock was in the
  // portfolio rather than pricing it over the whole date span.
  const strategyTickerMonths = useMemo<
    Record<string, Record<string, string[]>>
  >(() => {
    return chartData.reduce<Record<string, Record<string, string[]>>>(
      (acc, row) => {
        Object.entries(row.strategyData).forEach(
          ([strategyKey, strategyValue]) => {
            const tickerMonths = acc[strategyKey] ?? (acc[strategyKey] = {});
            strategyValue.stocks.forEach((ticker) => {
              if (typeof ticker !== 'string' || !ticker) {
                return;
              }
              const months =
                tickerMonths[ticker] ?? (tickerMonths[ticker] = []);
              months.push(row.month);
            });
          },
        );
        return acc;
      },
      {},
    );
  }, [chartData]);

  const [visibleStrategies, setVisibleStrategies] = useState<
    Record<StrategyKey, boolean>
  >({});
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const chartHasRendered = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  const allVisibleMap = useMemo(
    () =>
      strategies.reduce<Record<string, boolean>>((acc, strategy) => {
        acc[strategy.key] = true;
        return acc;
      }, {}),
    [strategies],
  );

  useEffect(() => {
    if (Object.keys(visibleStrategies).length === 0 && strategies.length > 0) {
      setVisibleStrategies(allVisibleMap);
    }
  }, [allVisibleMap, strategies.length, visibleStrategies]);

  useEffect(() => {
    if (!selectedMonth && chartData.length > 0) {
      setSelectedMonth(chartData[chartData.length - 1].month);
    }
  }, [chartData, selectedMonth]);

  const activeStrategies = useMemo(
    () => strategies.filter((strategy) => visibleStrategies[strategy.key]),
    [strategies, visibleStrategies],
  );

  const visibleStrategyKey = useMemo(
    () => activeStrategies.map((strategy) => strategy.key).join(','),
    [activeStrategies],
  );

  const shouldAnimateBars = !chartHasRendered.current;

  useEffect(() => {
    chartHasRendered.current = true;
  }, [visibleStrategyKey]);

  const maxAbsoluteReturn = useMemo(() => {
    if (activeStrategies.length === 0) {
      return 12;
    }

    const maxVisible = displayChartData.reduce((max, row) => {
      const rowMax = activeStrategies.reduce((innerMax, strategy) => {
        return Math.max(
          innerMax,
          Math.abs(Number(row[`${strategy.key}_return`])),
        );
      }, 0);

      return Math.max(max, rowMax);
    }, 0);

    return Math.max(4, Math.ceil(maxVisible));
  }, [activeStrategies, displayChartData]);

  const yAxisTicks = useMemo(() => {
    const max = maxAbsoluteReturn;
    const positives: number[] = [];
    for (let tick = 5; tick < max; tick += 5) {
      positives.push(tick);
    }
    if (positives[positives.length - 1] !== max) {
      positives.push(max);
    }

    return [...positives.map((tick) => -tick).reverse(), 0, ...positives];
  }, [maxAbsoluteReturn]);

  const handleStrategyToggle = (key: StrategyKey) => {
    setVisibleStrategies((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const selectedRow = useMemo(() => {
    if (!selectedMonth) {
      return null;
    }

    return displayChartData.find((row) => row.month === selectedMonth) ?? null;
  }, [displayChartData, selectedMonth]);

  const [showStockPerformance, setShowStockPerformance] = useState(false);
  const [stockPerformanceCache, setStockPerformanceCache] = useState<
    Record<string, number | null>
  >({});
  const [loadingStockPerformance, setLoadingStockPerformance] = useState(false);

  const selectedRowTickers = useMemo(() => {
    if (!selectedRow) {
      return [];
    }

    const tickerSet = new Set<string>();
    activeStrategies
      .filter((strategy) => strategy.key !== 'spy')
      .forEach((strategy) => {
        const stocks =
          selectedRow.month === CUMULATIVE_MONTH_KEY
            ? (cumulativeHoldingsByStrategy[strategy.key] ?? [])
            : (selectedRow.strategyData[strategy.key]?.stocks ?? []);
        stocks.forEach((ticker) => {
          if (typeof ticker === 'string' && ticker) {
            tickerSet.add(ticker);
          }
        });
      });

    return Array.from(tickerSet);
  }, [selectedRow, activeStrategies, cumulativeHoldingsByStrategy]);

  const selectedRange = useMemo(
    () =>
      selectedRow ? getMonthDateRange(selectedRow.month, chartData) : null,
    [selectedRow, chartData],
  );

  const isCumulativeSelected = selectedRow?.month === CUMULATIVE_MONTH_KEY;

  useEffect(() => {
    if (!showStockPerformance || !selectedRow) {
      return;
    }

    if (isCumulativeSelected) {
      // Sum each ticker's monthly returns instead of pricing it over the
      // whole span, so a stock only counts for the months it was held.
      const requestsByRange = new Map<
        string,
        { start: string; end: string; tickers: Set<string> }
      >();

      activeStrategies
        .filter((strategy) => strategy.key !== 'spy')
        .forEach((strategy) => {
          const tickers = cumulativeHoldingsByStrategy[strategy.key] ?? [];
          tickers.forEach((ticker) => {
            const months = strategyTickerMonths[strategy.key]?.[ticker] ?? [];
            months.forEach((month) => {
              const range = getMonthDateRange(month, chartData);
              if (!range) {
                return;
              }
              const cacheKey = `${range.start}_${range.end}_${ticker}`;
              if (cacheKey in stockPerformanceCache) {
                return;
              }
              const rangeKey = `${range.start}_${range.end}`;
              const entry = requestsByRange.get(rangeKey) ?? {
                start: range.start,
                end: range.end,
                tickers: new Set<string>(),
              };
              entry.tickers.add(ticker);
              requestsByRange.set(rangeKey, entry);
            });
          });
        });

      if (requestsByRange.size === 0) {
        return;
      }

      let cancelled = false;
      setLoadingStockPerformance(true);

      Promise.all(
        Array.from(requestsByRange.values()).map((entry) => {
          const params = new URLSearchParams({
            tickers: Array.from(entry.tickers).join(','),
            start: entry.start,
            end: entry.end,
          });
          return fetch(
            `/llm-portfolio/api/stock-performance/?${params.toString()}`,
          )
            .then((response) => (response.ok ? response.json() : null))
            .then((json) => ({ entry, json }))
            .catch(() => ({ entry, json: null }));
        }),
      )
        .then((results) => {
          if (cancelled) {
            return;
          }
          setStockPerformanceCache((previous) => {
            const next = { ...previous };
            results.forEach(({ entry, json }) => {
              if (!json?.data) {
                return;
              }
              Object.entries(
                json.data as Record<string, number | null>,
              ).forEach(([ticker, value]) => {
                next[`${entry.start}_${entry.end}_${ticker}`] = value;
              });
            });
            return next;
          });
        })
        .finally(() => {
          if (!cancelled) {
            setLoadingStockPerformance(false);
          }
        });

      return () => {
        cancelled = true;
      };
    }

    if (!selectedRange || selectedRowTickers.length === 0) {
      return;
    }

    const missing = selectedRowTickers.filter(
      (ticker) =>
        !(
          `${selectedRange.start}_${selectedRange.end}_${ticker}` in
          stockPerformanceCache
        ),
    );

    if (missing.length === 0) {
      return;
    }

    let cancelled = false;
    setLoadingStockPerformance(true);

    const params = new URLSearchParams({
      tickers: missing.join(','),
      start: selectedRange.start,
      end: selectedRange.end,
    });

    fetch(`/llm-portfolio/api/stock-performance/?${params.toString()}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        if (cancelled || !json?.data) {
          return;
        }
        setStockPerformanceCache((previous) => {
          const next = { ...previous };
          Object.entries(json.data as Record<string, number | null>).forEach(
            ([ticker, value]) => {
              next[`${selectedRange.start}_${selectedRange.end}_${ticker}`] =
                value;
            },
          );
          return next;
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          setLoadingStockPerformance(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    showStockPerformance,
    selectedRow,
    isCumulativeSelected,
    selectedRange,
    selectedRowTickers,
    stockPerformanceCache,
    activeStrategies,
    cumulativeHoldingsByStrategy,
    strategyTickerMonths,
    chartData,
  ]);

  const getTickerReturn = useCallback(
    (strategyKey: string, ticker: string): number | null | undefined => {
      if (isCumulativeSelected) {
        const months = strategyTickerMonths[strategyKey]?.[ticker] ?? [];
        if (months.length === 0) {
          return undefined;
        }

        let sum = 0;
        for (const month of months) {
          const range = getMonthDateRange(month, chartData);
          if (!range) {
            return undefined;
          }
          const value =
            stockPerformanceCache[`${range.start}_${range.end}_${ticker}`];
          if (value === undefined) {
            return undefined;
          }
          if (value === null) {
            continue;
          }
          sum += value;
        }
        return sum;
      }

      if (!selectedRange) {
        return undefined;
      }
      return stockPerformanceCache[
        `${selectedRange.start}_${selectedRange.end}_${ticker}`
      ];
    },
    [
      isCumulativeSelected,
      strategyTickerMonths,
      chartData,
      selectedRange,
      stockPerformanceCache,
    ],
  );

  const mobileChartWidth = useMemo(
    () =>
      Math.max(
        displayChartData.length * MOBILE_PX_PER_POINT,
        MOBILE_MIN_CHART_WIDTH,
      ),
    [displayChartData.length],
  );

  const monthCount = displayChartData.length;

  // Draws a divider between each month's bar group rather than through it,
  // so the boundaries are placed evenly across the plot width instead of
  // at the (band-centered) axis tick coordinates.
  const generateMonthDividers = useCallback(
    ({ offset }: { offset?: { left: number; width: number } }) => {
      if (!offset || monthCount < 2) {
        return [];
      }
      const bandWidth = offset.width / monthCount;
      return Array.from(
        { length: monthCount - 1 },
        (_, index) => offset.left + bandWidth * (index + 1),
      );
    },
    [monthCount],
  );

  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <style jsx global>{`
        .recharts-wrapper:focus,
        .recharts-wrapper:focus-visible,
        .recharts-surface:focus,
        .recharts-surface:focus-visible {
          outline: none !important;
        }

        .recharts-bar-rectangle:focus,
        .recharts-rectangle:focus,
        .recharts-active-dot:focus,
        .recharts-tooltip-cursor:focus {
          outline: none !important;
        }

        .recharts-bar-rectangle:focus-visible,
        .recharts-rectangle:focus-visible,
        .recharts-active-dot:focus-visible,
        .recharts-tooltip-cursor:focus-visible {
          outline: none !important;
        }
      `}</style>
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {strategies.map((strategy) => (
            <div
              key={strategy.key}
              onClick={() => handleStrategyToggle(strategy.key)}
              style={
                {
                  '--strategy-hover-color': strategy.color,
                  color: visibleStrategies[strategy.key]
                    ? strategy.color
                    : undefined,
                } as CSSProperties
              }
              className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 select-none ${
                visibleStrategies[strategy.key]
                  ? 'border-slate-300 bg-slate-100 hover:border-slate-500'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-[var(--strategy-hover-color)]'
              }`}
            >
              {strategy.label}
            </div>
          ))}
        </div>
      </div>

      <div
        className="h-[360px] min-h-[320px] w-full overflow-x-auto overflow-y-hidden md:h-[500px] md:min-h-[420px]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className="h-full"
          style={isMobile ? { width: mobileChartWidth } : { width: '100%' }}
          onMouseDownCapture={(event) => {
            event.preventDefault();
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              key={visibleStrategyKey}
              data={displayChartData}
              margin={{
                top: 10,
                right: isMobile ? 12 : 20,
                left: isMobile ? 0 : 8,
                bottom: 8,
              }}
              accessibilityLayer={false}
              tabIndex={-1}
            >
              <CartesianGrid
                stroke="#94A3B8"
                strokeOpacity={0.18}
                vertical
                verticalCoordinatesGenerator={generateMonthDividers}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                tick={{ fill: '#475569', fontSize: isMobile ? 11 : 12 }}
                tickFormatter={formatMonth}
                minTickGap={isMobile ? 20 : 22}
              />
              <YAxis
                yAxisId="returns"
                orientation="left"
                width={isMobile ? 48 : 60}
                domain={[-maxAbsoluteReturn, maxAbsoluteReturn]}
                ticks={yAxisTicks}
                interval={0}
                tickFormatter={(value) => `${Math.round(Number(value))}%`}
                tickLine={false}
                axisLine={{
                  stroke: '#64748B',
                  strokeOpacity: 0.65,
                  strokeWidth: 1.25,
                }}
                tick={{ fill: '#64748B', fontSize: isMobile ? 11 : 12 }}
              />
              <ReferenceLine
                yAxisId="returns"
                y={0}
                stroke="#64748B"
                strokeOpacity={0.65}
                strokeWidth={1.5}
              />
              <Tooltip
                content={<CustomTooltip activeStrategies={activeStrategies} />}
                cursor={false}
              />
              {activeStrategies.map((strategy) => (
                <Bar
                  key={`${strategy.key}-bar`}
                  yAxisId="returns"
                  dataKey={`${strategy.key}_return`}
                  name={`${strategy.label} Return`}
                  activeBar={false}
                  isAnimationActive={shouldAnimateBars}
                  animationDuration={BAR_ANIMATION_DURATION}
                  animationEasing="ease-out"
                  onClick={(state) =>
                    setSelectedMonth(
                      String(state?.payload?.month ?? selectedMonth),
                    )
                  }
                  fill={POSITIVE_FILL}
                  stroke={strategy.color}
                  strokeOpacity={0.35}
                  radius={[1, 1, 0, 0]}
                  barSize={isMobile ? 10 : 12}
                  label={renderBarLabel(isMobile, strategy.label)}
                  shape={(props: BarRectangleItem) => {
                    const value = Number(
                      props.payload?.[`${strategy.key}_return`],
                    );
                    const spyValue = Number(props.payload?.spy_return);

                    return (
                      <Rectangle
                        {...props}
                        fill={getReturnFill(
                          value,
                          spyValue,
                          strategy.key === 'spy',
                        )}
                        stroke={strategy.color}
                        strokeOpacity={0.9}
                        radius={[1, 1, 0, 0]}
                      />
                    );
                  }}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Holdings {selectedRow ? `- ${formatMonth(selectedRow.month)}` : ''}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            <span className="select-none text-xs font-medium text-slate-500">
              {showStockPerformance && loadingStockPerformance
                ? 'Loading performance…'
                : 'Show stock performance'}
            </span>
            <button
              type="button"
              onClick={() => setShowStockPerformance((previous) => !previous)}
              role="switch"
              aria-checked={showStockPerformance}
              className={`relative inline-flex h-6 w-14 shrink-0 cursor-pointer items-center rounded-md border transition-colors duration-150 ${
                showStockPerformance
                  ? 'border-slate-400 bg-slate-200'
                  : 'border-slate-200 bg-white hover:border-slate-400'
              }`}
            >
              <span
                className={`inline-block h-5 w-7 transform rounded-sm bg-slate-500 transition-transform duration-200 ease-out ${
                  showStockPerformance ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
        {displayChartData.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {displayChartData.map((row) => (
              <button
                key={row.month}
                type="button"
                onClick={() => setSelectedMonth(row.month)}
                className={`cursor-pointer rounded-md border w-14 h-5 text-xs font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 ${
                  selectedMonth === row.month
                    ? 'border-slate-400 bg-slate-200 text-slate-900'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400'
                }`}
              >
                {row.month === CUMULATIVE_MONTH_KEY
                  ? 'All'
                  : formatMonth(row.month)}
              </button>
            ))}
          </div>
        ) : null}
        {selectedRow?.month === CUMULATIVE_MONTH_KEY ? (
          <p className="mt-3 text-xs italic text-slate-500">
            Note: the total is the sum of each month&apos;s returns, not a
            compounded cumulative return.
          </p>
        ) : selectedRow && isCurrentMonth(selectedRow.month) ? (
          <p className="mt-3 text-xs italic text-slate-500">
            * Current month (values are to date)
          </p>
        ) : null}
        {!selectedRow ? (
          <p className="mt-2 text-sm text-slate-600">No month selected.</p>
        ) : activeStrategies.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">
            Enable at least one strategy to view holdings.
          </p>
        ) : (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {activeStrategies
              .filter((strategy) => strategy.key !== 'spy')
              .map((strategy) => {
                const stocks =
                  selectedRow.month === CUMULATIVE_MONTH_KEY
                    ? (cumulativeHoldingsByStrategy[strategy.key] ?? [])
                    : (selectedRow.strategyData[strategy.key]?.stocks ?? []);
                const tickers = Array.isArray(stocks)
                  ? stocks.filter(
                      (value): value is string => typeof value === 'string',
                    )
                  : [];

                return (
                  <article
                    key={`${selectedRow.month}-${strategy.key}`}
                    className="rounded-lg border border-slate-200 bg-white p-[0.95rem]"
                  >
                    <h3 className="cursor-pointer text-[15px] font-medium text-slate-900">
                      {strategy.label}
                    </h3>
                    {tickers.length === 0 ? (
                      <p className="mt-2 text-xs text-slate-500">
                        No holdings listed.
                      </p>
                    ) : (
                      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {tickers.map((ticker) => {
                          const tickerReturn = showStockPerformance
                            ? getTickerReturn(strategy.key, ticker)
                            : undefined;
                          const hasReturn =
                            typeof tickerReturn === 'number' &&
                            Number.isFinite(tickerReturn);
                          const performanceStyle =
                            showStockPerformance && hasReturn
                              ? getStockPerformanceStyle(tickerReturn)
                              : undefined;

                          return (
                            <div
                              key={`${strategy.key}-${ticker}`}
                              className="group relative"
                            >
                              <span
                                className={`relative block h-[1.69rem] cursor-default overflow-hidden rounded-md border px-2.5 font-medium transition-colors duration-150 sm:h-[1.94rem] select-none ${
                                  performanceStyle
                                    ? ''
                                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                                }`}
                                style={performanceStyle}
                                aria-label={`${ticker}: ${getTickerName(ticker)}${
                                  hasReturn
                                    ? `, ${formatPercent(tickerReturn, 1)}`
                                    : ''
                                }`}
                              >
                                <span className="absolute inset-y-0 inset-x-0 flex items-center justify-center [container-type:inline-size]">
                                  <span
                                    className={`inline-flex transition-transform duration-300 ease-out will-change-transform ${
                                      showStockPerformance
                                        ? 'text-xs sm:text-sm'
                                        : 'text-sm sm:text-base'
                                    }`}
                                    style={{
                                      transform: showStockPerformance
                                        ? 'translateX(calc(0.4rem - 50cqw + 50%))'
                                        : 'translateX(0)',
                                    }}
                                  >
                                    {ticker}
                                  </span>
                                </span>
                                <span
                                  className={`absolute inset-y-0 right-1.5 flex items-center text-[10px] font-normal transition-all duration-300 ease-out ${
                                    showStockPerformance
                                      ? 'translate-x-0 opacity-90'
                                      : 'pointer-events-none translate-x-2 opacity-0'
                                  }`}
                                >
                                  {hasReturn
                                    ? formatPercent(tickerReturn, 1)
                                    : loadingStockPerformance
                                      ? '…'
                                      : '—'}
                                </span>
                              </span>
                              <div
                                className={`pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 translate-y-0.5 whitespace-nowrap rounded-md border px-2 py-1 text-xs font-medium opacity-0 shadow-md transition-all delay-0 duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-200 ${
                                  performanceStyle
                                    ? ''
                                    : 'border-slate-200 bg-slate-900 text-white'
                                }`}
                                style={performanceStyle}
                              >
                                {getTickerName(ticker)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </article>
                );
              })}
          </div>
        )}
      </section>
    </section>
  );
}
