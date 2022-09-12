import { TakeableChannel } from 'redux-saga';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { TypeActiveMessage } from '../../Models/chat';
import {
  CHANGE_ACTIVE,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_OR_CREATE_CONVERSATION,
  GET_OR_CREATE_CONVERSATION_SUCCESS,
} from './constants';
import { createConversation, getConversation } from './service';

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

function* getOrCreateConversationSaga({ payload }: any): any {
  try {
    const res = yield call(createConversation, payload);
    const conversation = res.data.conversation;
    yield put({ type: GET_OR_CREATE_CONVERSATION_SUCCESS, payload: conversation });
    yield put({
      type: CHANGE_ACTIVE,
      payload: {
        conversation,
        conversationId: conversation._id,
        isActive: TypeActiveMessage.ACTIVE,
      },
    });
  } catch (err) {
    console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*getConversationSaga ~ err', err);
  }
}

export default function* watchChatSaga() {
  yield takeEvery(GET_CONVERSATION, getConversationSaga);
  yield takeEvery(GET_OR_CREATE_CONVERSATION, getOrCreateConversationSaga);
}
