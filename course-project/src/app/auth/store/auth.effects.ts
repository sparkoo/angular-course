import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SET_TOKEN, SIGN_IN, SIGN_OUT, SIGN_UP, TRY_SIGN_IN, TRY_SIGN_UP, TrySignIn, TrySignUp } from './auth.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(TRY_SIGN_UP)
    .map((action: TrySignUp) => action.payload)
    .switchMap((authData: { username: string, password: string }) =>
      fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)))
    .switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken()))
    .mergeMap((token: string) => [
      { type: SIGN_UP },
      { type: SET_TOKEN, payload: token }
    ]);

  @Effect()
  authSignin = this.actions$
    .ofType(TRY_SIGN_IN)
    .map((action: TrySignIn) => action.payload)
    .switchMap((authData: { username: string, password: string }) =>
      fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)))
    .switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken()))
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        { type: SIGN_IN },
        { type: SET_TOKEN, payload: token }
      ];
    });

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(SIGN_OUT)
    .do(() => this.router.navigate(['/']));

  constructor(private actions$: Actions,
              private router: Router) {}
}
