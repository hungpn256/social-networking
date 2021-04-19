import React from 'react';
import styles from './NavBar.module.css';
function NavBar() {
  return (
    <div>
      <div className={styles['options-menu']}>
        <div className={styles['options-center']}>
          <div className={styles['logo']}>
            <i className={styles['fa fa-twitter']}></i>
          </div>
          <div className={styles['option']}>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-home']}></i>Home
              </a>
            </div>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-hashtag']}></i>Explore
              </a>
            </div>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-bell']}></i>Notifications
              </a>
            </div>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-envelope-o']}></i>Messages
              </a>
            </div>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-bookmark-o']}></i>Bookmarks
              </a>
            </div>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-list-alt']}></i>Lists
              </a>
            </div>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-user-o']}></i>Profile
              </a>
            </div>
            <div>
              <a href=" # ">
                <i className={styles['fa fa-ellipsis-h']}></i>More
              </a>
            </div>
            <div>
              <button>Tweet</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
