import * as constantsType from './constants';
import { ISignup } from './index';
export const signUp = (payload: ISignup) => ({
  type: constantsType.SIGN_UP,
  payload,
});
export const signUpSuccess = (payload: any) => ({
  type: constantsType.SIGN_UP_SUCCESS,
  payload,
});
export const signUpFail = (payload: any) => ({
  type: constantsType.SIGN_UP_FAIL,
  payload,
});
export const changeState = (payload: any) => ({
  type: constantsType.SIGN_UP_CHANGE_STATE,
  payload,
});

export const clearState = () => ({
  type: constantsType.SIGN_UP_CLEAR_STATE,
});
