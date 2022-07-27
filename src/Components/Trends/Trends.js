import React from 'react';
import Person from '../Person/Person';
import Trend from '../trend/Trend';
import styles from './Trend.module.css';
function Trends({ userRecomment }) {
  const data = [{
    _id: 1,
    avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/295418634_7694463730627970_2373434662514321004_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=i4AzLB-X1dEAX-Tux0n&_nc_ht=scontent.fhan2-1.fna&oh=00_AT-hg1siqVr780u7ezgoopYQiMtL80Xls_V6pQeG_mqUPQ&oe=62E55D2B',
    fullName: 'Huwng1231 jiahsd kjasd'
  }, {
    _id: 3,
    avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/295418634_7694463730627970_2373434662514321004_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=i4AzLB-X1dEAX-Tux0n&_nc_ht=scontent.fhan2-1.fna&oh=00_AT-hg1siqVr780u7ezgoopYQiMtL80Xls_V6pQeG_mqUPQ&oe=62E55D2B',
    fullName: 'Huwng'
  }, {
    _id: 2,
    avatar: 'https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/295418634_7694463730627970_2373434662514321004_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=i4AzLB-X1dEAX-Tux0n&_nc_ht=scontent.fhan2-1.fna&oh=00_AT-hg1siqVr780u7ezgoopYQiMtL80Xls_V6pQeG_mqUPQ&oe=62E55D2B',
    fullName: 'Huwng'
  }]
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
        </div>
        <div className={styles['follow']}>
          <div className={styles['header']}>
            <p>Contact</p>
          </div>
          <div className={styles['persons']}>
            {data &&
              data.map((person, index) => {
                return <Person key={person._id} person={person} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
