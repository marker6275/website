"use client";

interface PieChartItem {
  label: string;
  value: number;
  color: string;
  displayValue: string;
}

interface PieChartCardProps {
  title: string;
  totalLabel: string;
  emptyMessage: string;
  totalDisplayValue: string;
  items: PieChartItem[];
}

export function PieChartCard({
  title,
  totalLabel,
  emptyMessage,
  totalDisplayValue,
  items,
}: PieChartCardProps) {
  const totalValue = items.reduce((sum, item) => sum + item.value, 0);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="space-y-4">
      <div className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
        {title}
      </div>

      {totalValue > 0 ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,220px)_1fr] lg:items-center">
          <div className="flex justify-center">
            <div className="relative h-[220px] w-[220px]">
              <svg
                viewBox="0 0 180 180"
                className="-rotate-90 h-full w-full"
                aria-label={title}
                role="img"
              >
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="28"
                />
                {(() => {
                  let offset = 0;
                  return items.map((item) => {
                    const dash = (item.value / totalValue) * circumference;
                    const currentOffset = offset;
                    offset += dash;
                    const percent = ((item.value / totalValue) * 100).toFixed(1);

                    return (
                      <circle
                        key={item.label}
                        cx="90"
                        cy="90"
                        r={radius}
                        fill="none"
                        stroke={item.color}
                        strokeWidth="28"
                        strokeDasharray={`${dash} ${circumference - dash}`}
                        strokeDashoffset={-currentOffset}
                      >
                        <title>{`${item.label}: ${percent}%`}</title>
                      </circle>
                    );
                  });
                })()}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                  {totalLabel}
                </div>
                <div className="text-2xl font-bold text-gray-800">{totalDisplayValue}</div>
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-[36vh] overflow-y-auto pr-1">
            {items.map((item) => {
              const percent = ((item.value / totalValue) * 100).toFixed(1);

              return (
                <div
                  key={item.label}
                  className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full ring-1 ring-black/15"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="text-sm font-semibold text-gray-800">
                        {item.label}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-800">
                        {item.displayValue}
                      </div>
                      <div className="text-xs leading-tight text-gray-600">
                        {percent}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}
