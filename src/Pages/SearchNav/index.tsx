import { Result } from 'antd';
import qs from 'query-string';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Content from '../../Components/Contents/Content';
import NavBar from '../../Components/NavBar/NavBar';
import Person from '../../Components/Person/Person';
import IUser from '../../Models/user';
import * as searchActions from './actions';
import styles from './styles.module.css';
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
        {articles.length > 0 && (
          <div>
            <div>Articles:</div>
            <Content articles={articles} hidePost={true} />
          </div>
        )}
        {users.length > 0 && (
          <div>
            <h3>Users</h3>
            {users.length > 0 ? (
              users.map((person: IUser) => {
                return <Person person={person} key={person._id} />;
              })
            ) : (
              <Result title="No anyone" />
            )}
          </div>
        )}
        {/* {users.length === 0 && articles.length === 0 && <Result title="Nothing" />} */}
      </div>
    </div>
  );
}

export default SearchComponent;
