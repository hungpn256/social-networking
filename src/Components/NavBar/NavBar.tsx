import { UserOutlined } from '@ant-design/icons';
import { faBookmark, faHome, faPlusSquare, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../index_Reducer';
import { CONVERSATION_CHANGE_STATE } from '../../Pages/Chat/constants';
import styles from './NavBar.module.css';
function NavBar() {
  const user = useSelector((state: RootState) => state.login.user);
  const dispatch = useDispatch();

  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        <div className={styles['options-menu']}>
          <div className={styles['options-center']}>
            <Link
              className={styles['link-profile']}
              to={`/profile/${user?._id}`}
              style={{ color: '#000' }}
            >
              <div className={styles['logo']}>
                <Avatar
                  src={user?.avatar}
                  icon={<UserOutlined />}
                  alt=""
                  className={styles['logo-avatar']}
                />
                <span className={styles['name']}>{`${user?.firstName} ${user?.lastName}`}</span>
              </div>
            </Link>
            <div className={styles['option']}>
              <div>
                <Link to="/" className={styles['item']}>
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faHome} />
                  <span>Home</span>
                </Link>
              </div>
              <div>
                <Link to={`profile/${user?._id}/friend`} className={styles['item']}>
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faUsers} />
                  <span>Friends</span>
                </Link>
              </div>
              <div>
                <span
                  className={styles['item']}
                  onClick={() => {
                    dispatch({
                      type: CONVERSATION_CHANGE_STATE,
                      payload: { isOpenCreateConversationModal: true },
                    });
                  }}
                >
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faPlusSquare} />
                  <span>Create a conversation</span>
                </span>
              </div>
              {/* <div>
                <span className={styles['item']}>
                  <FontAwesomeIcon className={`mr-20 ${styles['icon']}`} icon={faBookmark} />
                  <span>Bookmarks</span>
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
