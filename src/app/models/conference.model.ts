import { Division } from './division.model';
import { Team } from './team.model';

export class Conference {
    divisions: Array<Division>;
    name: string;
    winner: Team;

    constructor() {
        this.divisions = new Array();
        this.name = null;
        this.winner = new Team();
    }
}
