import { Conference } from './conference.model';
import { Team } from './team.model';
import { Division } from './division.model';
import { Round } from './round.model';
import { Matchup } from './matchup.model';

export class Bracket {
  private _conferences: Array<Conference>;
  private _name: string;
  private _owner: string;
  private _score: number;
  private _winner: Team;

  constructor(name: string = null,
    owner: string = null,
    conferences: Array<Conference> = new Array(),
    score: number = null,
    winner: Team = new Team()) {
    this._conferences = conferences;
    this._name = name;
    this._owner = owner;
    this._score = 0;
    this._winner = new Team();
  }

  get conferences(): Array<Conference> {
    return this._conferences;
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

  get winner(): Team {
    return this._winner;
  }

  set conferences(conferences: Array<Conference>) {
    this._conferences = conferences;
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

  set winner(winner: Team) {
    this._winner = winner;
  }
}
