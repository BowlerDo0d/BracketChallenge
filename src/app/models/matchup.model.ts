import { Team } from './team.model';

export interface Matchup {
  bottomSeed: Team;
  games: number;
  id: number;
  topSeed: Team;
}
