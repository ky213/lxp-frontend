import React from 'react';
import styled from 'styled-components';

import { colors } from '../Styles/Colors';

const Button = styled.button`
  width: 146px;
  height: 43px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 56px;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? `not-allowed` : ` pointer`)};
  color: ${({ outlined }) => (outlined ? `${colors.primary}` : ` #ffffff`)};
  border: ${({ outlined }) => (outlined ? `1px solid ${colors.primary}` : `0px`)};
  background-color: ${({ color }) => color && ` ${colors[color || 'default']}`};
`;

export default Button;
