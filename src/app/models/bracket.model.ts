import { Conference } from './conference.model';

export class Bracket {
    conferences: Array<Conference>;
    name: string;
    owner: string;
    score: Number;

    constructor() {
        this.conferences = new Array();
        this.name = null;
        this.owner = null;
        this.score = 0;
    }
}
