import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const user = {
  role: 'admin',
};
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
  // console.log(rest, authority, Component);
  return (
    <Route
      {...rest}
      key={rest?.path}
      render={(props: any) => {
        console.log(props, 'props');
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
              to={{ pathname: '/login', state: { prePath: props.location.pathname } }}
            ></Redirect>
          );
        }
      }}
    ></Route>
  );
};

export default RoutePrivate;
