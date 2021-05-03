import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ChatForm from '../../../Components/chat/chat-form/ChatForm';
import ChatTitle from '../../../Components/chat/chat-title/ChatTitle';
import ConversationList from '../../../Components/chat/conversation/conversation-list/ConversationList';
import ConversationSearch from '../../../Components/chat/conversation/conversation-search/ConversationSearch';
import NewConversation from '../../../Components/chat/conversation/new-conversation/NewConversation';
import NoConversations from '../../../Components/chat/conversation/no-conversations/NoConversations';

import {
  conversationChanged,
  newMessageAdded,
  conversationDeleted,
  conversationsRequested,
} from '../shell/action';
import MessageList from '../message/MessageList';

import './ChatShell.scss';

const ChatShell = ({
  conversations,
  selectedConversation,
  conversationChanged,
  onMessageSubmitted,
  onDeleteConversation,
  loadConversations,
}) => {
  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  let conversationContent = (
    <>
      <NoConversations></NoConversations>
    </>
  );

  if (conversations.length > 0) {
    conversationContent = (
      <>
        <MessageList conversationId={selectedConversation.id} />
      </>
    );
  }

  return (
    <div id="chat-container">
      <ConversationSearch conversations={conversations} />
      <ConversationList
        onConversationItemSelected={conversationChanged}
        conversations={conversations}
        selectedConversation={selectedConversation}
      />
      <NewConversation />
      <ChatTitle
        selectedConversation={selectedConversation}
        onDeleteConversation={onDeleteConversation}
      />
      {conversationContent}
      <ChatForm
        selectedConversation={selectedConversation}
        onMessageSubmitted={onMessageSubmitted}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.conversationState.conversations,
    selectedConversation: state.conversationState.selectedConversation,
  };
};

const mapDispatchToProps = (dispatch) => ({
  conversationChanged: (conversationId) => dispatch(conversationChanged(conversationId)),
  onMessageSubmitted: (messageText) => {
    dispatch(newMessageAdded(messageText));
  },
  onDeleteConversation: () => {
    dispatch(conversationDeleted());
  },
  loadConversations: () => {
    dispatch(conversationsRequested());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatShell);
