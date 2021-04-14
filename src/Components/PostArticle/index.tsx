import React from 'react';
import styles from './styles.module.css';
import { Input } from 'antd';

const { TextArea } = Input;
export default function index() {
  return (
    <>
      <div className={styles['body']}>
        <div className={styles['wrapper']}>
          <div className={styles['input-box']}>
            <div className={styles['tweet-area']}>
              <TextArea
                className={styles['tweet-area-text']}
                placeholder={`What's happening?`}
                rows={3}
              ></TextArea>
            </div>
            <div className={styles['privacy']}>
              <i className={styles['fas fa-globe-asia']}></i>
              <span>Everyone can reply</span>
            </div>
          </div>
          <div className={styles['bottom']}>
            <ul className={styles['icons']}>
              <li>
                <i className={styles['uil uil-capture']}></i>
              </li>
              <li>
                <i className={styles['far fa-file-image']}></i>
              </li>
              <li>
                <i className={styles['fas fa-map-marker-alt']}></i>
              </li>
              <li>
                <i className={styles['far fa-grin']}></i>
              </li>
              <li>
                <i className={styles['far fa-user']}></i>
              </li>
            </ul>
            <div className={styles['content']}>
              <span className={styles['counter']}>100</span>
              <button>Tweet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
