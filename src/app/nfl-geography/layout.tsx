import type { ReactNode } from 'react';

export const metadata = {
  title: 'NFL Geography',
  description: 'Guess where each NFL team is located on the map.',
};

export default function NflGeographyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {children}
    </div>
  );
}
