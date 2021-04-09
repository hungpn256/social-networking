import watchLoginSaga from './Pages/Login/saga';
import { takeEvery, put, call, all } from 'redux-saga/effects';
import watchRegisterSaga from './Pages/Signup/saga';
function* rootSaga() {
  yield all([watchLoginSaga(), watchRegisterSaga()]);
}
export default rootSaga;
