import { toast } from 'react-toastify';
import { call, put, takeEvery, takeLatest, all, select } from 'redux-saga/effects';
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
export default function* watchHomeSaga() {
  yield takeLatest(homeConstant.HOME_GET_USER_RECOMMENT, getUserRecommentSaga);
}
