import React from 'react';
import { useSelector } from 'react-redux';
import ChatActiveItem from '../../Components/ChatActiveItem';
import { RootState } from '../../index_Reducer';
import { IConversation } from '../../Models/chat';
import styles from './styles.module.css';

export default function Chat() {
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  ) as IConversation[];
  const conversationActive = conversations.filter((i: IConversation) => i.isActive);
  return (
    <div className={styles['container']}>
      {conversationActive.map((conversationActiveItem) => (
        <ChatActiveItem conversation={conversationActiveItem} />
      ))}
    </div>
  );
}
