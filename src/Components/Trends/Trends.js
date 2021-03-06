import React from 'react';
import Person from '../Person/Person';
import Trend from '../trend/Trend';
import styles from './Trend.module.css';
function Trends({ userRecomment }) {
  return (
    <div className={styles['trending-menu']}>
      <div className={styles['trending-center']}>
        <div className={styles['trending']}>
          <div className={styles['header']}>
            <p>What 's happening'</p>
          </div>
          <div className={styles['trends']}>
            {[1, 2].map((item, index) => (
              <Trend key={index} />
            ))}
          </div>
          {/* <div className={styles['show-more']}>
            <a href=" # ">Show more</a>
          </div> */}
        </div>
        <div className={styles['follow']}>
          <div className={styles['header']}>
            <p>Who to Follow</p>
          </div>
          <div className={styles['persons']}>
            {userRecomment &&
              userRecomment.map((person, index) => {
                return <Person key={index} person={person} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
