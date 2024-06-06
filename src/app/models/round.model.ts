import { Matchup } from './matchup.model';

export interface Round {
  matchups: Matchup[];
  name: string;
}
