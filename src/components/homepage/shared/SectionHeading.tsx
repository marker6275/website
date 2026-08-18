import { AnimatedContent } from '@/components/reactbits';
import type { SectionHeadingProps } from '@/types/components';

export function SectionHeading({
  title,
  italic,
  ruleClassName,
}: SectionHeadingProps) {
  return (
    <AnimatedContent
      distance={40}
      direction="vertical"
      duration={0.9}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      threshold={0.2}
    >
      <div className="mb-8 sm:mb-12">
        <h2
          className={`font-extralight text-gray-900 tracking-tight leading-none ${italic ? 'italic' : ''}`}
          style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}
        >
          {title}
        </h2>
        <div className={`mt-4 sm:mt-6 border-t ${ruleClassName}`} />
      </div>
    </AnimatedContent>
  );
}
