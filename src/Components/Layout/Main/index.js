import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavBar, ErrorBoundary } from 'Components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
`;

const MainLayout = props => {
  return (
    <Container dir={props.direction}>
      <Router>
        <NavBar changeLanguage={props.changeLanguage} />
        <ErrorBoundary>{props.children}</ErrorBoundary>
      </Router>
    </Container>
  );
};

export default MainLayout;
