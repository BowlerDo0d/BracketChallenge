import { Conference } from './conference.model';
import { FormControl } from '@angular/forms';
import { Team } from './team.model';

export interface Bracket {
  conferences: Conference[];
  games: number;
  goals: number;
  isComplete: boolean;
  isPaid: boolean;
  isTiebreakerComplete: boolean;
  key: string;
  name: string;
  name_condensed: string;
  owner: {
    email: string;
    name: string;
  };
  score: number;
  tieRank: number;
  winner: Team;
}

export interface BracketForm {
  bracketName: FormControl<string>;
  totalGamesA1: FormControl<number | null>;
  totalGamesA2: FormControl<number | null>;
  totalGamesA3: FormControl<number | null>;
  totalGamesAB: FormControl<number | null>;
  totalGamesB1: FormControl<number | null>;
  totalGamesB2: FormControl<number | null>;
  totalGamesB3: FormControl<number | null>;
  totalGamesC1: FormControl<number | null>;
  totalGamesC2: FormControl<number | null>;
  totalGamesC3: FormControl<number | null>;
  totalGamesCD: FormControl<number | null>;
  totalGamesD1: FormControl<number | null>;
  totalGamesD2: FormControl<number | null>;
  totalGamesD3: FormControl<number | null>;
  totalGamesFinal: FormControl<number | null>;
  totalGoalsFinal: FormControl<number | null>;
}
