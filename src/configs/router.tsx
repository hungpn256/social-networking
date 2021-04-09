import Login from '../Pages/Login/index';
import Home from '../Pages/Home';
import Auth from '../Layouts/Auth';
import Signup from '../Pages/Signup';
import NotFound from '../Components/NotFound';
enum Roles {
  USER = 'user',
  ADMIN = 'admin',
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
    path: '/auth',
    component: Auth,
    routes: [
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
    ],
  },
  {
    path: '*',
    component: NotFound,
    exact: true,
    name: '404-NotFound',
  },
];
export default ROUTES;
