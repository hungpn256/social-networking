import {
  DownCircleTwoTone,
  HomeFilled,
  LoginOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, Input, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../../Assets/logo.png';
import styles from './styles.module.css';

const { Search } = Input;

export default function Home(props: any) {
  const location = useLocation();
  const login = useSelector((state) => state.login);
  const { user } = login;
  const checkBtn = document.querySelector(`#${styles['check']}`);
  const dispatch = useDispatch();
  const onSearch = (value: string) => console.log(value);
  const menu = (
    <Menu>
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
          await localStorage.removeItem('token');
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
                onSearch={onSearch}
                style={{ width: 250 }}
              />
            </label>
            <ul
              className={styles['menu']}
              onClick={() => {
                checkBtn && checkBtn.click();
              }}
            >
              {user ? (
                <>
                  {' '}
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
                        icon={<UserOutlined />}
                        style={{ marginLeft: 4 }}
                        src={user?.avatar?.viewUrl}
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
                  <li
                    className={`${styles['menu-item']} ${styles['hideInMobile']}`}
                    style={{
                      margin: 0,
                      padding: '0',
                    }}
                  >
                    <Dropdown overlay={menu} trigger={['click']}>
                      <DownCircleTwoTone
                        style={{
                          fontSize: 25,
                          lineHeight: '30px',
                          transform: 'translate(-5px, 6px)',
                        }}
                        twoToneColor="pink"
                      />
                    </Dropdown>
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
          </div>
        </nav>
      </div>
      {props.children}
    </>
  );
}
