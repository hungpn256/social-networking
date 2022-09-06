import { all } from 'redux-saga/effects';
import watchLoginSaga from './Pages/Login/saga';
import watchProfileSaga from './Pages/Profile/saga';
import watchRegisterSaga from './Pages/Signup/saga';
import watchHomeSaga from './Pages/Home/saga';
import watchsearchSaga from './Pages/SearchNav/saga';
import watchChatSaga from './Pages/Chat/saga';
function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchRegisterSaga(),
    watchProfileSaga(),
    watchHomeSaga(),
    watchsearchSaga(),
    watchChatSaga(),
  ]);
}
export default rootSaga;
