export class Team {
  private _name: string;
  private _seed: number;

  constructor(seed: number = null, name: string = null) {
    this._seed = seed;
    this._name = name;
  }

  clear() {
    this._name = null;
    this._seed = null;
  }

  get name(): string {
    return this._name;
  }

  get seed(): number {
    return this._seed;
  }

  set name(name: string) {
    this._name = name;
  }

  set seed(seed: number) {
    this._seed = seed;
  }
}
