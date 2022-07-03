import { UserOutlined } from '@ant-design/icons';
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'antd/lib/avatar/avatar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as loginActions from '../../Pages/Login/actions';
import styles from './Person.module.css';
function Person({ person }) {
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = () => {
    setFollow(!follow);
    dispatch(loginActions.followUser(person._id));
  };
  useEffect(() => {
    console.log('did mount');
    return () => {
      console.log('un mount');
    };
  }, []);
  return (
    <div className={styles['person']}>
      <Link className={styles['link']} to={`/profile/${person._id}`}>
        <div className={styles['person-profile']}>
          <Avatar src={person?.avatar} shape="circle" size="large" icon={<UserOutlined />} />
        </div>
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
          style={{ color: !follow ? '#00a7ff' : '#fff', background: follow ? '#00a7ff' : '#fff' }}
        >
          <FontAwesomeIcon icon={follow ? faUserMinus : faUserPlus} />
          {/* {follow ? 'Un Follow' : 'Follow'} */}
        </button>
      </div>
    </div>
  );
}

export default Person;
