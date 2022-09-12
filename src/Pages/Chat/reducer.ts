import * as _ from 'lodash';
import { IConversation, TypeActiveMessage } from '../../Models/chat';
import {
  CHANGE_ACTIVE,
  CONVERSATION_CHANGE_STATE,
  GET_CONVERSATION_SUCCESS,
  GET_OR_CREATE_CONVERSATION_SUCCESS,
} from './constants';
const initialState: IConversationState = {
  requesting: false,
  conversations: [],
  activeConversationsIds: [],
  lastConversationId: null,
  temporaryConversation: undefined,
  isLoadMore: true,
  total: 0
};

export interface IConversationActive {
  type: TypeActiveMessage;
  _id: string;
}

export interface IConversationState {
  requesting: boolean;
  conversations: IConversation[];
  activeConversationsIds: IConversationActive[];
  lastConversationId: string | null;
  temporaryConversation?: IConversation;
  isLoadMore: boolean;
  total: number;
}

const reducer = (state = initialState, action: any): IConversationState => {
  const { activeConversationsIds, conversations, temporaryConversation } = state;
  switch (action.type) {
    case GET_CONVERSATION_SUCCESS: {
      let newTemporaryConversation = temporaryConversation;
      const newConversation = [...action.payload.conversations] as IConversation[];
      if (
        temporaryConversation &&
        newConversation.find((i) => i._id === temporaryConversation._id)
      ) {
        newTemporaryConversation = undefined;
      }

      let lastConversationId = null;

      if (action.payload.conversations && action.payload.conversations.length > 0) {
        lastConversationId = action.payload.conversations[action.payload.conversations.length - 1]._id
      }

      return {
        ...state,
        conversations: action.payload.conversations,
        temporaryConversation: newTemporaryConversation,
        isLoadMore: action.payload.conversations.length < action.payload.total,
        total: action.payload.total,
        lastConversationId
      };
    }
    case CHANGE_ACTIVE:
      const { payload } = action;
      let newTemporaryConversation = { ...temporaryConversation } as IConversation;
      let newActiveConversationIds: IConversationActive[] = [...activeConversationsIds];
      const currentConversaiton = conversations.find((i) => i._id === payload.conversationId);

      if (!currentConversaiton) {
        newTemporaryConversation = payload.conversation;
      }
      if (action.payload.isActive !== undefined) {
        const conversation = activeConversationsIds.find((i) => i._id === payload.conversationId);
        if (!conversation) {
          newActiveConversationIds = [
            ...activeConversationsIds,
            { type: payload.isActive, _id: payload.conversationId },
          ].slice(-3);
        } else {
          conversation.type = action.payload.isActive;
          newActiveConversationIds = [...activeConversationsIds];
        }
      } else {
        newActiveConversationIds = activeConversationsIds.filter(
          (i) => i._id !== payload.conversationId
        );
      }

      return {
        ...state,
        activeConversationsIds: [...newActiveConversationIds],
        temporaryConversation: newTemporaryConversation,
      };
    case CONVERSATION_CHANGE_STATE: {
      return {
        ...state,
        ...action.payload
      };
    }
    case 'CLEAR_STATE_PROFILE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
