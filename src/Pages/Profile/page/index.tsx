import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import {
  faCamera,
  faChevronDown,
  faEye,
  faEyeSlash,
  faPlus,
  faSignInAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Image, Menu, Spin } from 'antd';
import axios from 'axios';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useHistory, useParams } from 'react-router-dom';
import userImg from '../../../Assets/user.png';
import LoadingGlobal from '../../../Components/LoadingGlobal';
import LoadingMore from '../../../Components/LoadingMore';
import { ip } from '../../../configs/ip';
import ILogin from '../../../Models/login';
import IProfile from '../../../Models/profile';
import { GET_OR_CREATE_CONVERSATION } from '../../Chat/constants';
import { createConversation } from '../../Chat/service';
import * as profileActions from '../actions';
import Detail from '../Components/Detail/Detail';
import Friend from '../Components/Friend';
import services from '../service';
import styles from './styles.module.css';

export default function Profile() {
  const { profile: profileState, login } = useSelector(
    (state: { login: ILogin; profile: IProfile }) => state
  );
  const { token } = login;
  const { loadingPage, user: userProfile, articles, friendStatus } = profileState;
  const [f, setF] = useState<string | undefined>(friendStatus);
  useEffect(() => {
    setF(friendStatus);
  }, [friendStatus]);
  const params: { _id: string } = useParams();
  const { _id } = params;
  const dispatch = useDispatch();
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const currentId = useRef<string | null>();
  const isLoading = useRef(false);

  const fetchData = async () => {
    try {
      if (isLoading.current) return;
      isLoading.current = true;
      if (hasMore) {
        const res = await services.getArticles({ _id, currentId: currentId.current });
        const newPosts = currentId.current ? [...articles, ...res.data.posts] : res.data.posts;
        const totalPost = res.data.totalPost;
        if (newPosts.length >= totalPost) {
          setHasMore(false);
        }
        dispatch(profileActions.getArticlesSuccess(newPosts));
        currentId.current = newPosts.length ? newPosts[newPosts.length - 1]._id : null;
      }
    } catch (err) {
      console.log(err);
    } finally {
      isLoading.current = false;
    }
  };

  useEffect(() => {
    dispatch(profileActions.getUser({ _id }));
    fetchData();
    return () => {
      dispatch({ type: 'CLEAR_STATE_PROFILE' });
      currentId.current = null;
      setHasMore(true);
    };
  }, [_id, token, dispatch]);

  const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file: File = (target.files as FileList)[0];
    if (file) {
      dispatch(profileActions.changeAvatar(file));
    }
  };

  const handleChangeCover = (file: File) => {
    if (file) {
      dispatch(profileActions.changeCover(file));
    }
  };

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
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<div />}
      style={{ overflow: 'hidden' }}
    >
      <div className={styles['DevKen']}>
        <div className={styles['content']}>
          <div className={styles['infor']}>
            <div className={styles['grid']}>
              <div className={styles['cover']}>
                <Spin delay={500} spinning={profileState?.changeCoverRequesting ?? false}>
                  <img src={userProfile?.cover} alt="" className={styles['cover-image']} />
                </Spin>
                {f === 'MINE' ? (
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
                ) : f === 'REQUESTED' || !f ? (
                  <>
                    <label
                      className={styles['change-cover']}
                      onClick={async () => {
                        try {
                          if (f === 'REQUESTED') {
                            setF(undefined);
                            await axios.put(`${ip}/friend/${_id}`, { status: 'REJECTED' });
                          } else {
                            await axios.post(`${ip}/friend/${_id}`);
                            setF('REQUESTED');
                          }
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={f ? faEyeSlash : faEye} />{' '}
                      <span id="content-button-follow">
                        {f === 'REQUESTED' ? 'REMOVE REQUEST' : 'ADD FRIEND'}
                      </span>
                    </label>
                  </>
                ) : f === 'PENDING' ? (
                  <div className={styles['wrap-btn']}>
                    <label
                      className={`${styles['btn']} ${styles['btn-add']}`}
                      onClick={async () => {
                        try {
                          setF('FRIEND');
                          await axios.put(`${ip}/friend/${_id}`, { status: 'ACCEPTED' });
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} /> <span>ADD FRIEND</span>
                    </label>
                    <label
                      className={styles['btn']}
                      onClick={async () => {
                        try {
                          setF('REJECTED');
                          await axios.put(`${ip}/friend/${_id}`, { status: 'REJECTED' });
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} /> <span>REMOVE</span>
                    </label>
                  </div>
                ) : f === 'FRIEND' ? (
                  <div className={styles['wrap-btn']}>
                    <label
                      className={`${styles['btn']} ${styles['btn-add']}`}
                      onClick={async () => {
                        try {
                          dispatch({ type: GET_OR_CREATE_CONVERSATION, payload: [_id] });
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faFacebookMessenger} /> <span>Messenger</span>
                    </label>
                  </div>
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
                {friendStatus === 'MINE' && (
                  <Dropdown overlay={menu} trigger={['click']}>
                    <FontAwesomeIcon icon={faChevronDown} className={styles['avatar-dropdown']} />
                  </Dropdown>
                )}
              </div>
              <div className={styles['infor-name']}>
                <h2 className={styles['name']}>{userProfile?.fullName}</h2>
              </div>

              <div className={styles['infor-nav']}>
                <ul className={styles['infor-nav-list']}>
                  <Link
                    to={'/profile/' + _id + '/photos'}
                    className={styles['infor-nav-item-link']}
                  >
                    <li className={styles['infor-nav-item']}>More</li>
                  </Link>
                  <Link
                    to={'/profile/' + _id + '/friend'}
                    className={styles['infor-nav-item-link']}
                  >
                    <li className={styles['infor-nav-item']}>Friend</li>
                  </Link>
                  <Link
                    to={'/profile/' + _id + '/photos'}
                    className={styles['infor-nav-item-link']}
                  >
                    <li className={styles['infor-nav-item']}>Photos</li>
                  </Link>
                  <Link to={'/profile/' + _id} className={styles['infor-nav-item-link']}>
                    <li className={styles['infor-nav-item']}>About</li>
                  </Link>
                </ul>
              </div>
            </div>
            <Route
              exact
              path={'/profile/:id'}
              render={() => (
                <Detail
                  articles={articles}
                  userProfile={userProfile}
                  friendStatus={friendStatus}
                  profileState={profileState}
                />
              )}
            ></Route>
            <Route exact path={'/profile/:id/friend'} render={() => <Friend />}></Route>
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
}
