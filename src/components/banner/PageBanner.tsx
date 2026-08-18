import { AnimatedContent } from "@/components/reactbits";
import type { PageBannerProps } from "@/types/components";

export function PageBanner({
  title,
  italic,
  avatar,
  dotClassName,
  accentClassName,
  action,
}: PageBannerProps) {
  return (
    <div className="border-y border-gray-200 bg-[#F2F0EB]">
      <AnimatedContent
        distance={40}
        direction="vertical"
        duration={0.9}
        ease="power3.out"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div className="min-w-0 flex items-center gap-4 sm:gap-6">
              {avatar}
              {dotClassName && (
                <span
                  className={`h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 shrink-0 ${dotClassName}`}
                />
              )}
              <h1
                className={`font-extralight text-gray-900 leading-[0.85] tracking-tighter whitespace-nowrap ${italic ? "italic" : ""}`}
                style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
              >
                {title}
              </h1>
            </div>
            {action && (
              <div
                className={`border-t pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8 ${accentClassName}`}
              >
                {action}
              </div>
            )}
          </div>
        </div>
      </AnimatedContent>
    </div>
  );
}
