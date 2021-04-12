import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RoutePrivate from './RoutePrivate';

interface IRoute {
  path: string;
  name: string;
  component: any;
  authority?: Array<string>;
  rest: {
    routes?: string;
  };
}
const RoutePublic = ({ component: Component, authority, ...rest }: IRoute) => {
  return (
    <Route
      {...rest}
      key={rest?.path}
      render={(props: any) => {
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
      }}
    ></Route>
  );
};

export default RoutePublic;
