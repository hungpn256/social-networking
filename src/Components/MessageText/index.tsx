import { PushpinOutlined, UserOutlined } from '@ant-design/icons';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Image } from 'antd';
import axios from 'axios';
import { CSSProperties, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ip } from '../../configs/ip';
import { getNickNameOrName } from '../../Helper/Chat';
import { RootState } from '../../index_Reducer';
import { IConversation, IMessage, TypeMessage } from '../../Models/chat';
import IUser from '../../Models/user';
import { PIN_MESSAGE, SEND_MESSAGE } from '../../Pages/Chat/constants';
import { updateConversation } from '../../Pages/Chat/service';
import styles from './styles.module.css';

export default function MessageText({
  message,
  endBlock,
  startBlock,
  conversation,
  setReply,
}: {
  message: IMessage;
  endBlock: boolean;
  startBlock: boolean;
  conversation: IConversation;
  setReply: (message: IMessage) => void;
}) {
  const user = useSelector((state: RootState) => state.login.user) as IUser;
  const isMine = user._id === message.createdBy._id;

  const isDeleted = !!message.deletedAt;
  const styleBorder = useMemo(() => {
    const res: CSSProperties = {};
    const borderTop = `borderTop${isMine ? 'Right' : 'Left'}Radius`;
    const borderBottom = `borderBottom${isMine ? 'Right' : 'Left'}Radius`;
    if (startBlock) {
      res[borderTop as 'borderRadius'] = 16;
      res.marginTop = 4;
    }

    if (endBlock) {
      res[borderBottom as 'borderRadius'] = 16;
    }
    return res;
  }, [startBlock, endBlock, isMine]);

  const dispatch = useDispatch();

  const removeMessage = async () => {
    try {
      await axios.delete(`${ip}/conversation/message/${message._id}`);
    } catch (err) {
      toast.error('cannot remove message');
    }
  };

  const pinMessage = async () => {
    await updateConversation(conversation._id, {
      pinMessage: message._id,
    });
    dispatch({
      type: PIN_MESSAGE,
      payload: { conversationId: conversation._id, message: message },
    });
    dispatch({
      type: SEND_MESSAGE,
      payload: {
        message: {
          content: `${user.fullName} pinned a message`,
          _id: Date.now().toString(),
          type: TypeMessage.NOTIFICATION,
          conversation: conversation._id,
          createdBy: {
            _id: user?._id,
            avatar: user?.avatar,
            fullName: user?.fullName,
          },
          status: 'LOADING',
        },
        conversationId: conversation._id,
      },
    });
  };

  return (
    <div className={styles[isMine ? 'isMine' : 'isNotMine']}>
      {!isMine && (
        <div style={{ width: 35, height: 35 }}>
          {endBlock && <Avatar src={message.createdBy.avatar} icon={<UserOutlined />} />}
        </div>
      )}
      <div className={`${styles['content-message']} ${isMine && styles['content-end']}`}>
        {!isMine && startBlock && (
          <div className={`${styles['name-author']} text-gray`}>
            {getNickNameOrName(conversation, message.createdBy)}
          </div>
        )}
        {isDeleted ? (
          <div
            className={styles['wrap-content']}
            style={{ alignItems: isMine ? 'flex-end' : 'flex-start' }}
          >
            <div className={!isMine ? styles['text-wrap-isNotMine'] : styles['text-wrap-isMine']}>
              <div
                style={{ ...styleBorder, padding: '4px' }}
                className={!isMine ? styles['text-isNotMine'] : styles['text-isMine']}
              >
                <i>
                  <u>Message 's been deleted</u>
                </i>
              </div>
            </div>
          </div>
        ) : (
          <>
            {message.content && (
              <div
                className={styles['wrap-content']}
                style={{ alignItems: isMine ? 'flex-end' : 'flex-start' }}
              >
                {message.reply && (
                  <div
                    className={
                      !isMine ? styles['text-reply-isNotMine'] : styles['text-reply-isMine']
                    }
                  >
                    {message.reply.content}
                  </div>
                )}
                <div
                  className={!isMine ? styles['text-wrap-isNotMine'] : styles['text-wrap-isMine']}
                >
                  <div
                    style={styleBorder}
                    className={!isMine ? styles['text-isNotMine'] : styles['text-isMine']}
                  >
                    <div>{message.content}</div>
                  </div>
                  {message.content && (
                    <div
                      className={styles['options']}
                      style={isMine ? { right: '100%' } : { left: '100%' }}
                    >
                      <PushpinOutlined
                        title="pin message"
                        className={`${styles['icon']} hover`}
                        onClick={pinMessage}
                      />
                      <div className={`${styles['icon']} hover`} onClick={() => setReply(message)}>
                        <FontAwesomeIcon
                          icon={faReply}
                          style={{ fontSize: 14, padding: 0 }}
                          title="reply"
                        />
                      </div>
                      {isMine && (
                        <div className={`${styles['icon']} hover`} onClick={removeMessage}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ fontSize: 14, padding: 0 }}
                            title="reply"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className={styles['wrap-images']}>
              {message.files &&
                message.files.map((i) => {
                  return (
                    <div
                      style={{
                        minWidth: '50%',
                        width: `${100 / message.files.length}%`,
                        maxWidth: '100%',
                        flex: 1,
                      }}
                    >
                      <Image.PreviewGroup>
                        <Image
                          width="100%"
                          style={{
                            aspectRatio: '4 / 3',

                            objectFit: 'cover',
                          }}
                          src={i.url}
                        ></Image>
                      </Image.PreviewGroup>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
