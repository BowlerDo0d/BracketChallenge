import { Division } from './division.model';

export class Conference {
    divisions: Array<Division>;
    name: string;

    constructor() {
        this.divisions = new Array();
        this.name = null;
    }
}
