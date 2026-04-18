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
  /**
   * Skill tags shown as “chips” on the Projects grid.
   * Keep these short and consistent so cards stay balanced.
   */
  tags?: string[];
  /** When true, shows an “In Progress” pill on the top-right of the projects grid card. */
  inProgress?: boolean;
}
