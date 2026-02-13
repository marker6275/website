export interface GridSquareProps {
  symbol: string;
  onClick?: () => void;
  disabled: boolean;
}

export interface BoardProps {
  handleClick: (index: number, currentSymbol: string) => void;
  gameState: string[];
  disabled: boolean;
}

export interface NumberButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export interface OperatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

