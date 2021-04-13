import * as constantsType from './constants';
export const changeAvatar = (payload: any) => {
  return {
    type: constantsType.PROFILE_CHANGE_AVATAR,
    payload,
  };
};
export const changeAvatarSuccess = (payload: any) => {
  return {
    type: constantsType.PROFILE_CHANGE_AVATAR_SUCCESS,
    payload,
  };
};
export const changeAvatarFail = (payload: any) => {
  return {
    type: constantsType.PROFILE_CHANGE_AVATAR_FAIL,
    payload,
  };
};
export const changeState = (payload: any) => ({
  type: constantsType.PROFILE_CHANGE_STATE,
  payload,
});
