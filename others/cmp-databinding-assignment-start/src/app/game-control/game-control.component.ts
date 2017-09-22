import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() intervalOccurred = new EventEmitter<{ type: string, number: number }>();
  index = 0;
  interval: any;

  onGameStart() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.index = this.index + 1;
        this.intervalOccurred.emit({
          type: this.index % 2 === 0 ? 'odd' : 'even',
          number: this.index
        });
      }, 1000);
    }
  }

  onGameStop() {
    clearInterval(this.interval);
    this.interval = null;
  }
}
