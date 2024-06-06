import { Round } from './round.model';
import { Team } from './team.model';

export interface Division {
  name: string;
  rounds: Round[];
  winner: Team;
}
