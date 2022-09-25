import axios from 'axios';
import moment from 'moment';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ip } from '../../configs/ip';
import { getImage, getTitleNotification } from '../../Helper/Notification';
import { RootState } from '../../index_Reducer';
import { GET_NOTIFICATION_SUCCESS } from '../../Pages/Notification/constants';
import styles from './styles.module.css';

export default forwardRef(function Notification(_, ref: any) {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notification.notifications);
  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    const res = await axios.get(`${ip}/notification`);
    dispatch({ type: GET_NOTIFICATION_SUCCESS, payload: res.data.notifications });
  };
  return (
    <div ref={ref} className={styles['notification-container']}>
      <div className="font-bold text-[25px] mb-[8px] ml-[12px]">Notifications</div>
      {notifications.map((i) => {
        return (
          <div className={`${styles['notification-item']} hover`}>
            <div className="flex p-[4px]">
              <img alt="notification" src={getImage(i)} className={styles['image']} />
              <div className={styles['content']}>
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
