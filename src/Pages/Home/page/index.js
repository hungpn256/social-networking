import React from 'react';
import Present from './present.js';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faCoffee,
  faHome,
  faHeart,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';

export default function index({ user }) {
  return (
    <div className={styles['DevKen']}>
      <div className={styles['content']}>
        <div className={styles['infor']}>
          <div className={styles['grid']}>
            <div className={styles['cover']}>
              <img
                src="https://tamnhinrong.org/tnr-4-sac-thu-vang.jpg"
                alt=""
                className={styles['cover-image']}
              />
            </div>
            <div className={styles['avatar']}>
              <img
                src="https://dean2020.edu.vn/wp-content/uploads/2019/03/anh-thien-nhien-dep-3.jpeg"
                alt="Avatar"
                className={styles['avatar-image']}
              />
            </div>
            <div className={styles['infor-name']}>
              <h2 className={styles['name']}>Hoang Quang huy</h2>
            </div>
            <button className={styles['edit-nick-name']}>
              <FontAwesomeIcon icon={faCoffee} /> Sửa nick-name
            </button>
            <div className={styles['edit']}>
              <button type="button" className={styles['exit-edit']}>
                <i className={styles['fas fa-times']}></i>
              </button>
              <div className={styles['form-edit']}>
                <input
                  type="text"
                  className={styles['input-edit-nick-name']}
                  placeholder="Nick name?"
                  required
                />
                <button type="submit" className={styles['button-edit-nick-name']}>
                  <i className={styles['far fa-edit']}></i>
                </button>
              </div>
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
                  <h3 id="">Giới thiệu</h3>
                  {user?.phoneNumber && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faPhone} className={styles['mr-10']} />
                      Phone Number: {user.phoneNumber}
                    </li>
                  )}
                  {user?.place && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faHome} className={styles['mr-10']} />
                      Quê quán: {user?.place}
                    </li>
                  )}

                  {user?.relation}
                  <li className={styles['detail-resume-item']}>
                    <FontAwesomeIcon icon={faHeart} className={styles['mr-10']} />
                    Mối quan hệ: Tìm người yêu
                  </li>
                  <li className={styles['detail-resume-item']}>
                    <FontAwesomeIcon icon={faGraduationCap} className={styles['mr-10']} />
                    Học tại: PTIT
                  </li>
                </ul>
                <div className={styles['photo']}>
                  <h3>Ảnh</h3>
                  <ul className={styles['photo-list']}>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung1.jpeg" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung2.JPG" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung3.JPG" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung4.jpg" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung5.jpg" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung6.jpg" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung7.jpg" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung8.JPG" alt="" className={styles['photo-item-img']} />
                    </li>
                    <li className={styles['photo-item']}>
                      <img src="./Img/hung9.jpg" alt="" className={styles['photo-item-img']} />
                    </li>
                  </ul>
                  <div id="myModal" className={styles['modal']}>
                    <span className={styles['close']}>
                      <i className={styles['fas fa-times']}></i>
                    </span>
                    <img className={styles['modal-content']} />
                    <div id="caption"></div>
                  </div>
                </div>
              </div>
              <div className={styles['detail-video']}>
                <h3 className={styles['detail-video-title']}>Video của Hưng</h3>
                <ul className={styles['detail-video-list']}>
                  <video className={styles['detail-video-item']} controls>
                    <source src="./vid/Thacmac.mp4" type="video/mp4" />
                  </video>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
