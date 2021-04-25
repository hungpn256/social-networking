import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import styles from './Person.module.css';
import { UserOutlined } from '@ant-design/icons';
import * as homeActions from '../../Pages/Home/actions';
import { useDispatch } from 'react-redux';
function Person({ person }) {
  const followUser = useDispatch(homeActions.followUser(person._id));
  const handleFollow = () => {
    followUser();
  };
  return (
    <div className={styles['person']}>
      <div className={styles['person-profile']}>
        <Avatar src={person?.avatar} shape="square" size="large" icon={<UserOutlined />} />
      </div>
      <div className={styles['name']}>
        <div className={styles['main-name']}>
          <h3>{person.name.firstName + ' ' + person.name.lastName}</h3>
        </div>
        {/* <div className={styles['username']}>
          <p>@akhil</p>
        </div> */}
      </div>
      <div className={styles['send-follow-request']}>
        <button onClick={handleFollow}>Follow</button>
      </div>
    </div>
  );
}

export default Person;
