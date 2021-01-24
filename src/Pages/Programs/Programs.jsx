import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { USER_ROLES } from 'Config/constants';
import { empty_state_icon } from 'Assets/Images/empty_state_icon';
import ProgramItem from './ProgramItem/ProgramItem';
import classes from './Programs.module.css';

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const Programs = props => {
  const { t, i18n } = useTranslation();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.container}>
          {props.user.roleId === USER_ROLES.LEARNER ? (
            <h1>{t('programs.title')}</h1>
          ) : (
            <div className={classes.headerHeader}>
              <h1>{t('programs.title')}</h1>
              <NavLink to="/programs/add">
                <span>+</span>
                {t('programs.addProgram')}
              </NavLink>
            </div>
          )}
          <div className={classes.filters}>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('courses.filters.all')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setAll();
                }}
                checked={props.all}
                value={props.all}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('courses.filters.completed')}</span>
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
              <span className={classes.filterText}>{t('courses.filters.inProgress')}</span>
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
              <span className={classes.filterText}>{t('courses.filters.notStarted')}</span>
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
      <div className={classes.itemsList}>
        <div className={classes.containerItems}>
          {props.programs.length > 0 ? (
            props.programs.map(program => <ProgramItem key={program.programId} item={program} />)
          ) : (
            <div className={classes.empty}>
              <div className={classes.emptyIcon}>{empty_state_icon}</div>
              <span>{t('programs.emptyManager')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
