import React from 'react';
import styles from './Person.module.css';
function Person() {
  return (
    <div className={styles['person']}>
      <div className={styles['person-profile']}>
        <img
          src="https://images.pexels.com/photos/4565508/pexels-photo-4565508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
        />
      </div>
      <div className={styles['name']}>
        <div className={styles['main-name']}>
          <h3>Akhil</h3>
        </div>
        <div className={styles['username']}>
          <p>@akhil</p>
        </div>
      </div>
      <div className={styles['send-follow-request']}>
        <button>Follow</button>
      </div>
    </div>
  );
}

export default Person;
