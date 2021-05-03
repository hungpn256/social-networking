import * as constantsType from './constants';
export const search = () => ({
  type: constantsType.SEARCH,
});
export const searchSuccess = (payload: any) => ({
  type: constantsType.SEARCH_SUCCESS,
  payload,
});
export const searchFail = (payload: any) => ({
  type: constantsType.SEARCH_FAIL,
  payload,
});

export const changeState = (payload: any) => ({
  type: constantsType.SEARCH_CHANGE_STATE,
  payload,
});
