import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import { NavBar, ErrorBoundary } from 'Components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
`;

const MainLayout = props => {
  useEffect(() => {
    if (!props.isAuthenticated) props.history.push('/login');
  }, [props.location.path, props.isAuthenticated]);

  return (
    <Container dir={props.direction}>
      {props.isAuthenticated && <NavBar changeLanguage={props.changeLanguage} />}
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </Container>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

const WrapSnackbar = withSnackbar(MainLayout);

export default connect(mapStateToProps)(withRouter(MainLayout));
