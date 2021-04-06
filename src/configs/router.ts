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
];
export default ROUTES;
