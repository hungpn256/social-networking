import { TakeableChannel } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { GET_CONVERSATION, GET_CONVERSATION_SUCCESS } from './constants';
import { getConversation } from './service';

function* getConversationSaga({ payload }: any): any {
  console.log('🚀 ~ file: saga.ts ~ line 6 ~ function*getConversationSaga ~ payload', payload);
  try {
    const res = yield call(getConversation, payload);
    yield put({ type: GET_CONVERSATION_SUCCESS, payload: res.data.conversations });
    console.log('🚀 ~ file: saga.ts ~ line 8 ~ function*getConversationSaga ~ res', res);
  } catch (err) {
    console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*getConversationSaga ~ err', err);
  }
}

export default function* watchChatSaga() {
  yield takeEvery(GET_CONVERSATION, getConversationSaga);
}
