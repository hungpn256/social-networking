import { Button } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ip } from '../../configs/ip';
import { getImage, getLinkNotification, getTitleNotification } from '../../Helper/Notification';
import { RootState } from '../../index_Reducer';
import { INotification } from '../../Models/notification';
import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_UNSEEN,
  NOTIFICATION_UNSEEN_ALL,
  NOTIFICATION_UNSEEN_SUCCESS,
} from '../../Pages/Notification/constants';
import styles from './styles.module.css';

interface Props {
  setShowNotificaiton: (value: boolean) => void;
}

export default forwardRef(function Notification({ setShowNotificaiton }: Props, ref: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    dispatch({ type: GET_NOTIFICATION });
    dispatch({ type: GET_NOTIFICATION_UNSEEN });
  };

  const unSeen = async (i: INotification) => {
    setShowNotificaiton(false);
    if (!i.isSeen) {
      dispatch({ type: NOTIFICATION_UNSEEN_SUCCESS, payload: { notificationId: i._id } });
      await axios.post(`${ip}/notification/unSeen`, { notificationId: i._id });
    }
    history.push(getLinkNotification(i));
  };

  const seeAll = async () => {
    dispatch({ type: NOTIFICATION_UNSEEN_ALL });
    await axios.post(`${ip}/notification/unSeen-all`);
  };
  return (
    <div ref={ref} className={styles['notification-container']}>
      <div className="flex justify-between">
        <div className="font-bold text-title" style={{ marginBottom: 8, marginLeft: 12 }}>
          Notifications
        </div>
        <Button onClick={seeAll}>See all</Button>
      </div>
      {notifications.map((i) => {
        return (
          <div
            className={`${styles['notification-item']} hover ${
              i.isSeen ? '' : styles['notification-unseen']
            }`}
            key={i._id}
            onClick={() => unSeen(i)}
          >
            <div className="flex" style={{ padding: 4 }}>
              <img alt="notification" src={getImage(i)} className={styles['image']} />
              <div className={`${styles['content']}`}>
                <div
                  className={styles['title']}
                  dangerouslySetInnerHTML={{ __html: getTitleNotification(i) }}
                ></div>
                <div className={styles['time']}>{moment(i.updatedAt).fromNow()}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
