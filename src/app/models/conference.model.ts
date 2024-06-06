import { Division } from './division.model';
import { Team } from './team.model';

export interface Conference {
  divisions: Division[];
  games: number;
  name: string;
  winner: Team;
}
