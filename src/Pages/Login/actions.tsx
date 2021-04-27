import * as constantsType from './constants';
export const login = (payload: { email: string; password: string }) => ({
  type: constantsType.LOGIN,
  payload,
});
export const loginSuccess = (payload: any) => ({
  type: constantsType.LOGIN_SUCCESS,
  payload,
});
export const loginFail = (payload: any) => ({
  type: constantsType.LOGIN_FAIL,
  payload,
});
export const getUser = (payload: any) => ({
  type: constantsType.GET_USER,
  payload,
});
export const followUser = (payload: string) => ({
  type: constantsType.FOLLOW_USER,
  payload,
});
export const changeState = (payload: any) => ({
  type: constantsType.LOGIN_CHANGE_STATE,
  payload,
});
