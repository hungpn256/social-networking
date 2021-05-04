const initialState = {
  messageDetails: [],
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGES_LOADED':
      const { conversationId, messages, hasMoreMessages, lastMessageId } = action.payload;
      const currentConversationMapEntry = state.messageDetails[conversationId];
      const newConversationMapEntry = { hasMoreMessages, lastMessageId, messages: [] };

      if (currentConversationMapEntry) {
        newConversationMapEntry.messages = [...currentConversationMapEntry.messages];
      }

      newConversationMapEntry.messages = [...newConversationMapEntry.messages, ...messages];

      const newMessageDetails = { ...state.messageDetails };
      newMessageDetails[conversationId] = newConversationMapEntry;

      return { messageDetails: newMessageDetails };
    case 'NEW_MESSAGE_ADDED': {
      if (state.messageDetails) {
        const newState = { ...state };
        newState.messageDetails[action.conversationId].messages.unshift({
          imageUrl: null,
          imageAlt: null,
          messageText: action.textMessage,
          createdAt: 'Apr 16',
          isMyMessage: true,
        });
        return newState;
      }

      return state;
    }
    default:
      return state;
  }
};

export default messagesReducer;
