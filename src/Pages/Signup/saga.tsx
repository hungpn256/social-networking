import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as signUpActions from './actions';
import * as signUpConstants from './constants';
import services from './service';
function* signUpSaga({ payload }) {
  yield put(signUpActions.changeState({ requesting: true }));
  try {
    const res = yield call(services.register, payload);
    if (res.data) {
      yield put(signUpActions.signUpSuccess(res.data));
      toast.success('Đăng ký thành công');
    }
  } catch (error) {
    yield put(signUpActions.signUpFail(error));
    toast.error(error.response.data.error);
  } finally {
    yield put(signUpActions.changeState({ requesting: false }));
  }
}
export default function* watchLoginSaga() {
  yield takeLatest(signUpConstants.SIGN_UP, signUpSaga);
}
