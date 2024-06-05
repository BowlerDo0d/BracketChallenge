import { Round } from './round.model';
import { Team } from './team.model';

export class Division {
  private _name: string;
  private _rounds: Array<Round>;
  private _winner: Team;

  constructor(name: string = '', rounds: Array<Round> = []) {
    this._name = name;
    this._rounds = rounds;
    this._winner = new Team();
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get rounds(): Array<Round> {
    return this._rounds;
  }

  set rounds(rounds: Array<Round>) {
    this._rounds = rounds;
  }

  get winner(): Team {
    return this._winner;
  }

  set winner(winner: Team) {
    this._winner = winner;
  }
}
