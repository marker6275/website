import type { ReactNode } from "react";

export interface HomepageButtonProps {
  text: string;
  href: string;
  reverse?: boolean;
}

export interface HomepageDividerProps {
  hide?: boolean;
}

export interface HeaderEmailIconProps {
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  setIsFadingOut: (fading: boolean) => void;
}

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
  tags?: string[];
  inProgress?: boolean;
}
