import React from 'react';
import { useSelector } from 'react-redux';
import ChatActiveItem from '../../Components/ChatActiveItem';
import { RootState } from '../../index_Reducer';
import { IConversation } from '../../Models/chat';
import { IConversationActive } from './reducer';
import styles from './styles.module.css';

export default function Chat() {
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  ) as IConversation[];
  const active = useSelector(
    (state: RootState) => state.conversation.activeConversationsIds
  ) as IConversationActive[];
  const conversationActive = conversations
    .filter((item: IConversation) => active.find((i) => i._id === item._id));
  return (
    <div className={styles['container']}>
      {conversationActive.map((conversationActiveItem) => (
        <ChatActiveItem key={conversationActiveItem._id} conversation={conversationActiveItem} />
      ))}
    </div>
  );
}
