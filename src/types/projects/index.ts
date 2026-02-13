import type { ReactNode } from "react";

export interface Project {
  name: string;
  color: {
    border: {
      image: string;
      outer: string;
    };
    text: string;
  };
  description?: string;
  image?: string;
  body?: ReactNode;
  link?: string;
}

