import Image from "next/image";
import type { HomeIconProps } from "../../types/components/buttons";

export function HomeIcon({ src, alt }: HomeIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={32}
      height={32}
      className="hover:opacity-60 transition-all duration-200"
    />
  );
}

