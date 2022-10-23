import { Card } from 'antd';
import React from 'react';
import styles from './styles.module.css';
import { PhoneFilled } from '@ant-design/icons';
import { ICall } from '../../Models/chat';

interface Props {
  calling: ICall;
  onClose: () => void;
}
export default function Calling({ calling, onClose }: Props) {
  const onAnswer = () => {
    onClose();
    window.open(`/call/${calling._id}`, '', 'width=1200,height=900');
    // window.open(`/call/${calling._id}`, '_self');
  };
  return (
    <div className={styles['container']}>
      <Card>
        <div className={styles['title']}>
          <span className={styles['name']}>{calling.createdBy.fullName}</span> calling....
        </div>
        <div className={styles['wrap-icon']}>
          <div className={`${styles['icon']} ${styles['icon-answer']}`} onClick={onAnswer}>
            <PhoneFilled style={{ color: '#ffffff', fontSize: 20 }} />
          </div>
          <div className={styles['icon']} onClick={onClose}>
            <PhoneFilled style={{ color: '#ffffff', fontSize: 20 }} />
          </div>
        </div>
      </Card>
    </div>
  );
}
