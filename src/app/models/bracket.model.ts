import { Conference } from './conference.model';
import { Team } from './team.model';

export class Bracket {
    conferences: Array<Conference>;
    name: string;
    owner: string;
    score: number;
    winner: Team;

    constructor() {
        this.conferences = new Array();
        this.name = null;
        this.owner = null;
        this.score = 0;
        this.winner = new Team();
    }
}
