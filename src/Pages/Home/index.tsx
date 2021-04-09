import { Button } from 'antd';
import React from 'react';
import styles from './styles.module.css';
export default function Home(props: any) {
  return (
    <Button
      className={styles.abc}
      onClick={() => {
        localStorage.removeItem('token');
        window.open('/', '_self');
      }}
    >
      Logout
    </Button>
  );
}
