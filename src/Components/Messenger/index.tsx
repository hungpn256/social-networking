import { Divider, Input, List, Skeleton } from 'antd';
import moment from 'moment';
import { forwardRef, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatarMessage, getLastMessage, getNameMessage } from '../../Helper/Chat';
import { RootState } from '../../index_Reducer';
import { IConversation, TypeActiveMessage } from '../../Models/chat';
import { CHANGE_ACTIVE, GET_CONVERSATION } from '../../Pages/Chat/constants';
import GroupAvatar from '../GroupAvatar';
import styles from './styles.module.css';

interface Props {
  setShowMessenger: (value: boolean) => void
}

export default forwardRef(function Messenger({ setShowMessenger }: Props, ref: any) {
  const dispatch = useDispatch();
  const conversationsState = useSelector(
    (state: RootState) => state.conversation
  )
  const { lastConversationUpdatedAt, conversations, isLoadMore, total, requesting } = conversationsState
  const user = useSelector((state: RootState) => state.login.user);
  useEffect(() => {
    if (!(conversations.length > 0)) {
      dispatch({ type: GET_CONVERSATION, payload: lastConversationUpdatedAt });
    }
  }, []);

  const onLoadMore = () => {
    if (requesting || !isLoadMore) return;
    dispatch({ type: GET_CONVERSATION, payload: lastConversationUpdatedAt });
  }
  return (
    <div ref={ref}>
      <div className={styles['notification-container']} id='conversation'>
        <div className="font-bold text-[25px] mb-[8px] ml-[12px]">Messenger</div>
        <Input placeholder="Search conversation...." className="mt-[12px]" />
        <div className={styles['notification-item']}>
          <InfiniteScroll
            dataLength={conversations.length}
            next={onLoadMore}
            hasMore={isLoadMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="conversation"
          >
            <List
              className={styles['conversation-list']}
              itemLayout="horizontal"
              dataSource={conversations
                // .filter(
                // (conversation) => (conversation?.messages?.length ?? 0) > 0)
              }
              renderItem={(item: IConversation, id: number) => {
                return (
                  <li
                    className="hover"
                    onClick={() => {
                      setShowMessenger(false)
                      dispatch({
                        type: CHANGE_ACTIVE,
                        payload: {
                          conversationId: item._id,
                          isActive: TypeActiveMessage.ACTIVE,
                        },
                      });
                    }}
                  >
                    <div className={styles['conversation-item']}>
                      <GroupAvatar src={getAvatarMessage(item, user)} />
                      <div className={styles['conversation-item-right']}>
                        <div className={styles['conversation-item-name']}>{getNameMessage(item, user)} <span className={styles['conversation-item-time']}>{moment(item.updatedAt).format('hh:mm')}</span></div>
                        <div className={styles['conversation-item-content']}>{getLastMessage(item)}</div>
                      </div>
                    </div>
                  </li>
                );
              }}
            />
          </InfiniteScroll>
        </div>
      </div >
    </div >
  )
}
)
