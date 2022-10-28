import * as _ from 'lodash';
import moment from 'moment';
import { IConversation, TypeActiveMessage } from '../../Models/chat';
import {
  CHANGE_ACTIVE,
  CHANGE_NICKNAME,
  CONVERSATION_CHANGE_STATE,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_UNSEEN_SUCCESS,
  GET_MESSAGE_SUCCESS,
  ON_DELETE_MESSAGE,
  ON_NEW_MESSGAGE,
  PIN_MESSAGE,
  SEND_MESSAGE_STATUS_LOADING,
  SEND_MESSAGE_SUCCESS,
  UNSEEN_CONVERSATION_SUCCESS,
  UPDATE_CONVERSATION,
} from './constants';
const initialState: IConversationState = {
  requesting: false,
  conversations: [],
  activeConversationsIds: [],
  lastConversationUpdatedAt: null,
  temporaryConversation: undefined,
  isLoadMore: true,
  total: 0,
  isOpenCreateConversationModal: false,
  numOfConversationUnseen: 0,
};

export interface IConversationActive {
  type: TypeActiveMessage;
  _id: string;
}

export interface IConversationState {
  requesting: boolean;
  conversations: IConversation[];
  activeConversationsIds: IConversationActive[];
  lastConversationUpdatedAt: string | null;
  temporaryConversation?: IConversation;
  isLoadMore: boolean;
  total: number;
  isOpenCreateConversationModal: boolean;
  numOfConversationUnseen: number;
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

      let lastConversationUpdatedAt = null;

      if (action.payload.conversations && action.payload.conversations.length > 0) {
        lastConversationUpdatedAt =
          action.payload.conversations[action.payload.conversations.length - 1].updatedAt;
      }

      return {
        ...state,
        conversations: action.payload.conversations,
        temporaryConversation: newTemporaryConversation,
        isLoadMore: action.payload.conversations.length < action.payload.total,
        total: action.payload.total,
        lastConversationUpdatedAt,
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
    case GET_MESSAGE_SUCCESS: {
      const conversation = state.conversations.find((i) => i._id === action.payload.conversationId);
      if (conversation) {
        conversation.messages = [...conversation.messages, ...action.payload.messages];
        conversation.totalMessage = action.payload.total;
        conversation.isLoadMore = conversation.messages.length < conversation.totalMessage;
      } else if (
        state.temporaryConversation &&
        state.temporaryConversation?._id === action.payload.conversationId
      ) {
        state.temporaryConversation.messages = [
          ...state.temporaryConversation?.messages,
          ...action.payload.messages,
        ];
      }
      return {
        ...state,
        conversations: [...state.conversations],
      };
    }
    case ON_NEW_MESSGAGE: {
      const newConversation = action.payload.conversation;
      const conversation = state.conversations.find((i) => {
        return i._id === newConversation._id;
      });
      let temporaryConversation = state.temporaryConversation;
      if (newConversation._id === temporaryConversation?._id) {
        newConversation.messages = newConversation.messages.concat(temporaryConversation?.messages);
        temporaryConversation = undefined;
      }
      const { activeConversationsIds } = state;
      const conversationExist = activeConversationsIds.find((i) => i._id === newConversation._id);
      let newActiveConversationIds = activeConversationsIds;
      if (!conversationExist) {
        newActiveConversationIds = [
          { _id: newConversation._id, type: TypeActiveMessage.ACTIVE },
          ...activeConversationsIds,
        ];
      }
      if (conversation) {
        newConversation.messages = [...newConversation.messages, ...conversation.messages];
      }
      state.conversations = state.conversations.filter((i) => i._id !== newConversation._id);
      state.conversations.unshift(newConversation);

      return {
        ...state,
        conversations: [...state.conversations],
        activeConversationsIds: newActiveConversationIds,
        temporaryConversation,
      };
    }
    case SEND_MESSAGE_STATUS_LOADING: {
      let { temporaryConversation, conversations } = state;
      if (temporaryConversation && temporaryConversation._id === action.payload.conversationId) {
        temporaryConversation.messages.unshift(action.payload.message);
        temporaryConversation.updatedAt = new Date().toString();
        conversations.unshift({ ...temporaryConversation });
        temporaryConversation = undefined;
      } else {
        const conversation = conversations.find((i) => i._id === action.payload.conversationId);
        if (conversation) {
          conversation.messages.unshift(action.payload.message);
          conversation.updatedAt = new Date().toString();
        } else {
          conversations.unshift(action.payload.conversation);
        }
      }
      conversations.sort((a, b) => (moment(a.updatedAt).isAfter(moment(b.updatedAt)) ? -1 : 1));
      return {
        ...state,
        conversations: [...state.conversations],
        temporaryConversation,
      };
    }
    case SEND_MESSAGE_SUCCESS: {
      const conversation = state.conversations.find((i) => i._id === action.payload.conversationId);
      if (conversation) {
        const index = conversation.messages.findIndex((i) => i._id === action.payload.oldMessageId);
        if (index !== -1) {
          conversation.messages[index] = action.payload.message;
        }
      }
      return {
        ...state,
        conversations: [...state.conversations],
      };
    }
    case CONVERSATION_CHANGE_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CONVERSATION_UNSEEN_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UNSEEN_CONVERSATION_SUCCESS: {
      const conversation = state.conversations.find((i) => i._id === action.payload.conversationId);
      let numOfConversationUnseen = state.numOfConversationUnseen;
      if (conversation) {
        const participant = conversation.participants.find(
          (i) => i.user._id === action.payload.userId
        );
        if (participant) {
          if (moment(participant.lastSeen).isBefore(moment(conversation.messages[0].createdAt))) {
            numOfConversationUnseen =
              state.numOfConversationUnseen - 1 >= 0 ? state.numOfConversationUnseen - 1 : 0;
          }
          participant.lastSeen = Date.now().toString();
        }
      }
      return {
        ...state,
        conversations: [...state.conversations],
        numOfConversationUnseen,
      };
    }

    case UPDATE_CONVERSATION: {
      const conversation = state.conversations.find((i) => i._id === action.payload.conversationId);
      if (conversation) {
        const newConversation = action.payload.conversation;
        Object.keys(newConversation).forEach((key) => {
          conversation[key] = newConversation[key];
        });
      }
      return { ...state };
    }

    case CHANGE_NICKNAME: {
      const conversation = state.conversations.find((i) => i._id === action.payload.conversationId);
      if (conversation) {
        conversation.participants.forEach((i) => {
          if (i.user._id === action.payload.userId) {
            i.nickName = action.payload.nickName;
          }
        });
      }
      return { ...state };
    }
    case PIN_MESSAGE: {
      const conversation = state.conversations.find((i) => i._id === action.payload.conversationId);
      if (conversation) {
        conversation.pinMessage = action.payload.message;
      }
      return { ...state };
    }
    case ON_DELETE_MESSAGE: {
      const message = action.payload;
      const conversation = state.conversations.find((i) => i._id === message.conversation);
      if (conversation) {
        const messageDelete = conversation.messages.find((i) => i._id === message._id);
        if (messageDelete) {
          messageDelete.deletedAt = message.deletedAt;
        }
      }
      return { ...state };
    }
    case 'CLEAR_STATE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
