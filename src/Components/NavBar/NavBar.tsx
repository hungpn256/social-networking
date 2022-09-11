import { UserOutlined } from '@ant-design/icons';
import {
  faBookmark,
  faEllipsisH,
  faHome,
  faMapMarkerAlt,
  faPlusSquare,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Affix } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../index_Reducer';
import styles from './NavBar.module.css';
function NavBar() {
  const user = useSelector((state: RootState) => state.login.user);
  return (
    <div className={styles['container']}>
      <div className={styles['content']} >
        <div className={styles['options-menu']}>
          <div className={styles['options-center']}>
            <Link
              className={styles['link-profile']}
              to={`/profile/${user._id}`}
              style={{ color: '#000' }}
            >
              <div className={styles['logo']}>
                <Avatar
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  alt=""
                  className={styles['logo-avatar']}
                />
                <span
                  className={styles['name']}
                >{`${user.name.firstName} ${user.name.lastName}`}</span>
              </div>
            </Link>
            <div className={styles['option']}>
              <div>
                <a href="/">
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faHome} />
                  <span>Home</span>
                </a>
              </div>
              <div>
                <a href=" # ">
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faUsers} />
                  <span>Friends</span>
                </a>
              </div>
              <div>
                <a href=" # ">
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faPlusSquare} />
                  <span>Create a group</span>
                </a>
              </div>
              <div>
                <a href=" # ">
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faMapMarkerAlt} />
                  <span>Map</span>
                </a>
              </div>
              <div>
                <a href=" # ">
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faBookmark} />
                  <span>Bookmarks</span>
                </a>
              </div>
              <div>
                <a href=" # ">
                  {/* <i className={styles['fa fa-ellipsis-h']}></i> */}
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faEllipsisH} />
                  <span>More</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
