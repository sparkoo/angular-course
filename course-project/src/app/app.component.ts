import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyC9YmHHT9kuxIYPxOWWdlO7cKE2hb3cLvQ',
      authDomain: 'ng-recipe-book-c7636.firebaseapp.com'
    });
  }
}
