import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { useHistory } from 'react-router-dom';
import styles from './Person.module.css';
import IUser from '../../Models/user';

function Person({
  person,
  onClick,
  className,
}: {
  person: IUser;
  onClick?: () => void | Promise<void>;
  className?: string;
}) {
  const navigation = useHistory();
  return (
    <div
      className={`${styles['person']} hover ${className}`}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          navigation.push(`/profile/${person._id}`);
        }
      }}
    >
      <div className={styles['link']}>
        <div className={styles['person-profile']}>
          <Avatar src={person?.avatar} shape="circle" size="large" icon={<UserOutlined />} />
        </div>
        <div className={styles['name']}>
          <div className={`${styles['main-name']}`}>
            <h3 className="font-bold text-gray">{person.fullName}</h3>
          </div>
        </div>
      </div>
      {person.status === 'ONLINE' && <div className={styles['dot']} />}
    </div>
  );
}

export default Person;
