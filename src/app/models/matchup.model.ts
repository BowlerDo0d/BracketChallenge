import { Team } from './team.model';

export class Matchup {
  private _id: number;
  private _games: number;
  private _topSeed: Team;
  private _bottomSeed: Team;

  constructor(id: number = 0, topSeed: Team = new Team(), bottomSeed: Team = new Team()) {
    this._id = id;
    this._games = 0;
    this._topSeed = topSeed;
    this._bottomSeed = bottomSeed;
  }

  get bottomSeed(): Team {
    return this._bottomSeed;
  }

  set bottomSeed(team: Team) {
    this._bottomSeed = team;
  }

  get games(): number {
    return this._games;
  }

  set games(games: number) {
    this._games = games;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get topSeed(): Team {
    return this._topSeed;
  }

  set topSeed(team: Team) {
    this._topSeed = team;
  }
}
