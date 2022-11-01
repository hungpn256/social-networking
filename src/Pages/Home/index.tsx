import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import Contact from '../../Components/Contact/Contact';
import Content from '../../Components/Contents/Content';
import NavBar from '../../Components/NavBar/NavBar';
import { RootState } from '../../index_Reducer';
import IUser from '../../Models/user';
import * as homeActions from './actions';
import * as constantsType from './constants';
import services from './service';
import styles from './styles.module.css';

function App() {
  const dispatch = useDispatch();
  const homeState = useSelector((state: RootState) => state.home);
  const user = useSelector((state: RootState) => state.login.user) as IUser;
  const { articles, friend } = homeState;
  const [hasMore, setHasMore] = useState(true);
  const currentId = useRef();
  useEffect(() => {
    fetchData();
    dispatch({ type: constantsType.GET_FRIEND, payload: { _id: user._id } });
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

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<div />}
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
