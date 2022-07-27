import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { Link } from 'react-router-dom';
import styles from './Person.module.css';
import IUser from '../../Models/user'

function Person({ person }: { person: IUser }) {
  return (
    <div className={styles['person']}>
      <Link className={styles['link']} to={`/profile/${person._id}`}>
        <div className={styles['person-profile']}>
          <Avatar src={person?.avatar} shape="circle" size="large" icon={<UserOutlined />} />
        </div>
        <div className={styles['name']}>
          <div className={`${styles['main-name']}`}>
            <h3 className="font-bold text-[#555]">{person.fullName}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Person;
