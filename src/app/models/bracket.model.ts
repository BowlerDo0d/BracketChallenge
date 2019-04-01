import { Conference } from './conference.model';
import { Team } from './team.model';

export class Bracket {
  private _conferences: Array<Conference>;
  private _games: number;
  private _goals: number;
  private _name: string;
  private _owner: string;
  private _score: number;
  private _tieRank: number;
  private _winner: Team;

  constructor(name: string = null,
    owner: string = null,
    conferences: Array<Conference> = new Array(),
    games: number = null,
    goals: number = null,
    score: number = null,
    winner: Team = new Team()) {
    this._conferences = conferences;
    this._games = games;
    this._goals = goals;
    this._name = name;
    this._owner = owner;
    this._score = 0;
    this._winner = new Team();
  }

  get conferences(): Array<Conference> {
    return this._conferences;
  }

  get games(): number {
    return this._games;
  }

  get goals(): number {
    return this._goals;
  }

  get name(): string {
    return this._name;
  }

  get owner(): string {
    return this._owner;
  }

  get score(): number {
    return this._score;
  }

  get tieRank(): number {
    return this._tieRank;
  }

  get winner(): Team {
    return this._winner;
  }

  set conferences(conferences: Array<Conference>) {
    this._conferences = conferences;
  }

  set games(games: number) {
    this._games = games;
  }

  set goals(goals: number) {
    this._goals = goals;
  }

  set name(name: string) {
    this._name = name;
  }

  set owner(owner: string) {
    this._owner = owner;
  }

  set score(score: number) {
    this._score = score;
  }

  set tieRank(tieRank: number) {
    this._tieRank = tieRank;
  }

  set winner(winner: Team) {
    this._winner = winner;
  }
}
