import { Dropdown, Menu } from 'antd';
import React from 'react';
import styles from './styles.module.css';
const menu = (
  <Menu
    style={{
      backgroundColor: 'transparent',
      borderRadius: 10,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    }}
  >
    <Menu.Item
      key="1"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <div className={styles['circle-item']}>SOS</div>
    </Menu.Item>
  </Menu>
);
export default function CircleSOS() {
  return (
    <div className={styles['container']}>
      <Dropdown
        overlay={menu}
        placement="topCenter"
        trigger={['click']}
        className={styles['drop-down']}
      >
        <div className={styles['circle']}>SOS</div>
      </Dropdown>
    </div>
  );
}
