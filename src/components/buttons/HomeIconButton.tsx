import { HomeIcon } from ".";
import type { HomeIconButtonProps } from "../../types/components/buttons";

export function HomeIconButton({ src, alt, link }: HomeIconButtonProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <HomeIcon src={src} alt={alt} />
    </a>
  );
}

