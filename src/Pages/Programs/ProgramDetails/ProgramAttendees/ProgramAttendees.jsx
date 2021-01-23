import React from 'react';
import classes from './ProgramAttendees.module.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { searchicon } from 'Assets/Images/searchicon';
import { empty_state_icon } from 'Assets/Images/empty_state_icon';

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const ProgramAttendees = props => {
  const { t, i18n } = useTranslation();

  let learners = [];

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          <h1>
            {props.currentProgram?.name} {t('programLearners.title')}
          </h1>
          <div className={classes.filters}>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.filters.all')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setAll();
                }}
                value={props.all}
                checked={props.all}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.filters.completed')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setCompleted(!props.completed);
                }}
                checked={props.completed}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.filters.inProgress')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setInProgress(!props.inProgress);
                }}
                checked={props.inProgress}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.filters.notStarted')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setNotStarted(!props.notStarted);
                }}
                checked={props.notStarted}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.container}>
          <div className={classes.search}>
            {searchicon}
            <input
              placeholder={t('programLearners.searchPlaceholder')}
              onChange={e => props.setSearchValue(e.target.value)}
              value={props.searchValue}
              name="searchValue"
            />
          </div>
          <div className={classes.itemsList}>
            {learners.length > 0 && learners ? (
              learners
            ) : (
              <div className={classes.empty}>
                <div className={classes.emptyIcon}>{empty_state_icon}</div>
                <span>{t('programLearners.empty')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramAttendees;
