import 'antd/dist/antd.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RoutePrivate from './Components/RoutePrivate';
import ROUTES from './configs/router';
import Auth from './Layouts/Auth';
import Login from './Pages/Login';
import { getUser } from './Pages/Login/actions';
import Signup from './Pages/Signup';
import services from './Pages/Login/service';
function App() {
  const login = useSelector((state) => state.login);
  const { token } = login;
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token ? `${token}` : '';
    services
      .getUser()
      .then((res) => {
        dispatch(getUser(res.data));
        setReady(true);
      })
      .catch((err) => {
        history.push({
          pathname: '/auth/login',
          state: { prePath: '/' },
        });
      });
  }, [token]);
  const renderRoute = () => {
    if (!ready) {
      return <div>loading...</div>;
    }
    return ROUTES.map((route) => {
      return RoutePrivate(route, login);
    });
  };
  return (
    <>
      <ToastContainer position="bottom-right" closeOnClick autoClose={2000} />
      <Switch>
        <Route
          path="/auth"
          render={() => {
            return (
              <Auth
                routes={[
                  {
                    path: '/auth/login',
                    component: Login,
                    exact: true,
                    name: 'Log in',
                  },
                  {
                    path: '/auth/signup',
                    component: Signup,
                    exact: true,
                    name: 'Sign up',
                  },
                ]}
              ></Auth>
            );
          }}
        />
        {renderRoute()}
      </Switch>
    </>
  );
}

export default App;
