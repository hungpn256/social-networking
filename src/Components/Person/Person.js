import Avatar from 'antd/lib/avatar/avatar';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './Person.module.css';
import { UserOutlined } from '@ant-design/icons';
import * as loginActions from '../../Pages/Login/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
function Person({ person }) {
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(loginActions.followUser(person._id));
  };
  return (
    <div className={styles['person']}>
      <Link to={`/profile/${person._id}`}>
        <div className={styles['person-profile']}>
          <Avatar src={person?.avatar} shape="square" size="large" icon={<UserOutlined />} />
        </div>
      </Link>
      <Link to={`/profile/${person._id}`}>
        <div className={styles['name']}>
          <div className={styles['main-name']}>
            <h3>{person.name.firstName + ' ' + person.name.lastName}</h3>
          </div>
        </div>
      </Link>
      <div className={styles['send-follow-request']}>
        <button
          onClick={() => {
            handleFollow();
          }}
        >
          {follow ? 'Un Follow' : 'Follow'}
        </button>
      </div>
    </div>
  );
}

export default Person;
