import { toast } from 'react-toastify';
import { AnyAction } from 'redux';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import handleUpload from '../../Helper/UploadImage';
import * as profileActions from './actions';
import * as profileConstant from './constants';
import services from './service';

//Change cover
function* changeCoverSaga({ payload }: AnyAction) {
  yield put(profileActions.changeState({ changeCoverRequesting: true }));
  try {
    const urlImage = yield call(handleUpload, payload);
    const res = yield call(services.updateProfile, { cover: urlImage.url });
    yield put(profileActions.postArticle({ files: [urlImage], action: 'Changed cover' }));
    yield put(profileActions.changeCoverSuccess(res.data));
    // toast.success('change cover success');
  } catch (err) {
    yield put(profileActions.changeCoverFail(err));
    toast.error('change cover fail');
  } finally {
    yield put(profileActions.changeState({ changeCoverRequesting: false }));
  }
}
// Change avatar
function* changeAvatarSaga({ payload }: AnyAction) {
  yield put(profileActions.changeState({ requesting: true }));
  try {
    const urlImage = yield call(handleUpload, payload);
    const res = yield call(services.updateProfile, { avatar: urlImage.url });
    yield put(profileActions.postArticle({ files: [urlImage], action: 'Changed avatar' }));
    yield put(profileActions.changeAvatarSuccess(res.data));
    // toast.success('change avatar success');
  } catch (err) {
    yield put(profileActions.changeAvatarFail(err));
    toast.error('change avatar fail');
  } finally {
    yield put(profileActions.changeState({ requesting: false }));
  }
}

//Change User
function* changeUserSaga({ payload }: AnyAction) {
  yield put(profileActions.changeState({ loadingPage: true }));
  const arrayService = [{ service: services.getProfileUser, payload: payload }];
  try {
    const [resUser] = yield all(
      arrayService.map((service) => call(service.service, service.payload))
    );
    yield put(profileActions.getUserSuccess({ ...resUser.data }));
  } catch (err) {
    yield put(profileActions.getUserFail(err));
    toast.error('get profile fail');
  } finally {
    yield put(profileActions.changeState({ loadingPage: false }));
  }
}

// Post Article
function* postArticleSaga({ payload }: AnyAction) {
  yield put(profileActions.changeState({ postArticleRequesting: true }));
  try {
    if (payload.files.length > 0) {
      if (!payload.files[0].url) {
        const urlImage: any = yield all(payload.files.map((i) => call(handleUpload, i)));
        payload.files = urlImage;
      }
    }
    const res = yield call(services.postArticle, payload);
    toast.success('Post successful');
    yield put(profileActions.postArticleSuccess(res.data.post));
  } catch (err) {
    yield put(profileActions.postArticleFail(err));
    toast.error('post article fail');
  } finally {
    yield put(profileActions.changeState({ postArticleRequesting: false }));
  }
}
//deleteArticle
function* deleteArticleSaga({ payload }: AnyAction) {
  yield put(profileActions.changeState({ deleteArticleRequesting: true }));
  try {
    const res = yield call(services.deleteArticle, payload);
    yield put(profileActions.deleteArticleSuccess(res.data.post));
    // toast.success('delete article success');
  } catch (err) {
    yield put(profileActions.deleteArticleFail(err));
    toast.error('delete article fail');
  } finally {
    yield put(profileActions.changeState({ deleteArticleRequesting: false }));
  }
}
//Get Articles
function* getArticlesSaga({ payload }: AnyAction) {
  yield put(profileActions.changeState({ getArticleRequesting: true }));
  try {
    const res = yield call(services.getArticles, { ...payload });
    yield put(profileActions.getArticlesSuccess(res.data.posts));
    // toast.success('get article success');
  } catch (err) {
    yield put(profileActions.getArticlesFail(err));
    toast.error('get article fail');
  } finally {
    yield put(profileActions.changeState({ getArticleRequesting: false }));
  }
}

export default function* watchProfileSaga() {
  yield takeLatest(profileConstant.PROFILE_CHANGE_AVATAR, changeAvatarSaga);
  yield takeLatest(profileConstant.PROFILE_CHANGE_COVER, changeCoverSaga);
  yield takeLatest(profileConstant.GET_PROFILE_USER, changeUserSaga);
  yield takeLatest(profileConstant.PROFILE_POST_ARTICLE, postArticleSaga);
  yield takeEvery(profileConstant.PROFILE_GET_ARTICLES, getArticlesSaga);
  yield takeEvery(profileConstant.PROFILE_DELETE_ARTICLE, deleteArticleSaga);
}
