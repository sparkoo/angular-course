import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() onNewNumber = new EventEmitter<{ type: string, number: number }>();

  private index = 0;

  private timeout = 1000;
  private intervalHolder = null;

  onStartGamePressed() {
    if (!this.intervalHolder) {
      this.intervalHolder = setInterval(() => {
        this.index = this.index + 1;
        this.onNewNumber.emit({type: this.index % 2 === 0 ? 'even' : 'odd', number: this.index});
      }, this.timeout);
    }
  }

  onStopGamePressed() {
    clearInterval(this.intervalHolder);
    this.intervalHolder = null;
  }
}
