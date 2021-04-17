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

export const changeCover = (payload: any) => {
  return {
    type: constantsType.PROFILE_CHANGE_COVER,
    payload,
  };
};
export const changeCoverSuccess = (payload: any) => {
  return {
    type: constantsType.PROFILE_CHANGE_COVER_SUCCESS,
    payload,
  };
};
export const changeCoverFail = (payload: any) => {
  return {
    type: constantsType.PROFILE_CHANGE_COVER_FAIL,
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
export const postArticle = (payload: any) => {
  return {
    type: constantsType.PROFILE_POST_ARTICLE,
    payload,
  };
};
export const postArticleSuccess = (payload: any) => {
  return {
    type: constantsType.PROFILE_POST_ARTICLE_SUCCESS,
    payload,
  };
};
export const postArticleFail = (payload: any) => {
  return {
    type: constantsType.PROFILE_POST_ARTICLE_FAIL,
    payload,
  };
};

export const getArticles = (payload: any) => {
  return {
    type: constantsType.PROFILE_GET_ARTICLES,
    payload,
  };
};
export const getArticlesSuccess = (payload: any) => {
  return {
    type: constantsType.PROFILE_GET_ARTICLES_SUCCESS,
    payload,
  };
};
export const getArticlesFail = (payload: any) => {
  return {
    type: constantsType.PROFILE_GET_ARTICLES_FAIL,
    payload,
  };
};

export const changeState = (payload: any) => ({
  type: constantsType.PROFILE_CHANGE_STATE,
  payload,
});
