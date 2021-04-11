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
import { NavLink, Route, Switch } from 'react-router-dom';
import Logo from '../../Assets/logo.png';
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
  const [current, setCurrent] = useState('mail');
  const user = useSelector((state) => state.login.user);
  console.log(user, 'user');
  const handleClick = (e) => {
    console.log('click ', e);
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
                  style={{ width: 200 }}
                />
              </label>
              <ul className={styles['menu']}>
                <li className={styles['menu-item']}>
                  <NavLink
                    to="/"
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
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <Switch>
        <Route path="/profile/606dda78e0506b0015f824e4">Profile</Route>
        <Route path="/" exact>
          Home
        </Route>
      </Switch>
    </>
  );
}
