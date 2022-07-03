import React from 'react';
import styles from './Trend.module.css';
function Trend() {
  return (
    <div className={styles['trend']}>
      <div className={styles['trend-picture']}>
        {/*  Chen anh  */}
        <img
          src="https://images.pexels.com/photos/4565508/pexels-photo-4565508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
        />
      </div>
      <div className={styles['trend-msg']}>
        <div className={styles['trend-name']}>
          <p>IPL 2020.live</p>
        </div>
        <div className={styles['subject']}>
          <p>IPL: Sunrises Hyderbad beat Delth Capitals by & runs</p>
        </div>
        <div className={styles['trend-with']}>
          <p>
            trending with<a href=" # ">#MIvsRCB</a>,<a href=" # ">#SRHvsDC</a>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Trend;
