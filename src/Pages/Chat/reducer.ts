import * as _ from 'lodash';
import { IConversation, TypeActiveMessage } from '../../Models/chat';
import { CHANGE_ACTIVE, GET_CONVERSATION_SUCCESS } from './constants';
const initialState: IConversationState = {
  requesting: false,
  conversations: [],
  activeConversationsIds: [],
  lastConversationId: null
};

export interface IConversationActive {
  type: TypeActiveMessage,
  _id: string
}

export interface IConversationState {
  requesting: boolean;
  conversations: IConversation[];
  activeConversationsIds: IConversationActive[];
  lastConversationId: string | null;
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: action.payload,
      };
    case CHANGE_ACTIVE:
      const { activeConversationsIds } = state;
      const {payload} = action
      let newActiveConversationIds = []
      if(action.payload.isActive !== undefined) {
        const conversation = activeConversationsIds.find((i)=>i._id === payload.conversationId)
        console.log("🚀 ~ file: reducer.ts ~ line 36 ~ reducer ~ conversation", conversation)
        if(!conversation){
          newActiveConversationIds = [...activeConversationsIds, {type: payload.isActive, _id: payload.conversationId}].slice(-3)
        }else{
          conversation.type = action.payload.isActive;
          newActiveConversationIds = [...activeConversationsIds]
        }
      }else{
        newActiveConversationIds = activeConversationsIds.filter((i)=>i._id !== payload.conversationId)
      }

      return {
        ...state,
        activeConversationsIds: [...newActiveConversationIds],
      };
    case 'CLEAR_STATE_PROFILE': {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};
export default reducer;
