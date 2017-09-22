import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hits = [];
  showPassword = false;

  onShowPassword() {
    this.showPassword = !this.showPassword;
    this.hits.push(new Date());
  }
}
