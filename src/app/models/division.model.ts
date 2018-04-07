import { Round } from './round.model';
import { Team } from './team.model';

export class Division {
    rounds: Array<Round>;
    name: string;
    winner: Team;

    constructor() {
        this.rounds = new Array();
        this.name = null;
        this.winner = new Team();
    }
}
