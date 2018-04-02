import { Matchup } from './matchup.model';

export class Division {
    matchups: Array<Matchup>;
    name: string;

    constructor() {
        this.matchups = new Array();
        this.name = null;
    }
}
