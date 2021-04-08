import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

interface IRoute {
  path: string;
  name: string;
  component: any;
  authority?: Array<string>;
  rest: {
    routes?: string;
  };
}
const RoutePrivate = ({ component: Component, authority, ...rest }: IRoute) => {
  const login = useSelector((state) => state.login);
  const { user, success, requesting } = login;
  return (
    <Route
      {...rest}
      key={rest?.path}
      render={(props: any) => {
        if (success && !requesting) {
          if (
            authority === undefined ||
            (authority &&
              authority?.some((item: string) => {
                return item === user.role;
              }))
          ) {
            return <Component {...props} routes={rest?.routes}></Component>;
          } else {
            return (
              <Redirect
                to={{ pathname: '/auth/login', state: { prePath: props.location.pathname } }}
              ></Redirect>
            );
          }
        } else {
          return <div>loading</div>;
        }
      }}
    ></Route>
  );
};

export default RoutePrivate;
