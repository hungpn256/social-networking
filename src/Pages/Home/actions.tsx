import * as constantsType from './constants';
export const changeState = (payload: any) => ({
  type: constantsType.HOME_CHANGE_STATE,
  payload,
});
export const getUserRecomment = () => ({
  type: constantsType.HOME_GET_USER_RECOMMENT,
});
export const getUserRecommentSuccess = (payload: any) => ({
  type: constantsType.HOME_GET_USER_RECOMMENT_SUCCESS,
  payload,
});
export const getUserRecommentFail = (payload: any) => ({
  type: constantsType.HOME_GET_USER_RECOMMENT_FAIL,
  payload,
});
export const getArticle = () => ({
  type: constantsType.HOME_GET_ARTICLE,
});
export const getArticleSuccess = (payload: any) => ({
  type: constantsType.HOME_GET_ARTICLE_SUCCESS,
  payload,
});
export const getArticleFail = (payload: any) => ({
  type: constantsType.HOME_GET_ARTICLE_FAIL,
  payload,
});
