export class Ingredient {
  constructor(private _name: string, private _amount: number) {}


  get name(): string {
    return this._name;
  }

  get amount(): number {
    return this._amount;
  }
}
