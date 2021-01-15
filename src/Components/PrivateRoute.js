import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { ErrorBoundary } from '.';

export const PrivateRouteComponent = ({
  component: Component,
  isAuthenticated,
  isAuthorized,
  hasRole = [],
  ...rest
}) => {
  const checkAuthorities = props =>
    isAuthorized ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
      <div style={{ width: '60%', margin: 'auto' }}>
        <h1>403</h1>
        <h3>You are not authorized to access this page.</h3>
      </div>
    );

  const renderRedirect = props => {
    return isAuthenticated ? (
      checkAuthorities(props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          search: props.location.search,
          state: { from: props.location },
        }}
      />
    );
  };

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${rest.path}`);

  return <Route {...rest} render={renderRedirect} />;
};

const mapStateToProps = ({ authentication: { isAuthenticated, account } }, { hasRole = [] }) => ({
  isAuthenticated,
  isAuthorized: hasRole.includes(account?.role),
});

export const PrivateRoute = connect(mapStateToProps, null, null, { pure: false })(PrivateRouteComponent);

export default PrivateRouteComponent;
