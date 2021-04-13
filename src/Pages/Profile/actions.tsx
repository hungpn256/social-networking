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

export const getUser = (payload: any) => {
  return {
    type: constantsType.GET_PROFILE_USER,
    payload,
  };
};
export const getUserSuccess = (payload: any) => {
  return {
    type: constantsType.GET_PROFILE_USER_SUCCESS,
    payload,
  };
};
export const getUserFail = (payload: any) => {
  return {
    type: constantsType.GET_PROFILE_USER_FAIL,
    payload,
  };
};

export const changeState = (payload: any) => ({
  type: constantsType.PROFILE_CHANGE_STATE,
  payload,
});
