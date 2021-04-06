import React from 'react';
import styles from './styles.module.css';
export default function Home(props: any) {
  console.log(props);
  return <div className={styles.abc}>Home</div>;
}
