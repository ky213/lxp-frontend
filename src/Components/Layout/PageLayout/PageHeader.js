import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './styles.module.css';
import { Button } from 'Components/Base';

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const PageHeader = ({ title, filters, direction, history }) => {
  const { t, i18n } = useTranslation();
  const editMode = title.startsWith('Edit');

  return (
    <div className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.headerHeader}>
          <h1>{title}</h1>
          {
            <Button variant="contained" color="secondary" onClick={() => history.goBack()}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span style={{ margin: '10px' }}>{' Go back'}</span>
            </Button>
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

export default withRouter(PageHeader);
