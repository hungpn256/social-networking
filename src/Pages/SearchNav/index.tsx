import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from '../../Components/Contents/Content';
import NavBar from '../../Components/NavBar/NavBar';
import Trends from '../../Components/Trends/Trends';
import styles from './styles.module.css';
import * as searchActions from './actions';
import Person from '../../Components/Person/Person';
import qs from 'query-string';
import { useLocation } from 'react-router';
import NotFound from '../../Components/NotFound';
import { Button, Result } from 'antd';
function SearchComponent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchState = useSelector((state) => state.search);
  const searchText = qs.parse(location.search)?.q ?? '';
  const { users } = searchState;
  const { articles } = searchState;
  useEffect(() => {
    dispatch(searchActions.search(searchText));
  }, [dispatch, searchText]);
  return (
    <div className={styles['App']}>
      <div className={styles['container']}>
        <NavBar />
        <div>
          <div>Articles:</div>
          <Content articles={articles} hidePost={true} />
        </div>
        <div>
          <h3>Users</h3>
          {users.length > 0 ? (
            users.map((person) => {
              return <Person person={person} key={person._id} />;
            })
          ) : (
            <Result title="No anyone" />
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
