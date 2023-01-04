import { toast } from 'react-toastify';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as loginActions from './actions';
import * as loginConstants from './constants';
import services from './service';
import { AnyAction } from 'redux';
function* loginSaga({ payload }: AnyAction) {
  yield put(loginActions.changeState({ requesting: true }));
  try {
    const res = yield call(services.login, payload);
    yield put(loginActions.loginSuccess(res.data));
    // toast.success('Login success');
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    yield put(loginActions.loginFail(err));
    toast.error('Login fail');
  } finally {
    yield put(loginActions.changeState({ requesting: false }));
  }
}
function* followUserSaga({ payload }: AnyAction) {
  try {
    yield call(services.followUser, payload);
    // toast.success('follow success');
  } catch (err) {
    console.log(err, 'err follow');
  }
}
export default function* watchLoginSaga() {
  yield takeLatest(loginConstants.LOGIN, loginSaga);
  yield takeEvery(loginConstants.FOLLOW_USER, followUserSaga);
}
