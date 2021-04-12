import Login from '../Pages/Login/index';
import Home from '../Pages/Home';
import Auth from '../Layouts/Auth';
import Signup from '../Pages/Signup';
import NotFound from '../Components/NotFound';
import NavBarHeader from '../Components/NavBarHeader';
import Profile from '../Pages/Profile';
enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}
const ROUTES = [
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
    path: '/',
    component: NavBarHeader,
    // layout: '',
    name: 'Home',
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        authority: [Roles.USER, Roles.ADMIN],
        name: 'Home',
      },
      {
        path: '/profile/:id',
        component: Profile,
        name: 'Home',
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
