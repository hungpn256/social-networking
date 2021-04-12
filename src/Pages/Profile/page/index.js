import {
  faCoffee,
  faGraduationCap,
  faHeart,
  faHome,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default function Profile({ user }) {
  const [srcImg, setImgSrc] = useState();

  const [isOpenModal, setIsOpenModal] = useState(false);
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
              <h2 className={styles['name']}>ABC</h2>
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

                  {user?.relation && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faHeart} className={styles['mr-10']} />
                      Mối quan hệ: {user?.relation}
                    </li>
                  )}

                  {user?.school && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faGraduationCap} className={styles['mr-10']} />
                      Học tại: {user?.school}
                    </li>
                  )}
                </ul>
                <div className={styles['photo']}>
                  <h3>Ảnh</h3>
                  <ul className={styles['photo-list']}>
                    <li className={styles['photo-item']}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8OjB5ca_3vjIFBC8xd7cyehM0R2Q62s1-kg&usqp=CAU"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEpzZuEauBkRoXkb6n9NhRQN8JEZ5nLpuvHg&usqp=CAU"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3aSUY6RaNUs-NbAd4jdaOZUbz53Wj7c6BaA&usqp=CAU"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-tlfQttdWMkvFgjzEUKhKdmzBFj0Hj_P0w&usqp=CAU"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_onN4edjLBnPUArn_qQ2guRZHefNbi39ww&usqp=CAU"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_onN4edjLBnPUArn_qQ2guRZHefNbi39ww&usqp=CAU"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                    <li className={styles['photo-item']}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu_onN4edjLBnPUArn_qQ2guRZHefNbi39ww&usqp=CAU"
                        alt=""
                        className={styles['photo-item-img']}
                        onClick={(e) => {
                          setImgSrc(e.target.currentSrc);
                          setIsOpenModal(true);
                        }}
                      />
                    </li>
                  </ul>
                  <div
                    id="myModal"
                    className={styles['modal']}
                    style={{ display: isOpenModal ? 'block' : 'none' }}
                  >
                    <span
                      className={styles['close']}
                      onClick={() => {
                        setIsOpenModal(false);
                      }}
                    >
                      abc
                    </span>
                    <img className={styles['modal-content']} src={srcImg} alt="" id="img01" />
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
