import { Team } from './team.model';

export class Matchup {
    bottomSeed: Team;
    id: Number;
    topSeed: Team;

    constructor() {
        this.bottomSeed = new Team();
        this.id = null;
        this.topSeed = new Team();
    }
}
