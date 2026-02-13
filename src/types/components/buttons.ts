export interface HomeIconButtonProps {
  src: string;
  alt: string;
  link: string;
}

export interface HomeIconProps {
  src: string;
  alt: string;
}

export interface ProjectPageButtonProps {
  pageNumber: number;
  isActive: boolean;
  setPageNumber: (pageNumber: number) => void;
}

