import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './styles.module.css';

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const PageHeader = ({ title, filters, direction }) => {
  const { t, i18n } = useTranslation();
  const editMode = title.startsWith('Add/Edit');

  return (
    <div className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.headerHeader}>
          <h1>{title}</h1>
          {
            <NavLink to="add">
              <FontAwesomeIcon icon={editMode ? faArrowLeft : faPlus} />
              <span style={{ textAlign: 'right' }}>{editMode ? ' Go back' : 'add new'}</span>
            </NavLink>
          }
        </div>
        <div className={classes.filters}>
          {filters?.map(filter => (
            <StyledLabel className={classes.filter} direction={direction}>
              <span className={classes.filterText}>{filter}</span>
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
