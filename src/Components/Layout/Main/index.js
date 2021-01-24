import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { NavBar, ErrorBoundary } from 'Components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
`;

const Snack = ({ success, error }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  if (success || error)
    enqueueSnackbar(success ? 'Success' : error, {
      variant: success ? 'success' : 'error',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  return null;
};

const MainLayout = props => {
  useEffect(() => {
    if (!props.isAuthenticated) props.history.push('/login');
  }, [props.location.path, props.isAuthenticated]);

  return (
    <Container dir={props.direction}>
      {props.isAuthenticated && <NavBar changeLanguage={props.changeLanguage} />}
      <SnackbarProvider>
        <Snack success={props.global.success} error={props.global.error} />
        <ErrorBoundary>{props.children}</ErrorBoundary>
      </SnackbarProvider>
    </Container>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  global: state.global,
});

// const WrapSnackbar = withSnackbar(MainLayout);

export default connect(mapStateToProps)(withRouter(MainLayout));
