import { Team } from './team.model';

export class Matchup {
  private _id: number;
  private _topSeed: Team;
  private _bottomSeed: Team;

  constructor(id: number = null, topSeed: Team = new Team(), bottomSeed: Team = new Team()) {
    this._id = id;
    this._topSeed = topSeed;
    this._bottomSeed = bottomSeed;
  }

  get bottomSeed(): Team {
    return this._bottomSeed;
  }

  get id(): number {
    return this._id;
  }

  get topSeed(): Team {
    return this._topSeed;
  }

  set bottomSeed(team: Team) {
    this._bottomSeed = team;
  }

  set id(id: number) {
    this._id = id;
  }

  set topSeed(team: Team) {
    this._topSeed = team;
  }
}
