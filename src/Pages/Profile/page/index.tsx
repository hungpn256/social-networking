import {
  faEdit,
  faGraduationCap,
  faHeart,
  faHome,
  faPhone,
  faMars,
  faVenus,
  faVenusMars,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Image, Menu, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Article from '../../../Components/Article/Article';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import * as profileActions from '../actions';
import userImg from '../../../Assets/user.png';
import LoadingGlobal from '../../../Components/LoadingGlobal';
import PostArticle from '../../../Components/PostArticle';
export default function Profile({ user }) {
  const profileState = useSelector((state) => state.profile);
  const { loadingPage, user: userProfile, articles } = profileState;
  const params = useParams();
  const { _id } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileActions.getUser({ _id }));
  }, [_id, dispatch]);
  const onChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(profileActions.changeAvatar(file));
    }
  };
  if (loadingPage) {
    return <LoadingGlobal />;
  }
  console.log(userProfile?.avatar?.viewUrl?.replace(/=s220/, ''), 'avatar');
  const menu = (
    <Menu style={{ marginTop: 20, borderRadius: 10 }}>
      <Menu.Item
        key="1"
        onClick={() => {
          const changeAvatar = document.getElementById('changeAvatar');
          changeAvatar.click();
        }}
      >
        <label> Update profile picture</label>
        <input
          type="file"
          id="changeAvatar"
          onChange={onChangeAvatar}
          style={{ display: 'none' }}
        />
      </Menu.Item>
    </Menu>
  );
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
              <Spin spinning={profileState.requesting}>
                <Image.PreviewGroup>
                  {!profileState.requesting && (
                    <Image
                      className={`${styles['avatar-image']} animate__animated animate__backInUp`}
                      height={175}
                      width={175}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220/, '') ?? userImg}
                    ></Image>
                  )}
                </Image.PreviewGroup>
              </Spin>
              <Dropdown overlay={menu} trigger={['click']}>
                <FontAwesomeIcon icon={faChevronDown} className={styles['avatar-dropdown']} />
              </Dropdown>
            </div>
            <div className={styles['infor-name']}>
              <h2 className={styles['name']}>
                {userProfile?.name?.firstName + ' ' + userProfile?.name?.lastName}
              </h2>
            </div>

            <div className={styles['infor-nav']}>
              <ul className={styles['infor-nav-list']}>
                <li className={styles['infor-nav-item']}>
                  <Link to={'/phôt'} className={styles['infor-nav-item-link']}>
                    About
                  </Link>
                </li>
                <li className={styles['infor-nav-item']}>
                  <Link className={styles['infor-nav-item-link']}>Photos</Link>
                </li>
                <li className={styles['infor-nav-item']}>
                  <Link className={styles['infor-nav-item-link']}>Hobby</Link>
                </li>
                <li className={styles['infor-nav-item']}>
                  <Link className={styles['infor-nav-item-link']}>More</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles['detail']}>
            <div className={`${styles['detail-grid']}`}>
              <div className={styles['detail-resume']}>
                <ul className={styles['detail-resume-list']}>
                  <h3 id="">
                    About <FontAwesomeIcon icon={faEdit} className={styles['edit-info-about']} />{' '}
                  </h3>
                  {userProfile?.phoneNumber && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faPhone} className={styles['mr-10']} />
                      Phone: {userProfile.phoneNumber}
                    </li>
                  )}
                  {userProfile?.place && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faHome} className={styles['mr-10']} />
                      Home town: {userProfile?.place}
                    </li>
                  )}

                  {(userProfile?.gender || userProfile?.gender === 0) && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon
                        icon={
                          userProfile.gender === 0
                            ? faMars
                            : userProfile.gender === 1
                            ? faVenus
                            : faVenusMars
                        }
                        className={styles['mr-10']}
                      />
                      Gender:{' '}
                      {userProfile.gender === 0
                        ? 'Male'
                        : userProfile.gender === 1
                        ? 'Female'
                        : 'Other'}
                    </li>
                  )}

                  {userProfile?.school && (
                    <li className={styles['detail-resume-item']}>
                      <FontAwesomeIcon icon={faGraduationCap} className={styles['mr-10']} />
                      School: {userProfile?.school}
                    </li>
                  )}
                </ul>
                <div className={styles['photo']}>
                  <h3>Photos</h3>
                  <Image.PreviewGroup className={styles['photo-list']}>
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                    <Image
                      width={'33%'}
                      height={150}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220*/, '') ?? ''}
                      alt=""
                      className={styles['photo-item-img']}
                    />
                  </Image.PreviewGroup>
                </div>
              </div>
              <div className={styles['detail-video']}>
                <PostArticle loading={profileState?.postArticleRequesting ?? false} />
                {articles &&
                  articles.map((article) => {
                    return <Article article={article} user={userProfile} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
