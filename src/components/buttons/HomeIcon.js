import Image from "next/image";

export function HomeIcon({ src, alt }) {
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
