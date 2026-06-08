import type { ReactNode } from "react";

export type BetRow = Array<string | number>;
export interface AddBetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BetCardProps {
  date: string;
  amount: string;
  odds: string;
  result: string;
  payout: string;
  league: string;
  line: string;
  index: number;
  editable: boolean;
  setEditedBets: (bets: BetRow[] | ((prev: BetRow[]) => BetRow[])) => void;
}

export interface OpenBetsSectionProps {
  openBets: BetRow[];
  editable: boolean;
  setEditedBets: (bets: BetRow[] | ((prev: BetRow[]) => BetRow[])) => void;
}

export interface ProfitsAndStatisticsSectionProps {
  profits: {
    totalWagered: number;
    totalReturn: number;
    profit: number;
    winRate: string;
    totalBets: number;
    lastDay: string | null;
    lastDayProfit: number;
  };
  uniqueSports: string[];
  data: BetRow[];
  onLayoutChange?: () => void;
}

export interface Last10BetsSectionProps {
  getCompletedBets: (bets: BetRow[]) => BetRow[];
  last10Bets: BetRow[];
  editable: boolean;
  setEditedBets: (bets: any[] | ((prev: any[]) => any[])) => void;
}

export interface BetsBySportDropdownProps {
  uniqueSports: string[];
  data: BetRow[];
  getNetProfit: (bets: any[]) => number;
  getBetsBySport: (data: any[], sport: string) => any[];
  onLayoutChange?: () => void;
}

export interface SportDataCardProps {
  bets: BetRow[];
  sport: string;
  netProfit: number;
  totalSpent: string;
  profit: boolean;
}

export interface BetsHeaderProps {
  titleOnClick: () => void;
  addOnClick: () => void;
  editOnClick: () => void;
  mode: "Edit" | "Save";
}

export interface BetsInfoModalProps {
  showInfoModal: boolean;
  onClick: () => void;
}

export interface BetsButtonProps {
  onClick: () => void;
  children: ReactNode;
}
export interface BetChartProps {
  data: BetRow[];
}

interface PieChartItem {
  label: string;
  value: number;
  color: string;
  displayValue: string;
}

export interface PieChartCardProps {
  title: string;
  totalLabel: string;
  emptyMessage: string;
  totalDisplayValue: string;
  items: PieChartItem[];
}

export interface SportAllocationChartSectionProps {
  data: BetRow[];
  onLayoutChange?: () => void;
}
