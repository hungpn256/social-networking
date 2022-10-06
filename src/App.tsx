import 'antd/dist/antd.css';
import axios from 'axios';
import * as _ from 'lodash';
import { createContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io, Socket } from 'socket.io-client';
import './App.css';
import soundReceiveMessage from './Assets/audio/receiveMessage.mp3';
import LoadingGlobal from './Components/LoadingGlobal';
import RoutePrivate from './Components/RoutePrivate';
import { ipSocket } from './configs/ip';
import ROUTES from './configs/router';
import { RootState } from './index_Reducer';
import Auth from './Layouts/Auth';
import Chat from './Pages/Chat';
import { CHANGE_NICKNAME, GET_CONVERSATION_UNSEEN, ON_NEW_MESSGAGE } from './Pages/Chat/constants';
import ConfirmPassword from './Pages/ConfirmPassword';
import ForgotPassword from './Pages/Forgot-password';
import { GET_FRIEND } from './Pages/Home/constants';
import Login from './Pages/Login';
import { getUser } from './Pages/Login/actions';
import services from './Pages/Login/service';
import { GET_NOTIFICATION, GET_NOTIFICATION_UNSEEN } from './Pages/Notification/constants';
import Signup from './Pages/Signup';

export const SocketContext = createContext<{ socket: Socket | undefined }>({ socket: undefined });

function App() {
  const login = useSelector((state: RootState) => state.login);
  const { token, user } = login;
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const socket = useRef<Socket | undefined>();
  const audioRef = useRef(new Audio(soundReceiveMessage));

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token ? `${token}` : '';
    if (token) {
      socket.current = io(ipSocket, {
        transports: ['websocket'],
        auth: {
          token,
        },
      });
      socket.current.connect();
      dispatch({ type: GET_CONVERSATION_UNSEEN });
      dispatch({ type: GET_NOTIFICATION_UNSEEN });
    }
    if (socket.current) {
      socket.current.on('friend-status-change', () => {
        dispatch({ type: GET_FRIEND, payload: { _id: user!._id } });
      });
      socket.current.on('new-message', (conversation) => {
        if (conversation) {
          dispatch({ type: ON_NEW_MESSGAGE, payload: { conversation, userId: user?._id } });
          dispatch({ type: GET_CONVERSATION_UNSEEN });
          try {
            audioRef.current.play();
          } catch (err) {
            console.log(err);
          }
        }
      });

      socket.current.on('new-notification', (notification) => {
        dispatch({ type: GET_NOTIFICATION_UNSEEN });
        dispatch({ type: GET_NOTIFICATION });
      });

      socket.current.on('change-nickname', (data) => {
        dispatch({ type: CHANGE_NICKNAME, payload: data });
      });
    }

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
  }, [token, dispatch, user?._id]);

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
      <SocketContext.Provider value={{ socket: socket.current }}>
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
                    {
                      path: '/auth/forgot-password',
                      component: ForgotPassword,
                      exact: true,
                      name: 'Forgot Password',
                    },
                    {
                      path: '/auth/confirm-password',
                      component: ConfirmPassword,
                      exact: true,
                      name: 'Confirm Password',
                    },
                  ]}
                ></Auth>
              );
            }}
          />
          {renderRoute()}
        </Switch>
        {user && <Chat />}
      </SocketContext.Provider>
    </div>
  );
}

export default App;
