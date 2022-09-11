import {
  DownCircleTwoTone,
  HomeFilled,
  LoginOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Dropdown, Input, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import qs from 'query-string';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import Logo from '../../Assets/logo.png';
import useClickOutSide from '../../Hook/useClickOutSide';
import Messenger from '../Messenger';
import Notification from '../Notification';
import styles from './styles.module.css';
const { Search } = Input;

export default function Home(props: any) {
  const location = useLocation();
  const history = useHistory();
  const [showNotificaiton, setShowNotificaiton] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);
  const login = useSelector((state) => state.login);
  const { user } = login;
  const checkBtn = document.querySelector(`#${styles['check']}`) as any;
  const dispatch = useDispatch();
  const onSearch = (value: string) => {
    console.log(value);
  };
  const [textSearch, setTextSearch] = useState(qs.parse(location.search)?.q ?? '');
  const { refChildren: refNoti, refParent: refNotiIcon } = useClickOutSide(() => {
    setShowNotificaiton(false)
  })
  const { refChildren: refMess, refParent: refMessIcon } = useClickOutSide(() => {
    setShowMessenger(false)
  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
    onSearch(e.target.value);
  };
  const menu = (
    <Menu style={{ borderRadius: 10, minWidth: 150, marginTop: 7 }}>
      <Menu.Item key="0">
        <a href="/">
          <SettingOutlined />
          Setting
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        onClick={async () => {
          dispatch({ type: 'CLEAR_STATE' });
        }}
      >
        <LoginOutlined />
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className={styles['header']}>
        <nav className={styles['header-nav']} id="navbar">
          <div className={styles['max-width']}>
            <input type="checkbox" id={styles['check']}></input>
            <label className={styles['checkbtn']} htmlFor={styles['check']}>
              <UnorderedListOutlined />
            </label>
            <label className={styles['brand']}>
              <Link to="/">
                <img
                  style={{ position: 'relative' }}
                  className={styles['logo']}
                  src={Logo}
                  alt="Logo"
                ></img>
              </Link>

              <Search
                className={styles['form-search']}
                placeholder="Search"
                allowClear
                size="large"
                value={textSearch}
                onSearch={() =>
                  history.push({
                    pathname: `/search`,
                    search: `?q=${textSearch}`,
                  })
                }
                onPressEnter={() =>
                  history.push({
                    pathname: `/search`,
                    search: `?q=${textSearch}`,
                  })
                }
                onChange={onChange}
                style={{ width: '20vw', marginLeft: 8 }}
              />
            </label>
            <div className={styles['wrapper-memu']} style={{ display: 'flex' }}>
              <ul
                className={styles['menu']}
                onClick={() => {
                  checkBtn && checkBtn.click();
                }}
              >
                {user ? (
                  <>
                    <li className={styles['menu-item']}>
                      <NavLink
                        to="/"
                        exact
                        className={styles['menu-item-link']}
                        activeClassName={styles['active']}
                      >
                        Home
                        <HomeFilled style={{ marginLeft: 8 }} />
                      </NavLink>
                    </li>
                    <li className={styles['menu-item']}>
                      <NavLink
                        to={`/profile/${user._id}`}
                        className={`${styles['menu-item-link']}`}
                        activeClassName={styles['active']}
                      >
                        <span>{`${user.name.firstName}`}</span>
                        <Avatar
                          src={user?.avatar}
                          icon={<UserOutlined />}
                          alt=""
                          style={{ marginLeft: 4 }}
                        />
                      </NavLink>
                    </li>

                    <li
                      className={`${styles['menu-item']} ${styles['menu-mobile']}`}
                      onClick={() => {
                        dispatch({ type: 'CLEAR_STATE' });
                      }}
                    >
                      <NavLink
                        to="/auth/login"
                        exact
                        className={styles['menu-item-link']}
                        activeClassName={styles['active']}
                      >
                        Log out <LoginOutlined />
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {' '}
                    <li className={styles['menu-item']}>
                      <Link to={{ pathname: '/auth/signup' }} className={styles['menu-item-link']}>
                        Đăng ký
                      </Link>
                    </li>{' '}
                    <li className={styles['menu-item']}>
                      <Link
                        to={{ pathname: '/auth/login', state: { prePath: location.pathname } }}
                        className={styles['menu-item-link']}
                      >
                        Đăng nhập
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {user && (
                <ul className={styles['chat-notification-wrapper']}>
                  <div className="relative">
                    <Badge count={5} style={{ transform: 'translate(0px,-5px)' }}>
                      <li
                        ref={refMessIcon}
                        className={`${styles['menu-item']} ${styles['wrap-icon']}`}
                        onClick={() => setShowMessenger(!showMessenger)}
                      >
                        <FontAwesomeIcon
                          className={styles['menu-item-icon']}
                          icon={faFacebookMessenger}
                        />
                      </li>
                    </Badge>
                    {showMessenger && <Messenger ref={refMess} setShowMessenger={setShowMessenger} />}
                  </div>
                  <div className="relative">
                    <Badge count={25} style={{ transform: 'translate(0px,-5px)' }}>
                      <li
                        ref={refNotiIcon}
                        className={`${styles['menu-item']} ${styles['wrap-icon']}`}
                        onClick={() => setShowNotificaiton(!showNotificaiton)}
                      >
                        <FontAwesomeIcon className={styles['menu-item-icon']} icon={faBell} />
                      </li>
                    </Badge>
                    {showNotificaiton && <Notification ref={refNoti} />}
                  </div>
                  <li

                    className={`${styles['menu-item']}`}
                    style={{
                      margin: 0,
                      padding: '0',
                    }}
                  >
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                      <DownCircleTwoTone
                        style={{
                          fontSize: 30,
                          lineHeight: '30px',
                          transform: 'translate(-5px, 6px)',
                          margin: '0 4px',
                        }}
                        twoToneColor="pink"
                      />
                    </Dropdown>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
      {props.children}
    </>
  );
}
