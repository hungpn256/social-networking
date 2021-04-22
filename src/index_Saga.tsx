import { all } from 'redux-saga/effects';
import watchLoginSaga from './Pages/Login/saga';
import watchProfileSaga from './Pages/Profile/saga';
import watchRegisterSaga from './Pages/Signup/saga';
import watchHomeSaga from './Pages/Home/saga';
function* rootSaga() {
  yield all([watchLoginSaga(), watchRegisterSaga(), watchProfileSaga(), watchHomeSaga()]);
}
export default rootSaga;
