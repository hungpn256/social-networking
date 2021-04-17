import {
  faCamera,
  faChevronDown,
  faEdit,
  faGraduationCap,
  faHome,
  faMars,
  faPhone,
  faVenus,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Affix, Dropdown, Image, Menu, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import userImg from '../../../Assets/user.png';
import Article from '../../../Components/Article/Article';
import LoadingGlobal from '../../../Components/LoadingGlobal';
import PostArticle from '../../../Components/PostArticle';
import * as profileActions from '../actions';
import styles from './styles.module.css';
export default function Profile({ user }) {
  const profileState = useSelector((state) => state.profile);
  const [offsetTop, setOffset] = useState(60);
  const { loadingPage, user: userProfile, articles } = profileState;
  const params = useParams();
  const { _id } = params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'CLEAR_STATE_PROFILE' });
    dispatch(profileActions.getUser({ _id }));
  }, [_id, dispatch]);
  const onChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(profileActions.changeAvatar(file));
    }
  };
  useEffect(() => {
    const setOffsetTop = () => {
      window.innerWidth > 768 ? setOffset(60) : setOffset('100%');
    };
    setOffsetTop();
    window.addEventListener('resize', setOffsetTop);
    return () => {
      window.removeEventListener('resize', setOffsetTop);
    };
  }, []);
  if (loadingPage) {
    return <LoadingGlobal />;
  }
  const handleChangeCover = (file) => {
    if (file) {
      dispatch(profileActions.changeCover(file));
    }
  };
  const listImg = articles && articles.filter((article) => article.imgs[0]?.viewUrl).splice(0, 9);
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
              <Spin
                size="large"
                delay={500}
                spinning={profileState?.changeCoverRequesting ?? false}
              >
                <img
                  src={
                    userProfile?.cover?.viewUrl?.replace(/=s220/, '') ??
                    'https://vectormienphi.com/wp-content/uploads/2018/12/3af9e2d2628ab1842d2344a9d1d84ea0-600x250.jpg'
                  }
                  alt=""
                  className={styles['cover-image']}
                />
              </Spin>
              <label className={styles['change-cover']} htmlFor="change-cover">
                <FontAwesomeIcon icon={faCamera} /> <span>Chỉnh sửa ảnh bìa</span>
              </label>
              <input
                type="file"
                accept="image"
                id="change-cover"
                style={{ display: 'none' }}
                onChange={(e) => handleChangeCover(e.target.files[0])}
              ></input>
            </div>
            <div className={styles['avatar']}>
              <Spin delay={500} size="large" spinning={profileState.requesting}>
                <Image.PreviewGroup>
                  {!profileState.requesting && (
                    <Image
                      className={`${styles['avatar-image']}`}
                      height={175}
                      width={175}
                      src={userProfile?.avatar?.viewUrl?.replace(/=s220/, '') ?? userImg}
                      preview={{
                        src: userProfile?.avatar?.viewUrl,
                      }}
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
              <Affix offsetTop={offsetTop} className={styles['detail-resume']}>
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
                  <div className={styles['photo-list']}>
                    <Image.PreviewGroup>
                      {listImg?.map((article) => {
                        return (
                          <Image
                            width={'98%'}
                            height={120}
                            src={article.imgs[0].viewUrl.replace(/=s220/, '')}
                            alt=""
                            className={styles['photo-item-img']}
                          />
                        );
                      })}
                    </Image.PreviewGroup>
                  </div>
                </div>
              </Affix>
              <div className={styles['detail-video']}>
                <PostArticle loading={profileState?.postArticleRequesting ?? false} />
                {articles &&
                  articles.map((article) => {
                    return <Article article={article} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
