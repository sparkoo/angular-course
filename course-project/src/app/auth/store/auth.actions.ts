import { Action } from '@ngrx/store';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const SET_TOKEN = 'SET_TOKEN';

export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthActions = SignIn | SignOut | SignUp | SetToken;
