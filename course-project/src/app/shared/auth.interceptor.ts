import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.reducers';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth')
      .take(1)
      .switchMap((authState: AuthState) => {
        const clonedReq = req.clone({ params: new HttpParams().set('auth', authState.token) });
        return next.handle(clonedReq);
      });
  }
}
