import { toast } from 'react-toastify';
import { call, put, takeEvery, takeLatest, all, select } from 'redux-saga/effects';
import * as profileActions from './actions';
import * as profileConstant from './constants';
import services from './service';
function* changeAvatarSaga({ payload }: { payload: any }) {
  yield put(profileActions.changeState({ requesting: true }));
  try {
    const res = yield call(services.changeAvatar, payload);
    yield put(profileActions.changeAvatarSuccess(res.data));
    toast.success('change avatar success');
  } catch (err) {
    yield put(profileActions.changeAvatarFail(err));
    toast.error('change avatar fail');
  } finally {
    yield put(profileActions.changeState({ requesting: false }));
  }
}
function* changeUserSaga({ payload }: { payload: any }) {
  yield put(profileActions.changeState({ loadingPage: true }));
  const { _id } = payload;
  const paging = yield select((state) => state.profile.paging);
  const arrayService = [
    { service: services.getProfileUser, payload: payload },
    { service: services.getArticles, payload: { _id, paging } },
  ];

  try {
    const [resUser, resArticle] = yield all(
      arrayService.map((service) => call(service.service, service.payload))
    );
    debugger;
    yield put(profileActions.getUserSuccess(resUser.data));
    yield put(profileActions.getArticlesSuccess(resArticle.data.posts));
    toast.success('get profile success');
  } catch (err) {
    yield put(profileActions.getUserFail(err));
    toast.error('get profile fail');
  } finally {
    yield put(profileActions.changeState({ loadingPage: false }));
  }
}
function* postArticleSaga({ payload }: { payload: any }) {
  yield put(profileActions.changeState({ postArticleRequesting: true }));
  const { _id } = yield select((state) => state.login.user);
  try {
    const res = yield call(services.postArticle, payload);
    yield put(profileActions.postArticleSuccess(res.data.post));
    toast.success('post article success');
  } catch (err) {
    yield put(profileActions.postArticleFail(err));
    toast.error('post article fail');
  } finally {
    yield put(profileActions.changeState({ postArticleRequesting: false }));
  }
}
function* getArticlesSaga({ payload }: { payload: any }) {
  yield put(profileActions.changeState({ getArticleRequesting: true }));
  // let currentPaging = yield select((state) => state.profile.paging);
  debugger;
  try {
    const res = yield call(services.getArticles, { ...payload });
    yield put(profileActions.getArticlesSuccess(res.data.posts));
    toast.success('get article success');
  } catch (err) {
    yield put(profileActions.getArticlesFail(err));
    toast.error('get article fail');
  } finally {
    yield put(profileActions.changeState({ getArticleRequesting: false }));
  }
}
export default function* watchProfileSaga() {
  yield takeLatest(profileConstant.PROFILE_CHANGE_AVATAR, changeAvatarSaga);
  yield takeLatest(profileConstant.GET_PROFILE_USER, changeUserSaga);
  yield takeLatest(profileConstant.PROFILE_POST_ARTICLE, postArticleSaga);
  yield takeEvery(profileConstant.PROFILE_GET_ARTICLES, getArticlesSaga);
}
