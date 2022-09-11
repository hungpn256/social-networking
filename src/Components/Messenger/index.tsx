import { Input, List } from 'antd';
import moment from 'moment';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAvatarMessage, getNameMessage } from '../../Helper/Chat';
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
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  ) as IConversation[];
  const user = useSelector((state: RootState) => state.login.user);
  useEffect(() => {
    if (!(conversations.length > 0)) {
      dispatch({ type: GET_CONVERSATION, payload: null });
    }
  }, []);
  return (
    <div className={styles['notification-container']} ref={ref}>
      <div className="font-bold text-[25px] mb-[8px] ml-[12px]">Messenger</div>
      <Input placeholder="Search conversation...." className="mt-[12px]" />
      <div className={styles['notification-item']}>
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
                    <div className={styles['conversation-item-name']}>{getNameMessage(item, user)} <span className={styles['conversation-item-time']}>{moment().format('YYYY-MM-DD HH:mm')}</span></div>
                    <div className={styles['conversation-item-content']}>content dài content dàicontent dàicontent dàicontent dàicontent dài</div>
                  </div>
                </div>
              </li>
            );
          }}
        />
      </div>
    </div >
  )
}
)
