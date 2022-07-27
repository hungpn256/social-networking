import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as homeActions from './actions';
import * as homeConstant from './constants';
import services from './service';

function* getArticleSaga() {
  try {
    const res = yield call(services.getArticle);
    yield put(homeActions.getArticleSuccess(res.data.posts));
  } catch (err) {
    toast.error('get article fail');
  }
}
export default function* watchHomeSaga() {
  yield takeLatest(homeConstant.HOME_GET_ARTICLE, getArticleSaga);
}
