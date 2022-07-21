import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RoutePublic from './RoutePublic';

interface IRoute {
  path: string;
  name: string;
  component: any;
  authority?: Array<string>;
  rest: {
    routes?: string;
  };
}
const RoutePrivate = ({ component: Component, authority, ...rest }: IRoute, login) => {
  const { user } = login;
  return (
    <Route
      {...rest}
      key={rest?.path}
      render={(props: any) => {
        if (authority === undefined || (authority && user)) {
          return (
            <Component {...props} routes={rest?.routes}>
              {rest?.routes && (
                <Switch>
                  {rest?.routes.map((route) => {
                    if (route.authority) return RoutePrivate(route, login);
                    else return RoutePublic(route);
                  })}
                </Switch>
              )}
            </Component>
          );
        } else {
          return (
            <Redirect
              to={{ pathname: '/auth/login', state: { prePath: props.location.pathname } }}
            ></Redirect>
          );
        }
      }}
    ></Route>
  );
};

export default RoutePrivate;
