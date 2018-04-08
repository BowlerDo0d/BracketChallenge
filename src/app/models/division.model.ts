import { Round } from './round.model';
import { Team } from './team.model';

export class Division {
  private _name: string;
  private _rounds: Array<Round>;
  private _winner: Team;

  constructor(name: string = null, rounds: Array<Round> = new Array()) {
    this._name = name;
    this._rounds = rounds;
    this._winner = new Team();
  }

  get name(): string {
    return this._name;
  }

  get rounds(): Array<Round> {
    return this._rounds;
  }

  get winner(): Team {
    return this._winner;
  }

  set name(name: string) {
    this._name = name;
  }

  set rounds(rounds: Array<Round>) {
    this._rounds = rounds;
  }

  set winner(winner: Team) {
    this._winner = winner;
  }
}
