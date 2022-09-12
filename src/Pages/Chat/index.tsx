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
  const temporaryConversation = useSelector(
    (state: RootState) => state.conversation.temporaryConversation
  );
  const active = useSelector((state: RootState) => state.conversation.activeConversationsIds);
  const conversationActive = active.map((item) => {
    let tmp = conversations.find((i) => i._id === item._id);
    if (tmp) {
      return tmp;
    } else {
      return temporaryConversation;
    }
  }) as IConversation[];
  return (
    <div className={styles['container']}>
      {conversationActive.map((conversationActiveItem) => (
        <ChatActiveItem key={conversationActiveItem._id} conversation={conversationActiveItem} />
      ))}
    </div>
  );
}
