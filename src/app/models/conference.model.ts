import { Division } from './division.model';
import { Team } from './team.model';

export class Conference {
  private _divisions: Array<Division>;
  private _name: string;
  private _winner: Team;

  constructor(name: string = null, divisions: Array<Division> = new Array()) {
    this._divisions = divisions;
    this._name = name;
    this._winner = new Team();
  }

  get divisions(): Array<Division> {
    return this._divisions;
  }

  get name(): string {
    return this._name;
  }

  get winner(): Team {
    return this._winner;
  }

  set divisions(divisions: Array<Division>) {
    this._divisions = divisions;
  }

  set name(name: string) {
    this._name = name;
  }

  set winner(winner: Team) {
    this._winner = winner;
  }
}
