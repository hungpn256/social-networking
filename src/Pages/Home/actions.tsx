import * as constantsType from './constants';
export const changeState = (payload: any) => ({
  type: constantsType.HOME_CHANGE_STATE,
  payload,
});
export const getUserRecomment = () => ({
  type: constantsType.HOME_GET_USER_RECOMMENT,
});
export const getUserRecommentSuccess = (payload) => ({
  type: constantsType.HOME_GET_USER_RECOMMENT_SUCCESS,
  payload,
});
export const getUserRecommentFail = (payload) => ({
  type: constantsType.HOME_GET_USER_RECOMMENT_FAIL,
  payload,
});
export const followUser = (payload) => ({
  type: constantsType.FOLLOW_USER,
  payload,
});
