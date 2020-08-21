import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '@/services';
import { Role } from '@/helpers';
import { useAppState } from '@/components/AppState';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();

  return (
    <Route
      {...rest}
      render={(props) => {
        //const currentUser = authenticationService.currentUserValue;

        if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: '/pages/login', state: { from: props.location } }}
            />
          );
        }

        if (
          currentUser &&
          currentUser.user &&
          currentUser.user.role == Role.SuperAdmin
        ) {
          if (
            !selectedOrganization &&
            props.location &&
            props.location.pathname != '/' &&
            props.location.pathname != '/home' &&
            props.location.pathname != '/admin/superadmin'
          ) {
            return (
              <Redirect
                to={{
                  pathname: '/home',
                  state: {
                    from: props.location,
                    message: 'You need to select an organization first!',
                  },
                }}
              />
            );
          }
        }

        // check if route is restricted by role
        if (currentUser.user && currentUser.user.role != Role.SuperAdmin) {
          if (roles && roles.indexOf(currentUser.user.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/' }} />;
          }
        }

        // authorised so return component
        return <Component {...props} />;
      }}
    />
  );
};
