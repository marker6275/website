'use client';

import {
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
import { getTickerFullName } from '@/utils';

const STRATEGY_COLORS: Record<string, { color: string; barColor: string }> = {
  chatGPT: { color: '#2563EB', barColor: 'rgba(37, 99, 235, 0.40)' },
  claude: { color: '#F4A261', barColor: 'rgba(244, 162, 97, 0.40)' },
  grok: { color: '#374151', barColor: 'rgba(55, 65, 81, 0.40)' },
  deepseek: { color: '#85B1E4', barColor: 'rgba(133, 177, 228, 0.45)' },
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
const NEGATIVE_COLOR = '#DC2626';
const NEGATIVE_FILL = 'rgba(220, 38, 38, 0.35)';

const CUMULATIVE_MONTH_KEY = '__cumulative__';

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});

function formatMonth(monthKey: string): string {
  if (monthKey === CUMULATIVE_MONTH_KEY) {
    return 'Total';
  }

  const [first, second] = monthKey.split('-').map(Number);

  const isYearFirst = first > 999;
  const year = isYearFirst ? first : second;
  const month = isYearFirst ? second : first;

  if (!year || !month || month < 1 || month > 12) {
    return monthKey;
  }

  return monthFormatter.format(new Date(year, month - 1, 1));
}

function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function getReturnFill(value: number) {
  return value >= 0 ? POSITIVE_FILL : NEGATIVE_FILL;
}

function sumCumulativePercent(monthlyPercents: number[]): number {
  return monthlyPercents.reduce((total, pct) => total + pct, 0);
}

function toLabel(key: string): string {
  return key === 'spy' ? 'S&P 500' : key.charAt(0).toUpperCase() + key.slice(1);
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
        {activeStrategies.map((strategy) => (
          <div
            key={strategy.key}
            className="flex items-start justify-between gap-3"
          >
            <span className="font-medium text-slate-700">{strategy.label}</span>
            <div className="text-right text-slate-700">
              <div
                style={{
                  color:
                    Number(row[`${strategy.key}_return`]) >= 0
                      ? POSITIVE_COLOR
                      : NEGATIVE_COLOR,
                }}
              >
                {formatPercent(Number(row[`${strategy.key}_return`]))}
              </div>
            </div>
          </div>
        ))}
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

  const [visibleStrategies, setVisibleStrategies] = useState<
    Record<StrategyKey, boolean>
  >({});
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const chartHasRendered = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
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
            <button
              key={strategy.key}
              type="button"
              onClick={() => handleStrategyToggle(strategy.key)}
              style={
                {
                  '--strategy-hover-color': strategy.color,
                } as CSSProperties
              }
              className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 ${
                visibleStrategies[strategy.key]
                  ? 'border-slate-300 bg-slate-100 text-slate-900 hover:border-slate-500 hover:text-[var(--strategy-hover-color)]'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-[var(--strategy-hover-color)]'
              }`}
            >
              {strategy.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[360px] min-h-[320px] w-full sm:h-[500px] sm:min-h-[420px]">
        <div
          className="h-full w-full"
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
                right: isMobile ? 6 : 20,
                left: isMobile ? -12 : 8,
                bottom: 8,
              }}
              accessibilityLayer={false}
              tabIndex={-1}
            >
              <CartesianGrid
                stroke="#94A3B8"
                strokeOpacity={0.18}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{ stroke: '#CBD5E1' }}
                tick={{ fill: '#475569', fontSize: isMobile ? 10 : 12 }}
                tickFormatter={formatMonth}
                minTickGap={isMobile ? 14 : 22}
              />
              <YAxis
                yAxisId="returns"
                orientation="left"
                width={isMobile ? 36 : 60}
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
                tick={{ fill: '#64748B', fontSize: isMobile ? 10 : 12 }}
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
                  radius={[4, 4, 0, 0]}
                  barSize={isMobile ? 8 : 12}
                  shape={(props: BarRectangleItem) => {
                    const value = Number(
                      props.payload?.[`${strategy.key}_return`],
                    );

                    return (
                      <Rectangle
                        {...props}
                        fill={getReturnFill(value)}
                        stroke={strategy.color}
                        strokeOpacity={0.9}
                        radius={[4, 4, 0, 0]}
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
        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
          Holdings {selectedRow ? `- ${formatMonth(selectedRow.month)}` : ''}
        </h2>
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
                        {tickers.map((ticker) => (
                          <div
                            key={`${strategy.key}-${ticker}`}
                            className="group relative"
                          >
                            <span
                              className="block cursor-default rounded-md border border-slate-200 bg-slate-50 px-2.5 py-[0.22rem] text-center text-sm font-medium text-slate-700 transition-colors duration-150 hover:border-slate-300 hover:bg-slate-100 sm:text-base"
                              aria-label={`${ticker}: ${getTickerFullName(ticker)}`}
                            >
                              {ticker}
                            </span>
                            <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 translate-y-0.5 whitespace-nowrap rounded-md border border-slate-200 bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-md transition-all delay-0 duration-150 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-500">
                              {getTickerFullName(ticker)}
                            </div>
                          </div>
                        ))}
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
