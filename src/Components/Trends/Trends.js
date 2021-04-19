import React from 'react';
import Trend from '../trend/Trend';
import Person from '../Person/Person';
import styles from './Trend.module.css';
function Trends() {
  return (
    <div className={styles['trending-menu']}>
      <div className={styles['trending-center']}>
        <div className={styles['trending']}>
          <div className={styles['header']}>
            <p>What 's happening'</p>
          </div>
          <div className={styles['trends']}>
            {[1, 2, 3, 4].map((item) => (
              <Trend key={item} />
            ))}
          </div>
          <div className={styles['show-more']}>
            <a href=" # ">Show more</a>
          </div>
        </div>
        <div className={styles['follow']}>
          <div className={styles['header']}>
            <p>Who to Follow</p>
          </div>
          <div className={styles['persons']}>
            {[1, 2, 3, 4].map((item) => (
              <Person key={item} />
            ))}
          </div>
          <div className={styles['show-more']}>
            <a href=" # ">Show More</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
