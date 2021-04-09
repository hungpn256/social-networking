import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import * as loginActions from './actions';
import * as loginConstants from './constants';
import services from './service';
import { toast } from 'react-toastify';
function* loginSaga({ payload }) {
  yield put(loginActions.changeState({ requesting: true }));
  try {
    const res = yield call(services.login, payload);
    yield put(loginActions.loginSuccess(res.data));
    toast.success('Login success');
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    yield put(loginActions.loginFail(err));
    toast.error('Login fail');
  } finally {
    yield put(loginActions.changeState({ requesting: false }));
  }
}

export default function* watchLoginSaga() {
  yield takeLatest(loginConstants.LOGIN, loginSaga);
}
