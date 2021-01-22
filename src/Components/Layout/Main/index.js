import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { NavBar, ErrorBoundary } from 'Components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
`;

const MainLayout = props => {
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

export default connect(mapStateToProps)(MainLayout);
