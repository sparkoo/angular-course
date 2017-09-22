export class CounterService {
  private _counter = 0;

  incrementCounter() {
    this._counter++;
  }

  get counter(): number {
    return this._counter;
  }
}
