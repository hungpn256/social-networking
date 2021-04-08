import watchLoginSaga from '../Pages/Login/saga';
import * as loginConstants from '../Pages/Login/constants';
import { takeEvery, put, call, all } from 'redux-saga/effects';
function* rootSaga() {
  yield all([watchLoginSaga()]);
}
export default rootSaga;
