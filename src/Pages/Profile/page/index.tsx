import {
  faCamera,
  faChevronDown,
  faEdit,
  faEye,
  faEyeSlash,
  faGraduationCap,
  faHome,
  faMars,
  faPhone,
  faSignInAlt,
  faVenus,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Affix, Dropdown, Image, Menu, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import userImg from '../../../Assets/user.png';
import Article from '../../../Components/Article';
import LoadingGlobal from '../../../Components/LoadingGlobal';
import PostArticle from '../../../Components/PostArticle';
import * as profileActions from '../actions';
import styles from './styles.module.css';
import * as loginActions from '../../Login/actions';
export default function Profile({ user }) {
  const profileState = useSelector((state) => state.profile);
  const login = useSelector((state) => state.login);
  const { token } = login;
  const [offsetTop, setOffset] = useState(60);
  const { loadingPage, user: userProfile, articles, isFollowed } = profileState;
  const params = useParams();
  const { _id } = params;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: 'CLEAR_STATE_PROFILE' });
    dispatch(profileActions.getUser({ _id }));
  }, [_id, token, dispatch]);
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
  const listImg = articles && articles.filter((article) => article.images[0]).splice(0, 9);
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
              <Spin delay={500} spinning={profileState?.changeCoverRequesting ?? false}>
                <img src={userProfile?.cover} alt="" className={styles['cover-image']} />
              </Spin>
              {isFollowed === 0 ? (
                <>
                  <label className={styles['change-cover']} htmlFor="change-cover">
                    <FontAwesomeIcon icon={faCamera} /> <span>Edit cover picture</span>
                  </label>
                  <input
                    type="file"
                    accept="image"
                    id="change-cover"
                    style={{ display: 'none' }}
                    onChange={(e) => handleChangeCover(e.target.files[0])}
                  ></input>
                </>
              ) : isFollowed === 2 || isFollowed === 1 ? (
                <>
                  <label
                    className={styles['change-cover']}
                    onClick={() => {
                      dispatch(loginActions.followUser(_id));
                      let btn = document.getElementById('content-button-follow');
                      if (btn?.textContent === 'Follow') {
                        btn.textContent = 'UnFollow';
                      } else btn.textContent = 'Follow';
                    }}
                  >
                    <FontAwesomeIcon icon={isFollowed === 1 ? faEyeSlash : faEye} />{' '}
                    <span id="content-button-follow">
                      {isFollowed === 1 ? 'UnFollow' : 'Follow'}
                    </span>
                  </label>
                </>
              ) : (
                <>
                  <label
                    className={styles['change-cover']}
                    onClick={() => {
                      history.push({
                        pathname: '/auth/login',
                        state: {
                          prePath: history.location.pathname,
                        },
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faSignInAlt} /> <span>Đăng nhập</span>
                  </label>
                </>
              )}
            </div>
            <div className={styles['avatar']}>
              <Spin delay={500} spinning={profileState.requesting}>
                <Image.PreviewGroup>
                  {!profileState.requesting && (
                    <Image
                      className={`${styles['avatar-image']}`}
                      height={175}
                      width={175}
                      src={userProfile?.avatar ?? userImg}
                      preview={{
                        src: userProfile?.avatar,
                      }}
                    ></Image>
                  )}
                </Image.PreviewGroup>
              </Spin>
              {isFollowed === 0 && (
                <Dropdown overlay={menu} trigger={['click']}>
                  <FontAwesomeIcon icon={faChevronDown} className={styles['avatar-dropdown']} />
                </Dropdown>
              )}
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
                            src={article.images[0].url}
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
                {isFollowed === 0 && (
                  <PostArticle loading={profileState?.postArticleRequesting ?? false} />
                )}
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
