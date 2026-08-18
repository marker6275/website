export interface HomepageButtonProps {
  text: string;
  href: string;
  reverse?: boolean;
}

export interface SectionHeadingProps {
  title: string;
  italic?: boolean;
  ruleClassName: string;
}

export interface HeaderEmailIconProps {
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  setIsFadingOut: (fading: boolean) => void;
}
