import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavBar, ErrorBoundary } from '../../';

const Container = styled.div`
  width: 100%;
  direction: ${({ direction }) => direction};
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
