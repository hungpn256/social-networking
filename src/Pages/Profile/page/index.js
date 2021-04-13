import {
  faEdit,
  faGraduationCap,
  faHeart,
  faHome,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import EditInfor from './editif';
import Para from './../../../Components/paragraph/Para';
import Avatar from './../../../Components/Avatar/avatar';
import styles from './styles.module.css';

export default function Profile({ user }) {
  return (
    <div className={styles['DevKen']}>
      <div className={styles['content']}>
        <div className={styles['infor']}>
          <div className={styles['grid']}>
            <div className={styles['cover']}>
              <img
                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.6435-9/133854021_1823631001138062_4807573368620165003_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=e3f864&_nc_ohc=Zf3HplsV02sAX_I9sf8&_nc_ht=scontent.fhan2-3.fna&oh=4a670870508ab3b8f2025e230362952e&oe=60983405"
                alt=""
                className={styles['cover-image']}
              />
            </div>
            <div className={styles['avatar']}>
              <img
                src="https://scontent.fhan2-6.fna.fbcdn.net/v/t1.6435-9/158497642_1877728322394996_3189770849154353899_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=uux36Sp0J3oAX8joRP4&_nc_ht=scontent.fhan2-6.fna&oh=1b148c198a02a07a385c4641a02113d3&oe=6098CD18"
                alt="Avatar"
                className={styles['avatar-image']}
              />
            </div>
            <div className={styles['infor-name']}>
              <h2 className={styles['name']}>ABC</h2>
            </div>

            <div className={styles['infor-nav']}>
              <ul className={styles['infor-nav-list']}>
                <li className={styles['infor-nav-item']}>
                  <Link></Link>
                  About
                </li>
                <li className={styles['infor-nav-item']}>
                  <Link></Link>
                  Photos
                </li>
                <li type="button" className={styles['infor-nav-item']}>
                  <Link></Link>Hobby
                </li>
                <li href="" className={styles['infor-nav-item']}>
                  <Link></Link>More
                  <i className={styles['fas fa-ellipsis-h']}></i>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles['detail']}>
            <div className={`${styles['grid']} ${styles['detail-grid']}`}>
              <div className={styles['detail-resume']}>
                <ul className={styles['detail-resume-list']}>
                  <h3 id="">
                    About <FontAwesomeIcon icon={faEdit} className={styles['edit-info-about']} />{' '}
                  </h3>

                  <EditInfor />
                  {user?.phoneNumber && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faPhone} className={styles['mr-10']} />
                      Phone Number: {user.phoneNumber}
                    </li>
                  )}
                  {user?.place && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faHome} className={styles['mr-10']} />
                      Home town: {user?.place}
                    </li>
                  )}

                  {user?.gender && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faHeart} className={styles['mr-10']} />
                      Gender: {user.gender === 1 ? 'Male' : user.gender === 2 ? 'Female' : ''}
                    </li>
                  )}

                  {user?.school && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faGraduationCap} className={styles['mr-10']} />
                      School: {user?.school}
                    </li>
                  )}
                </ul>
                <div className={styles['photo']}>
                  <h3>Photos</h3>
                  <Image.PreviewGroup className={styles['photo-list']}>
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/81774746_2652279538325726_1090477907098206208_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=19026a&_nc_ohc=tAm6X7MowXsAX_izu6c&_nc_ht=scontent.fhan2-2.fna&oh=a9f875794c71a667e94c6fc2c3281820&oe=609A39A1"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/70155306_2542757659277915_1014815787526914048_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=174925&_nc_ohc=gbuq6EiiEykAX80f0K3&_nc_ht=scontent.fhan2-1.fna&oh=436680ce4e42af7688df85d42b490ec3&oe=60983934"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/67906894_2517475325139482_4944660539235106816_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=2Is_rYUKT1QAX8uwfn0&_nc_ht=scontent.fhan2-1.fna&oh=c94d7944bcc6891ac334a1ed3e752e3f&oe=6099D45D"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/60132721_2445772242309791_3391573950952636416_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=5_LLFFH27XMAX8NumDp&_nc_ht=scontent.fhan2-1.fna&oh=a8079c2fce5fb2c9fd65b42a6e6a752c&oe=609ACEAB"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-6.fna.fbcdn.net/v/t1.6435-9/29472699_2153531444867207_6316745274244988928_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=19026a&_nc_ohc=zUXPvTDf3t0AX-sNXUP&_nc_ht=scontent.fhan2-6.fna&oh=9bc0781a0e810cf688216e28e5885783&oe=609B2216"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-6.fna.fbcdn.net/v/t1.6435-9/29472699_2153531444867207_6316745274244988928_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=19026a&_nc_ohc=zUXPvTDf3t0AX-sNXUP&_nc_ht=scontent.fhan2-6.fna&oh=9bc0781a0e810cf688216e28e5885783&oe=609B2216"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-6.fna.fbcdn.net/v/t1.6435-9/29472699_2153531444867207_6316745274244988928_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=19026a&_nc_ohc=zUXPvTDf3t0AX-sNXUP&_nc_ht=scontent.fhan2-6.fna&oh=9bc0781a0e810cf688216e28e5885783&oe=609B2216"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/81774746_2652279538325726_1090477907098206208_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=19026a&_nc_ohc=tAm6X7MowXsAX_izu6c&_nc_ht=scontent.fhan2-2.fna&oh=a9f875794c71a667e94c6fc2c3281820&oe=609A39A1"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src="https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-9/67906894_2517475325139482_4944660539235106816_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=2Is_rYUKT1QAX8uwfn0&_nc_ht=scontent.fhan2-1.fna&oh=c94d7944bcc6891ac334a1ed3e752e3f&oe=6099D45D"
                      alt=""
                      className={styles['photo-item-img']}
                    />
                  </Image.PreviewGroup>
                </div>
              </div>
              <div className={styles['detail-video']}>
                {/* <h3 className={styles['detail-video-title']}>Video của Hưng</h3> */}
                <Avatar />
                <Para />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
