import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from '../../Components/Contents/Content';
import NavBar from '../../Components/NavBar/NavBar';
import Contact from '../../Components/Contact/Contact';
import styles from './styles.module.css';
import * as homeActions from './actions';
import { RootState } from '../../index_Reducer';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingMore from '../../Components/LoadingMore';
import services from './service';
import * as constantsType from './constants';
import { io } from 'socket.io-client';
import { ipSocket } from '../../configs/ip';
const socket = io(ipSocket, { transports: ['websocket'] });

function App() {
  const dispatch = useDispatch();
  const homeState = useSelector((state: RootState) => state.home);
  const { articles, friend } = homeState;
  const [hasMore, setHasMore] = useState(true);
  const currentId = useRef();
  useEffect(() => {
    fetchData();
    fetchFriends();
    socket.connect();
  }, [dispatch]);

  const fetchData = async () => {
    if (hasMore) {
      currentId.current = articles.length ? articles[articles.length - 1]._id : null;
      const res = await services.getArticle(currentId.current);
      const newPosts = [...articles, ...res.data.posts];
      const totalPost = res.data.totalPost;
      if (newPosts.length >= totalPost) {
        setHasMore(false);
      }
      dispatch(homeActions.getArticleSuccess(newPosts));
    }
  };

  const fetchFriends = async () => {
    try {
      const res = await services.getFriend();
      dispatch({
        type: constantsType.HOME_GET_FRIEND_SUCCESS,
        payload: {
          friend: res.data.friend,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={hasMore}
      loader={hasMore ? <LoadingMore /> : <div />}
      style={{ overflow: 'hidden' }}
    >
      <div className={styles['container']}>
        <NavBar />
        <Content articles={articles} />
        <Contact friend={friend} />
      </div>
    </InfiniteScroll>
  );
}

export default App;
