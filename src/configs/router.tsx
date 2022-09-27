import Login from '../Pages/Login/index';
import Home from '../Pages/Home';
import Auth from '../Layouts/Auth';
import Signup from '../Pages/Signup';
import NotFound from '../Components/NotFound';
import NavBarHeader from '../Components/NavBarHeader';
import Profile from '../Pages/Profile';
import SearchComponent from '../Pages/SearchNav';
import ConfirmPassword from '../Pages/ConfirmPassword';
import ArticleDetail from '../Pages/ArticleDetail';

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
        path: '/auth/forgot-password',
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
        path: '/auth/confirm-password',
        component: ConfirmPassword,
        exact: true,
        name: 'Confirm Password',
      },
    ],
  },
  // {
  //   path: '/messenger',
  //   component: ShellChat,
  //   authority: true,
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
        authority: true,
        name: 'Home',
      },
      {
        path: '/search',
        exact: false,
        component: SearchComponent,
        authority: true,
        name: 'search',
      },
      {
        path: '/profile/:_id',
        component: Profile,
        authority: true,
        name: 'Profile',
      },
      {
        path: '/article/:_id',
        component: ArticleDetail,
        authority: true,
        name: 'Article',
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
