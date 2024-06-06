import { Conference } from './conference.model';
import { Team } from './team.model';

export interface Bracket {
  conferences: Conference[];
  games: number;
  goals: number;
  name: string;
  owner: string;
  score: number;
  winner: Team;
}
