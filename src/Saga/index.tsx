import * as loginSaga from '../Pages/Login/saga';
import * as loginConstants from '../Pages/Login/constants';
import { takeEvery, put, call } from 'redux-saga/effects';
function* rootSaga() {
  yield takeEvery(loginConstants.LOGIN, loginSaga.loginSaga);
}
export default rootSaga;
