import React from 'react';
import styles from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  DownCircleTwoTone,
  HomeFilled,
  LoginOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  faBell,
  faBookmark,
  faEllipsisH,
  faEnvelopeOpen,
  faHashtag,
  faHome,
  faListAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from 'antd/lib/avatar/avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function NavBar() {
  const user = useSelector((state) => state.login.user);
  return (
    <div>
      <div className={styles['options-menu']}>
        <div className={styles['options-center']}>
          <div className={styles['logo']}>
            <Link
              className={styles['link-profile']}
              to={`/profile/${user._id}`}
              style={{ color: '#000' }}
            >
              <Avatar
                src={user?.avatar}
                icon={<UserOutlined />}
                alt=""
                size={60}
                style={{ marginLeft: 4, marginRight: 20 }}
              />
              <span
                className={styles['name']}
              >{`${user.name.firstName} ${user.name.lastName}`}</span>
            </Link>
          </div>
          <div className={styles['option']}>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-home']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faHome} />
                <span>Home</span>
              </a>
            </div>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-hashtag']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faHashtag} />
                <span>Explore</span>
              </a>
            </div>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-bell']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faBell} />
                <span>Notifications</span>
              </a>
            </div>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-envelope-o']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faEnvelopeOpen} />
                <span>Messages</span>
              </a>
            </div>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-bookmark-o']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faBookmark} />
                <span>Bookmarks</span>
              </a>
            </div>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-list-alt']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faListAlt} />
                <span>Lists</span>
              </a>
            </div>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-user-o']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faUser} />
                <span>Profile</span>
              </a>
            </div>
            <div>
              <a href=" # ">
                {/* <i className={styles['fa fa-ellipsis-h']}></i> */}
                <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faEllipsisH} />
                <span>More</span>
              </a>
            </div>
            {/* <div>
              <button>Tweet</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
