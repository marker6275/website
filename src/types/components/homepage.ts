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

