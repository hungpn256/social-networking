import { call, put, select, takeEvery } from 'redux-saga/effects';
import { TypeActiveMessage } from '../../Models/chat';
import {
  CHANGE_ACTIVE,
  CONVERSATION_CHANGE_STATE,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_UNSEEN,
  GET_CONVERSATION_UNSEEN_SUCCESS,
  GET_MESSAGE,
  GET_MESSAGE_SUCCESS,
  GET_OR_CREATE_CONVERSATION,
  GET_OR_CREATE_CONVERSATION_SUCCESS,
  SEND_MESSAGE,
  SEND_MESSAGE_STATUS_LOADING,
  SEND_MESSAGE_SUCCESS,
  UNSEEN_CONVERSATION,
  UNSEEN_CONVERSATION_SUCCESS,
} from './constants';
import {
  createConversation,
  createMessage,
  getConversation,
  getMessageByConversationId,
  getNumOfConversationUnseen,
  postNumOfConversationUnseen,
} from './service';

function* getConversationSaga({ payload }: any): any {
  yield put({ type: CONVERSATION_CHANGE_STATE, payload: { requesting: true } });
  try {
    const currentConversations = yield select((state) => state.conversation.conversations);
    const res = yield call(getConversation, payload);
    yield put({
      type: GET_CONVERSATION_SUCCESS,
      payload: {
        conversations: [...currentConversations, ...res.data.conversations],
        total: res.data.total,
      },
    });
  } catch (err) {
    console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*getConversationSaga ~ err', err);
  } finally {
    yield put({ type: CONVERSATION_CHANGE_STATE, payload: { requesting: false } });
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

function* getMessageSaga({ payload }: any): any {
  try {
    const res = yield call(
      getMessageByConversationId,
      payload.conversationId,
      payload.lastMessageId
    );
    const messages = res.data.messages;
    const total = res.data.total;
    yield put({
      type: GET_MESSAGE_SUCCESS,
      payload: {
        messages,
        conversationId: payload.conversationId,
        total,
      },
    });
  } catch (err) {
    console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*getConversationSaga ~ err', err);
  }
}

function* sendMessageSaga({ payload }: any): any {
  try {
    const { message } = payload;
    yield put({
      type: SEND_MESSAGE_STATUS_LOADING,
      payload: {
        message,
        conversationId: payload.conversationId,
      },
    });
    const res = yield call(createMessage, payload.conversationId, {
      content: message.content,
      conversation: message.conversation,
      files: message.files,
    });
    const newMessage = res.data.message;
    yield put({
      type: SEND_MESSAGE_SUCCESS,
      payload: {
        message: newMessage,
        conversationId: payload.conversationId,
        oldMessageId: message._id,
      },
    });
    // const messages = res.data.messages;
    // const total = res.data.total;
  } catch (err) {
    console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*getConversationSaga ~ err', err);
  }
}

function* getNumOfConversationUnseenSaga(): any {
  try {
    const res = yield call(getNumOfConversationUnseen);
    yield put({
      type: GET_CONVERSATION_UNSEEN_SUCCESS,
      payload: {
        numOfConversationUnseen: res.data.numOfConversationUnseen,
      },
    });
  } catch (err) {
    console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*getConversationSaga ~ err', err);
  }
}

function* unseenConversationSaga({ payload }: any): any {
  try {
    const user = yield select((state) => state.login.user);
    yield put({
      type: UNSEEN_CONVERSATION_SUCCESS,
      payload: {
        conversationId: payload.conversationId,
        userId: user._id,
      },
    });
    yield call(postNumOfConversationUnseen, { conversationId: payload.conversationId });
  } catch (err) {
    console.log('🚀 ~ file: saga.ts ~ line 9 ~ function*getConversationSaga ~ err', err);
  }
}

export default function* watchChatSaga() {
  yield takeEvery(GET_CONVERSATION, getConversationSaga);
  yield takeEvery(GET_OR_CREATE_CONVERSATION, getOrCreateConversationSaga);
  yield takeEvery(GET_MESSAGE, getMessageSaga);
  yield takeEvery(SEND_MESSAGE, sendMessageSaga);
  yield takeEvery(GET_CONVERSATION_UNSEEN, getNumOfConversationUnseenSaga);
  yield takeEvery(UNSEEN_CONVERSATION, unseenConversationSaga);
}
