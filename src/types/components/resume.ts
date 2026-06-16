export type DateLike = { year: number; month: number };

export type ResumeEntry = {
  id: string;
  category: 'education' | 'work' | 'research';
  org: string;
  role: string;
  location?: string;
  start: DateLike;
  end: DateLike | 'present';
};
