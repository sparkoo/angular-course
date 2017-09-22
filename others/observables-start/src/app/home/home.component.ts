import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit, OnDestroy {

  private numberSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
      .map((data: number) => data * 2);
    this.numberSubscription = myNumbers.subscribe(
      (number: number) => console.log(number)
    );
    //
    // const myObservable = Observable.create((observer: Observer<string>) => {
    //   setTimeout(() => observer.next('first package'), 1000);
    //   setTimeout(() => observer.next('second package'), 2000);
    //   // setTimeout(() => observer.error('this does not works'), 3000);
    //   setTimeout(() => observer.complete(), 3000);
    //   setTimeout(() => observer.next('third package'), 5000);
    // });
    // myObservable.subscribe(
    //   (data: string) => console.log(data),
    //   (error: string) => console.log(error),
    //   () => { console.log('completed'); }
    // );
  }


  ngOnDestroy(): void {
    this.numberSubscription.unsubscribe();
  }
}
