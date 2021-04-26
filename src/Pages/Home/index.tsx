import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from '../../Components/Contents/Content';
import NavBar from '../../Components/NavBar/NavBar';
import Trends from '../../Components/Trends/Trends';
import styles from './styles.module.css';
import * as homeActions from './actions';
function App() {
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);
  const { userRecomment } = homeState;
  const { articles } = homeState;
  useEffect(() => {
    dispatch(homeActions.getUserRecomment());
    dispatch(homeActions.getArticle());
  }, []);
  return (
    <div className={styles['App']}>
      <div className={styles['container']}>
        <NavBar />
        <Content articles={articles} />
        <Trends userRecomment={userRecomment} />
      </div>
    </div>
  );
}

export default App;
