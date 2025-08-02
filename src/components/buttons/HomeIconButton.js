import { HomeIcon } from ".";

export function HomeIconButton({ src, alt, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <HomeIcon src={src} alt={alt} />
    </a>
  );
}
