import { HomeIcon } from '.';
import type { HomeIconButtonProps } from '@/types/components';

export function HomeIconButton({ src, alt, link }: HomeIconButtonProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="select-none"
    >
      <HomeIcon src={src} alt={alt} />
    </a>
  );
}
