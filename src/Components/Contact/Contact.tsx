import { Affix } from 'antd';
import React from 'react';
import IUser from '../../Models/user';
import Person from '../Person/Person';
import Trend from '../trend/Trend';
import styles from './contact.module.css';

interface Props {
  friend: IUser[];
}
function Contact({ friend }: Props) {
  return (
    <div className={styles['trending-menu']}>
      <div className={styles['trending-center']}>
        <div className={styles['follow']}>
          <div className={styles['header']}>
            <p>Contact</p>
          </div>
          <div className={styles['persons']}>
            {friend &&
              friend.map((person) => {
                return <Person key={person._id} person={person} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
