import * as _ from 'lodash';
import { IConversation } from '../../Models/chat';
import { CHANGE_ACTIVE, GET_CONVERSATION_SUCCESS } from './constants';
const initialState: IConversationState = {
  requesting: false,
  conversations: [],
};

export interface IConversationState {
  requesting: boolean;
  conversations: IConversation[];
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: action.payload,
      };
    case CHANGE_ACTIVE:
      const { conversations } = state;
      const conversationChangeActive = conversations.find(
        (conversation): boolean => conversation._id === action.payload.conversationId
      );

      if (conversationChangeActive) {
        conversationChangeActive.isActive = action.payload.isActive;
      }
      console.log('🚀 ~ file: reducer.ts ~ line 23 ~ reducer ~ conversations', conversations);

      return {
        ...state,
        conversations: [...conversations],
      };
    default:
      return { ...state };
  }
};
export default reducer;
