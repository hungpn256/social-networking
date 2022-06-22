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
import React, { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import userImg from '../../../Assets/user.png';
import Article from '../../../Components/Article';
import LoadingGlobal from '../../../Components/LoadingGlobal';
import PostArticle from '../../../Components/PostArticle';
import * as loginActions from '../../Login/actions';
import * as profileActions from '../actions';
import styles from './styles.module.css';
import IArticle from '../../../Models/article';
import ILogin from '../../../Models/login';
import IProfile from '../../../Models/profile';
export default function Profile() {
  const { profile: profileState, login } = useSelector(
    (state: { login: ILogin; profile: IProfile }) => state
  );
  const { token } = login;
  const [offsetTop, setOffset] = useState<undefined | number>(60);
  const { loadingPage, user: userProfile, articles, isFollowed } = profileState;
  const [f, setF] = useState<boolean>(isFollowed === 1 ? true : false);
  useEffect(() => {
    setF(isFollowed === 1 ? true : false);
  }, [isFollowed]);
  const params: { _id: string } = useParams();
  const { _id } = params;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: 'CLEAR_STATE_PROFILE' });
    dispatch(profileActions.getUser({ _id }));
  }, [_id, token, dispatch]);
  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file: File = (target.files as FileList)[0];
    if (file) {
      dispatch(profileActions.changeAvatar(file));
    }
  };
  useEffect(() => {
    const setOffsetTop = () => {
      window.innerWidth > 768 ? setOffset(60) : setOffset(undefined);
    };
    setOffsetTop();
    window.addEventListener('resize', setOffsetTop);
    return () => {
      window.removeEventListener('resize', setOffsetTop);
    };
  }, []);
  const handleChangeCover = (file: File) => {
    if (file) {
      dispatch(profileActions.changeCover(file));
    }
  };
  const listImg =
    articles && articles.filter((article: IArticle) => article.images[0]).splice(0, 9);
  const menu = (
    <Menu style={{ marginTop: 20, borderRadius: 10 }}>
      <Menu.Item
        key="1"
        onClick={() => {
          const changeAvatar: HTMLElement | null = document.getElementById('changeAvatar');
          changeAvatar?.click();
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
  if (loadingPage) {
    return <LoadingGlobal />;
  }
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChangeCover((e.target.files as FileList)[0])
                    }
                  ></input>
                </>
              ) : isFollowed === 2 || isFollowed === 1 ? (
                <>
                  <label
                    className={styles['change-cover']}
                    onClick={() => {
                      dispatch(loginActions.followUser(_id));
                      setF(!f);
                    }}
                  >
                    <FontAwesomeIcon icon={f ? faEyeSlash : faEye} />{' '}
                    <span id="content-button-follow">{f ? 'UnFollow' : 'Follow'}</span>
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
                <Link to={'/profile/' + _id + '/photos'} className={styles['infor-nav-item-link']}>
                  <li className={styles['infor-nav-item']}>More</li>
                </Link>
                <Link
                  to={'/profile/' + _id + '/follower'}
                  className={styles['infor-nav-item-link']}
                >
                  <li className={styles['infor-nav-item']}>Follower</li>
                </Link>
                <Link to={'/profile/' + _id + '/photos'} className={styles['infor-nav-item-link']}>
                  <li className={styles['infor-nav-item']}>Photos</li>
                </Link>
                <Link to={'/profile/' + _id + '/about'} className={styles['infor-nav-item-link']}>
                  <li className={styles['infor-nav-item']}>About</li>
                </Link>
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
                      {listImg?.map((article: IArticle, index: number) => {
                        return (
                          <Image
                            key={index}
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
                  articles.map((article: IArticle, index: number) => {
                    return <Article key={article._id} article={article} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
