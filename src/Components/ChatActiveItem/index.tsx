import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Card, Divider, Input } from 'antd';
import React from 'react';
import styles from './styles.module.css';
import { SendOutlined, FileImageOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { CHANGE_ACTIVE } from '../../Pages/Chat/constants';
import { IConversation } from '../../Models/chat';

interface Props {
  conversation: IConversation;
}

export default function ChatActiveItem({ conversation }: Props) {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch({
      type: CHANGE_ACTIVE,
      payload: {
        conversationId: conversation._id,
        isActive: false,
      },
    });
  };
  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['infor']}>
          <Avatar />
          <span className={styles['name']}>Phạm Năng Hưng</span>
        </div>
        <div className={styles['icon-close']} onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className={styles['content']}>
        <div className={styles['message']}>
          <div className={styles['isMine']}>hung asd 12312 jdaks1</div>
          <div className={styles['isNotMine']}>
            <Avatar /> <span className={styles['text-isNotMine']}>hung asd 12312 jdaks1</span>
          </div>
          <div className={styles['isMine']}>hung asd 12312 jdaks1</div>
          <div className={styles['isNotMine']}>
            <Avatar /> <span className={styles['text-isNotMine']}>hung asd 12312 jdaks1</span>
          </div>
          <div className={styles['isMine']}>hung asd 12312 jdaks1</div>
          <div className={styles['isNotMine']}>
            <Avatar /> <span className={styles['text-isNotMine']}>hung asd 12312 jdaks1</span>
          </div>
          <div className={styles['isMine']}>hung asd 12312 jdaks1</div>
          <div className={styles['isNotMine']}>
            <Avatar /> <span className={styles['text-isNotMine']}>hung asd 12312 jdaks1</span>
          </div>
        </div>
        <div className={styles['input-wrapper']}>
          <div className="flex">
            <div className={styles['icon']}>
              <FileImageOutlined style={{ fontSize: 20 }} />
            </div>
            <div className={styles['icon']}>
              <FileImageOutlined style={{ fontSize: 20 }} />
            </div>
          </div>
          <Input.Group compact className={styles['input-wrapper']}>
            <Input className={styles['input']} />
            <Button type="ghost">
              <SendOutlined />
            </Button>
          </Input.Group>
        </div>
      </div>
    </div>
  );
}
