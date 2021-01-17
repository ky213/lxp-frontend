import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  direction: ${({ direction }) => direction};
`;

const index = props => {
  return <Container>{props.children}</Container>;
};

export default index;
