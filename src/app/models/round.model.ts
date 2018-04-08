import { Matchup } from './matchup.model';

export class Round {
  private _matchups: Array<Matchup>;
  private _name: string;

  constructor(name: string = null, matchups: Array<Matchup> = new Array()) {
    this._matchups = matchups;
    this._name = name;
  }

  get matchups(): Array<Matchup> {
    return this._matchups;
  }

  get name(): string {
    return this._name;
  }

  set matchups(matchups: Array<Matchup>) {
    this._matchups = matchups;
  }

  set name(name: string) {
    this._name = name;
  }
}
