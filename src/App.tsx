import 'antd/dist/antd.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import RoutePrivate from './Components/RoutePrivate';
import ROUTES from './configs/router';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
    dispatch({ type: 'GET_USER' });
  }, [dispatch]);
  const renderRoute = () => {
    return ROUTES.map((route) => {
      return RoutePrivate(route);
    });
  };
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" closeOnClick autoClose={2000} />
      <Switch>{renderRoute()}</Switch>
    </BrowserRouter>
  );
}

export default App;
