import Login from '../Pages/Login/index';
import Home from '../Pages/Home';
import Auth from '../Layouts/Auth';
import Signup from '../Pages/Signup';
import NotFound from '../Components/NotFound';
import NavBarHeader from '../Components/NavBarHeader';
import Profile from '../Pages/Profile';
import SearchComponent from '../Pages/SearchNav';
import ShellChat from '../Pages/Chat/shell';

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
  // {
  //   path: '/messenger',
  //   component: ShellChat,
  //   name: 'messenger',
  // },
  {
    path: '/',
    component: NavBarHeader,
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
        path: '/search',
        exact: false,
        component: SearchComponent,
        authority: [Roles.USER, Roles.ADMIN],
        name: 'search',
      },
      {
        path: '/profile/:_id',
        component: Profile,
        name: 'Profile',
      },
      {
        path: '*',
        component: NotFound,
        exact: true,
        name: '404-NotFound',
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
