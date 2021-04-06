import Login from '../Pages/Login/index';
import Home from '../Pages/Home';

enum Roles{
  USER='user',
  ADMIN='admin'
}
const ROUTES = [
  {
    path: '/',
    component: Home,
    // layout: '',
    authority: [Roles.USER, Roles.ADMIN],
    exact: true,
    name: 'Home',
  },
  {
    path: '/login',
    component: Login,
    // layout: '',
    // authority: ['user'],
    exact: true,
    name: 'Log in',
  },
  {
    path: '/signup',
    component: Login,
    // layout: '',
    // authority: ['user'],
    exact: true,
    name: 'Sign up',
  },
  {
    path: '*',
    component: Home,
    // layout: '',
    // authority: ['user'],
    exact: true,
    name: 'Sign up',
  },
];
export default ROUTES;
