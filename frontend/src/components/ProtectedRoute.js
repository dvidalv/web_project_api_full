import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {
  return (
    <Route
      {...props}
      render={routeProps =>
        loggedIn ? <Component {...routeProps} {...props} /> : <Redirect to="/users/signin" />
      }
    />
  );
};

export default ProtectedRoute;
