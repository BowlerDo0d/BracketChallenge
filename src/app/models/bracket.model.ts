import { Conference } from './conference.model';
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
  owner: {
    email: string;
    name: string;
  };
  score: number;
  tieRank: number;
  winner: Team;
}
