import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  components = [];

  onInterval(numberData: { type: string, number: number }) {
    this.components.push({type: numberData.type, number: numberData.number});
  }
}
