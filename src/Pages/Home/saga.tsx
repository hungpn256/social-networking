import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as homeActions from './actions';
import * as homeConstant from './constants';
import services from './service';
function* getUserRecommentSaga({ payload }) {
  yield put(homeActions.changeState({ UserRecommentRequesting: true }));
  try {
    const userRecomment = yield call(services.getUserRecomment);
    yield put(homeActions.getUserRecommentSuccess({ userRecomment: userRecomment.data }));
  } catch (err) {
    homeActions.getUserRecommentFail(err);
  }
}
function* getArticleSaga() {
  try {
    const res = yield call(services.getArticle);
    yield put(homeActions.getArticleSuccess(res.data.posts));
  } catch (err) {
    toast.error('get article fail');
  }
}
export default function* watchHomeSaga() {
  yield takeLatest(homeConstant.HOME_GET_USER_RECOMMENT, getUserRecommentSaga);
  yield takeLatest(homeConstant.HOME_GET_ARTICLE, getArticleSaga);
}
