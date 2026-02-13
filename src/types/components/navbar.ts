export interface NavbarButtonProps {
  title: string;
  link: string;
  selected: boolean;
}

export interface MobileNavbarButtonProps {
  title: string;
  link: string;
  toggle: () => void;
}

