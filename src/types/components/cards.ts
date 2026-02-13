import type { ReactNode } from "react";

export interface ProjectCardProps {
  name: string;
  color: {
    text: string;
    border: {
      hover: string;
      solid: string;
    };
  };
  description: string;
  image?: string;
  children?: ReactNode;
  link?: string;
}

export interface HomeProjectCardProps {
  name: string;
  color: {
    text: string;
  };
  children?: ReactNode;
  link?: string;
}

export interface MusicCardProps {
  id: number;
  title: string;
  link: string;
  month: number;
  year: string;
  composer: string;
  channel: string;
}

