import type { ReactNode } from "react";

export interface PageBannerProps {
  title: string;
  italic?: boolean;
  avatar?: ReactNode;
  dotClassName?: string;
  accentClassName?: string;
  action?: ReactNode;
}
