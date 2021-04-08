import 'antd/dist/antd.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RoutePrivate from './Components/RoutePrivate';
import ROUTES from './configs/router';
import Auth from './Layouts/Auth';
import Login from './Pages/Login';
import { getUser } from './Pages/Login/actions';
import Signup from './Pages/Signup';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const { requesting, success } = login;
  useEffect(() => {
    if (token && token.length > 0) {
      axios.defaults.headers.common['Authorization'] = token ? `${token}` : '';
      dispatch(getUser());
    }
  }, [dispatch, token]);
  const renderRoute = () => {
    return ROUTES.map((route) => {
      return RoutePrivate(route);
    });
  };
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
