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
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Switch, Link, useLocation } from 'react-router-dom';
import Logo from '../../Assets/logo.png';
import RoutePrivate from '../RoutePrivate';
import styles from './styles.module.css';

const { Search } = Input;
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
      onClick={() => {
        localStorage.removeItem('token');
        window.open('auth/login', '_self');
      }}
    >
      <LoginOutlined />
      Log out
    </Menu.Item>
  </Menu>
);
export default function Home(props: any) {
  const { routes } = props;
  const [current, setCurrent] = useState('mail');
  const location = useLocation();
  const login = useSelector((state) => state.login);
  const { user } = login;
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const onSearch = (value: string) => console.log(value);
  return (
    <>
      <div style={{ boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.2)', backgroundColor: 'pink' }}>
        <div className={styles['header']}>
          <nav className={styles['header-nav']} id="navbar">
            <div className={styles['max-width']}>
              <input type="checkbox" id={styles['check']}></input>
              <label className={styles['checkbtn']} htmlFor={styles['check']}>
                <UnorderedListOutlined />
              </label>
              <label className={styles['brand']}>
                <img
                  style={{ position: 'relative' }}
                  className={styles['logo']}
                  src={Logo}
                  alt="Logo"
                ></img>
                <Search
                  placeholder="Search"
                  allowClear
                  size="large"
                  onSearch={onSearch}
                  style={{ width: 250 }}
                />
              </label>
              <ul className={styles['menu']}>
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
                        to={`/profile`}
                        className={`${styles['menu-item-link']}`}
                        activeClassName={styles['active']}
                      >
                        <span>{`${user.name.firstName} ${user.name.lastName}`}</span>
                        <Avatar icon={<UserOutlined />} style={{ marginLeft: 4 }} />
                      </NavLink>
                    </li>
                    <li
                      className={styles['menu-item']}
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
      </div>
      <Switch>
        {routes &&
          routes.map((route) => {
            if (route.authority) return RoutePrivate(route, login);
            else return <Route {...route}></Route>;
          })}
      </Switch>
    </>
  );
}
