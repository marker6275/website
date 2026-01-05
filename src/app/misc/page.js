import Link from "next/link";

export const metadata = {
  title: "Baby Projects | Mark Li",
};

export default function MiscIndex() {
  const links = [
    { href: "/misc/tic-tac-toe", label: "Tic Tac Toe" },
    { href: "/misc/calculator", label: "Calculator" },
  ];
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Miscellaneous Projects</h1>
      <ul className="space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-blue-500 hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
