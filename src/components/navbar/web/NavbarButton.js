import Link from "next/link";

export function NavbarButton({ title, link, selected }) {
  return (
    <div>
      <Link
        href={link}
        className={`relative flex justify-center items-center h-full text-lg
          text-slate-800 px-8 transition-all duration-200
          after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full
          after:scale-x-0 after:origin-center after:transition-transform after:duration-200
          ${
            selected
              ? `
                bg-gradient-to-b from-sky-500/10 to-slate-50
                after:bg-sky-500 after:scale-x-100
              `
              : `
                hover:text-sky-600
                hover:after:bg-sky-500 hover:after:scale-x-100
              `
          }
        `}
      >
        {title}
      </Link>
    </div>
  );
}
