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

function* fetchFriendSaga({ payload }: { payload: string }) {
  try {
    const res = yield call(services.getFriend, payload);
    yield put({
      type: homeConstant.HOME_GET_FRIEND_SUCCESS,
      payload: { friend: res.data.friends },
    });
  } catch (err) {
    toast.error('get friend fail');
  }
}
export default function* watchHomeSaga() {
  yield takeLatest(homeConstant.HOME_GET_ARTICLE, getArticleSaga);
  yield takeLatest(homeConstant.GET_FRIEND, fetchFriendSaga);
}
