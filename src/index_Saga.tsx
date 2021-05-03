import { all } from 'redux-saga/effects';
import watchLoginSaga from './Pages/Login/saga';
import watchProfileSaga from './Pages/Profile/saga';
import watchRegisterSaga from './Pages/Signup/saga';
import watchHomeSaga from './Pages/Home/saga';
import watchGetConversationsAsync from './Pages/Chat/shell/conversations';
import watchGetMessagesAsync from './Pages/Chat/shell/messages';
function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchRegisterSaga(),
    watchProfileSaga(),
    watchHomeSaga(),
    watchGetConversationsAsync(),
    watchGetMessagesAsync(),
  ]);
}
export default rootSaga;
