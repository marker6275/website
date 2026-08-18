export function TimelineEnd({ isStart }: { isStart: boolean }) {
  return (
    <div
      className={`absolute ${isStart ? '-top-1.5' : '-bottom-1.5'} left-[-5px] lg:left-1/2 lg:-translate-x-1/2 h-px w-4 rounded-full bg-gray-300`}
    />
  );
}
