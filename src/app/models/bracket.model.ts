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

  constructor(
    name: string = '',
    owner: string = '',
    conferences: Array<Conference> = [],
    games: number = 0,
    goals: number = 0,
    score: number = 0,
    winner: Team = new Team()
  ) {
    this._conferences = conferences;
    this._games = games;
    this._goals = goals;
    this._name = name;
    this._owner = owner;
    this._score = score;
    this._tieRank = 0;
    this._winner = winner;
  }
  
  get conferences(): Array<Conference> {
    return this._conferences;
  }

  set conferences(conferences: Array<Conference>) {
    this._conferences = conferences;
  }

  get games(): number {
    return this._games;
  }

  set games(games: number) {
    this._games = games;
  }

  get goals(): number {
    return this._goals;
  }

  set goals(goals: number) {
    this._goals = goals;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get owner(): string {
    return this._owner;
  }

  set owner(owner: string) {
    this._owner = owner;
  }

  get score(): number {
    return this._score;
  }

  set score(score: number) {
    this._score = score;
  }
  
  get tieRank(): number {
    return this._tieRank;
  }

  set tieRank(tieRank: number) {
    this._tieRank = tieRank;
  }
  
  get winner(): Team {
    return this._winner;
  }

  set winner(winner: Team) {
    this._winner = winner;
  }
}
