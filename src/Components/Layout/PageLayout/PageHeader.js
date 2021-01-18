import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import classes from './styles.css';

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const PageHeader = ({ title, filters = ['All'], url }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.headerHeader}>
          <h1>{title}</h1>
          <NavLink to={`${url}/activities/add`}>
            <span>+</span>
            <span>add new</span>
          </NavLink>
        </div>
        <div className={classes.filters}>
          {filters.map(filter => (
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>filter</span>
              <input type="checkbox" />
              <span className={classes.checkmark}></span>
            </StyledLabel>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
