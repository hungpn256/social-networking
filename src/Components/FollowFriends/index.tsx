import React from 'react';
import styles from './styles.module.css';
import avatar from '../../Assets/user.png';
import { Link } from 'react-router-dom';
export default function FlowFriend() {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['outer']}>
        <div className={`${styles['card']} ${styles['delay-1']}`}>
          <div className={styles['content']}>
            <div className={styles['img']}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles['details']}>
              <span className={styles['name']}>Sumit Kapoor</span>
              <p>Frontend Developer</p>
            </div>
          </div>
          <Link to={`/profile/id123`}>Follow</Link>
        </div>
        <div className={`${styles['card']} ${styles['delay0']}`}>
          <div className={styles['content']}>
            <div className={styles['img']}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles['details']}>
              <span className={styles['name']}>Andrew Neil</span>
              <p>YouTuber & Blogger</p>
            </div>
          </div>
          <Link to={`/profile/id123`}>Follow</Link>
        </div>
        <div className={`${styles['card']} ${styles['delay1']}`}>
          <div className={styles['content']}>
            <div className={styles['img']}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles['details']}>
              <span className={styles['name']}>Jasmine Carter</span>
              <p>Freelancer & Vlogger</p>
            </div>
          </div>
          <Link to={`/profile/id123`}>Follow</Link>
        </div>
        <div className={`${styles['card']} ${styles['delay2']}`}>
          <div className={styles['content']}>
            <div className={styles['img']}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles['details']}>
              <span className={styles['name']}>Justin Chung</span>
              <p>Backend Developer</p>
            </div>
          </div>
          <Link to={`/profile/id123`}>Follow</Link>
        </div>
        <div className={`${styles['card']} ${styles['delay3']}`}>
          <div className={styles['content']}>
            <div className={styles['img']}>
              <img src={avatar} alt="" />
            </div>
            <div className={styles['details']}>
              <span className={styles['name']}>Adrina Calvo</span>
              <p>Teacher & Advertiser</p>
            </div>
          </div>
          <Link to={`/profile/id123`}>Follow</Link>
        </div>
      </div>
    </div>
  );
}
