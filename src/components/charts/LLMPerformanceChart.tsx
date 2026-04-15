"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from "recharts";

type StrategyKey = string;

interface StrategyConfig {
  key: StrategyKey;
  label: string;
  color: string;
  barColor: string;
}

type PortfolioRow = {
  month: string;
  [key: string]: string | number | string[];
};

const STRATEGY_COLORS: Record<string, { color: string; barColor: string }> = {
  gpt: { color: "#2563EB", barColor: "rgba(37, 99, 235, 0.40)" },
  chatGPT: { color: "#2563EB", barColor: "rgba(37, 99, 235, 0.40)" },
  claude: { color: "#F4A261", barColor: "rgba(244, 162, 97, 0.40)" },
  gemini: { color: "#0F766E", barColor: "rgba(15, 118, 110, 0.40)" },
  grok: { color: "#374151", barColor: "rgba(55, 65, 81, 0.40)" },
  deepseek: { color: "#85B1E4", barColor: "rgba(133, 177, 228, 0.45)" },
  spy: { color: "#6B7280", barColor: "rgba(107, 114, 128, 0.40)" },
};

const FALLBACK_COLORS = [
  { color: "#2563EB", barColor: "rgba(37, 99, 235, 0.40)" },
  { color: "#7C3AED", barColor: "rgba(124, 58, 237, 0.40)" },
  { color: "#0F766E", barColor: "rgba(15, 118, 110, 0.40)" },
  { color: "#0891B2", barColor: "rgba(8, 145, 178, 0.40)" },
  { color: "#BE123C", barColor: "rgba(190, 18, 60, 0.40)" },
];

const PREFERRED_ORDER = [
  "chatGPT",
  "claude",
  "grok",
  "deepseek",
  "spy",
] as const;

const TICKER_FULL_NAMES: Record<string, string> = {
  NVDA: "NVIDIA Corporation",
  AVGO: "Broadcom Inc.",
  MSFT: "Microsoft Corporation",
  PLTR: "Palantir Technologies Inc.",
  VRT: "Vertiv Holdings Co.",
  LITE: "Lumentum Holdings Inc.",
  COHR: "Coherent Corp.",
  TMUS: "T-Mobile US, Inc.",
  LNG: "Cheniere Energy, Inc.",
  VKTX: "Viking Therapeutics, Inc.",
  XOM: "Exxon Mobil Corporation",
  COP: "ConocoPhillips",
  CAT: "Caterpillar Inc.",
  GEV: "GE Vernova Inc.",
  FCX: "Freeport-McMoRan Inc.",
  NEM: "Newmont Corporation",
  LLY: "Eli Lilly and Company",
  ISRG: "Intuitive Surgical, Inc.",
  GOOGL: "Alphabet Inc. (Class A)",
  "BRK.B": "Berkshire Hathaway Inc. (Class B)",
  MU: "Micron Technology, Inc.",
  ANET: "Arista Networks, Inc.",
  TSM: "Taiwan Semiconductor Manufacturing Company Limited",
  FIX: "Comfort Systems USA, Inc.",
  WDC: "Western Digital Corporation",
  TTD: "The Trade Desk, Inc.",
  AKON: "Aakon Capital placeholder",
  FICO: "Fair Isaac Corporation",
  INTC: "Intel Corporation",
  TPL: "Texas Pacific Land Corporation",
  OUST: "Ouster, Inc.",
  INTU: "Intuit Inc.",
  CELH: "Celsius Holdings, Inc.",
  AVAV: "AeroVironment, Inc.",
  MDB: "MongoDB, Inc.",
};

const POSITIVE_COLOR = "#16A34A";
const POSITIVE_FILL = "rgba(22, 163, 74, 0.35)";
const NEGATIVE_COLOR = "#DC2626";
const NEGATIVE_FILL = "rgba(220, 38, 38, 0.35)";

interface LLMPerformanceChartProps {
  data: PortfolioRow[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: PortfolioRow }>;
  label?: string;
  activeStrategies: StrategyConfig[];
}

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

function formatMonth(monthKey: string): string {
  const [first, second] = monthKey.split("-").map(Number);

  // Support both "YYYY-MM" and "MM-YYYY" month keys.
  const isYearFirst = first > 999;
  const year = isYearFirst ? first : second;
  const month = isYearFirst ? second : first;

  if (!year || !month || month < 1 || month > 12) {
    return monthKey;
  }

  return monthFormatter.format(new Date(year, month - 1, 1));
}

function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function getReturnFill(value: number) {
  return value >= 0 ? POSITIVE_FILL : NEGATIVE_FILL;
}

function toLabel(key: string): string {
  return key === "spy" ? "S&P 500" : key.charAt(0).toUpperCase() + key.slice(1);
}

function getTickerFullName(ticker: string): string {
  return TICKER_FULL_NAMES[ticker] ?? ticker;
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
  const strategies = useMemo<StrategyConfig[]>(() => {
    const firstRow = data[0];
    if (!firstRow) {
      return [];
    }

    const datasetOrderKeys = Object.entries(firstRow)
      .filter(([key]) => key.endsWith("_return"))
      .map(([key]) => key.replace("_return", ""));

    const preferredKeys = PREFERRED_ORDER.filter((key) =>
      datasetOrderKeys.includes(key),
    );
    const remainingKeys = datasetOrderKeys.filter(
      (key) => !preferredKeys.includes(key as (typeof PREFERRED_ORDER)[number]),
    );
    const orderedReturnKeys = [...preferredKeys, ...remainingKeys];

    return orderedReturnKeys.map((key, index) => {
      const colors =
        STRATEGY_COLORS[key] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
      return {
        key,
        label: toLabel(key),
        color: colors.color,
        barColor: colors.barColor,
      };
    });
  }, [data]);

  const [visibleStrategies, setVisibleStrategies] = useState<
    Record<StrategyKey, boolean>
  >({});
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

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
    if (!selectedMonth && data.length > 0) {
      setSelectedMonth(data[data.length - 1].month);
    }
  }, [data, selectedMonth]);

  const activeStrategies = useMemo(
    () => strategies.filter((strategy) => visibleStrategies[strategy.key]),
    [strategies, visibleStrategies],
  );

  const maxAbsoluteReturn = useMemo(() => {
    if (activeStrategies.length === 0) {
      return 12;
    }

    const maxVisible = data.reduce((max, row) => {
      const rowMax = activeStrategies.reduce((innerMax, strategy) => {
        return Math.max(
          innerMax,
          Math.abs(Number(row[`${strategy.key}_return`])),
        );
      }, 0);
      return Math.max(max, rowMax);
    }, 0);

    return Math.max(4, Math.ceil(maxVisible + 1));
  }, [activeStrategies, data]);

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
    return data.find((row) => row.month === selectedMonth) ?? null;
  }, [data, selectedMonth]);

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
                  "--strategy-hover-color": strategy.color,
                } as CSSProperties
              }
              className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 ${
                visibleStrategies[strategy.key]
                  ? "border-slate-300 bg-slate-100 text-slate-900 hover:border-slate-500 hover:text-[var(--strategy-hover-color)]"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-[var(--strategy-hover-color)]"
              }`}
            >
              {strategy.label}
            </button>
          ))}
        </div>

      </div>

      <div className="h-[500px] min-h-[420px] w-full">
        <div
          className="h-full w-full"
          onMouseDownCapture={(event) => {
            event.preventDefault();
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 20, left: 8, bottom: 8 }}
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
              axisLine={{ stroke: "#CBD5E1" }}
              tick={{ fill: "#475569", fontSize: 12 }}
              tickFormatter={formatMonth}
              minTickGap={22}
            />
            <YAxis
              yAxisId="returns"
              orientation="left"
              domain={[-maxAbsoluteReturn, maxAbsoluteReturn]}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={{
                stroke: "#64748B",
                strokeOpacity: 0.65,
                strokeWidth: 1.25,
              }}
              tick={{ fill: "#64748B", fontSize: 12 }}
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
            {strategies.map((strategy) => (
              <Bar
                key={`${strategy.key}-bar`}
                yAxisId="returns"
                dataKey={`${strategy.key}_return`}
                name={`${strategy.label} Return`}
                activeBar={false}
                onClick={(state) =>
                  setSelectedMonth(
                    String(state?.payload?.month ?? selectedMonth),
                  )
                }
                fill={POSITIVE_FILL}
                stroke={strategy.color}
                fillOpacity={visibleStrategies[strategy.key] ? 1 : 0}
                strokeOpacity={visibleStrategies[strategy.key] ? 0.35 : 0}
                radius={[4, 4, 0, 0]}
                barSize={12}
              >
                {data.map((row, index) => {
                  const value = Number(row[`${strategy.key}_return`]);
                  return (
                    <Cell
                      key={`${strategy.key}-${index}`}
                      fill={getReturnFill(value)}
                      stroke={strategy.color}
                      fillOpacity={visibleStrategies[strategy.key] ? 1 : 0}
                      strokeOpacity={visibleStrategies[strategy.key] ? 0.9 : 0}
                    />
                  );
                })}
              </Bar>
            ))}
          </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
          Holdings {selectedRow ? `- ${formatMonth(selectedRow.month)}` : ""}
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
              .filter((strategy) => strategy.key !== "spy")
              .map((strategy) => {
              const stocks = selectedRow[`${strategy.key}_stocks`];
              const tickers = Array.isArray(stocks)
                ? stocks.filter(
                    (value): value is string => typeof value === "string",
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
                    <div className="mt-3 grid grid-cols-5 gap-2">
                      {tickers.map((ticker) => (
                        <div
                          key={`${strategy.key}-${ticker}`}
                          className="group relative"
                        >
                          <span
                            className="block cursor-default rounded-md border border-slate-200 bg-slate-50 px-2.5 py-[0.22rem] text-center text-base font-medium text-slate-700 transition hover:border-slate-400"
                            aria-label={`${ticker}: ${getTickerFullName(ticker)}`}
                          >
                            {ticker}
                          </span>
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-200 bg-slate-900 px-2 py-1 text-xs font-medium text-white shadow-md group-hover:block">
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
