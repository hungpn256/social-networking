import 'antd/dist/antd.css';
import axios from 'axios';
import * as _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io, Socket } from 'socket.io-client';
import './App.css';
import LoadingGlobal from './Components/LoadingGlobal';
import RoutePrivate from './Components/RoutePrivate';
import { ipSocket } from './configs/ip';
import ROUTES from './configs/router';
import Auth from './Layouts/Auth';
import Login from './Pages/Login';
import { getUser } from './Pages/Login/actions';
import services from './Pages/Login/service';
import Signup from './Pages/Signup';
function App() {
  const login = useSelector((state) => state.login);
  const { token } = login;
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const socket = useRef<Socket | undefined>();

  useEffect(() => {
    if (token) {
      console.log(123);

      socket.current = io(ipSocket, {
        transports: ['websocket'],
        auth: {
          token: localStorage.getItem('token'),
        },
      });
      socket.current.connect();
    }
    axios.defaults.headers.common['Authorization'] = token ? `${token}` : '';
    services
      .getUser()
      .then((res) => {
        dispatch(getUser(res.data));
        setReady(true);
      })
      .catch((err) => {
        const currentPath = pathname;
        const findRoute = _.findLast(ROUTES, (item) => currentPath.includes(item.path));
        if (findRoute?.hasOwnProperty('authority')) {
          history.push({
            pathname: '/auth/login',
            state: { prePath: currentPath },
          });
        }
        setReady(true);
      });
    return () => {
      console.log(socket.current);

      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [token, dispatch]);
  const renderRoute = () => {
    if (!ready) {
      return <LoadingGlobal></LoadingGlobal>;
    }
    return ROUTES.map((route) => {
      return RoutePrivate(route, login);
    });
  };
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
