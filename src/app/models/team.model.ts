export class Team {
    private _name: string;
    private _seed: number;
  
    constructor(seed: number = 0, name: string = '') {
      this._seed = seed;
      this._name = name;
    }
  
    clear(): void {
      this._name = '';
      this._seed = 0;
    }
  
    get name(): string {
      return this._name;
    }
    
    set name(name: string) {
      this._name = name;
    }

    get seed(): number {
      return this._seed;
    }
  
    set seed(seed: number) {
      this._seed = seed;
    }  
  }
