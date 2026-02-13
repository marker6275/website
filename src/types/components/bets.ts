import type { ReactNode } from "react";

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
  editedBets: any[];
  setEditedBets: (bets: any[] | ((prev: any[]) => any[])) => void;
}

export interface OpenBetsSectionProps {
  openBets: any[];
  editable: boolean;
  editedBets: any[];
  setEditedBets: (bets: any[] | ((prev: any[]) => any[])) => void;
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
  showDropdown: boolean;
  uniqueSports: string[];
  data: any[];
}

export interface Last10BetsSectionProps {
  getCompletedBets: (bets: any[]) => any[];
  last10Bets: any[];
  editable: boolean;
  editedBets: any[];
  setEditedBets: (bets: any[] | ((prev: any[]) => any[])) => void;
}

export interface BetsBySportDropdownProps {
  uniqueSports: string[];
  data: any[];
  getNetProfit: (bets: any[]) => number;
  getBetsBySport: (data: any[], sport: string) => any[];
}

export interface SportDataCardProps {
  bets: any[];
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
