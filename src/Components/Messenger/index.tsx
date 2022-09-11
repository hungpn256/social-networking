import { Comment, Input, List, Tooltip } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNameMessage } from '../../Helper/Chat';
import { RootState } from '../../index_Reducer';
import { IConversation } from '../../Models/chat';
import { CHANGE_ACTIVE, GET_CONVERSATION } from '../../Pages/Chat/constants';
import styles from './styles.module.css';
export default function Messenger() {
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
    <div className={styles['notification-container']}>
      <div className="font-bold text-[25px] mb-[8px] ml-[12px]">Messenger</div>
      <Input placeholder="Basic usage" className="mt-[12px]" />
      <div className={styles['notification-item']}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={conversations.filter(
            (conversation) => (conversation?.messages?.length ?? 0) > 0
          )}
          renderItem={(item: IConversation) => {
            return (
              <li
                onClick={() => {
                  dispatch({
                    type: CHANGE_ACTIVE,
                    payload: {
                      conversationId: item._id,
                      isActive: true,
                    },
                  });
                }}
              >
                <Comment
                  author={getNameMessage(item, user)}
                  avatar={
                    item.participants[0].user.avatar ||
                    'https://thuvienplus.com/themes/cynoebook/public/images/default-user-image.png'
                  }
                  content={item?.messages?.[0]?.content ?? ''}
                  datetime={moment(item.updatedAt).fromNow()}
                  className="message"
                />
              </li>
            );
          }}
        />
      </div>
    </div>
  );
}
