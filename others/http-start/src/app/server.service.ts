import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  storeServers(servers: any[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // return this.http.post('https://ng-http-39b68.firebaseio.com/data.json', servers, { headers: headers });
    return this.http.put('https://ng-http-39b68.firebaseio.com/data.json', servers, { headers: headers });
  }

  getServers() {
    return this.http.get('https://ng-http-39b68.firebaseio.com/data')
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw('Something went wrong');
      });
  }

  getAppName() {
    return this.http.get('https://ng-http-39b68.firebaseio.com/appNam.json')
      .map((response: Response) => response.json());
  }
}
