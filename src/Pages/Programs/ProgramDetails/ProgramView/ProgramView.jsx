import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import classes from './ProgramView.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { empty_state_icon } from 'Assets/Images/empty_state_icon';

const StyledHeader = styled.div``;

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const ProgramView = props => {
  const urlParams = useParams();
  const { t, i18n } = useTranslation();

  let courses = [];

  return (
    <div className={classes.main}>
      <StyledHeader className={classes.header}></StyledHeader>
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <div className={classes.headerTop}>
            <div className={classes.headerSide}>
              <h1>{props.currentProgram?.name}</h1>
              <div className={classes.def} />
              <span className={classes.headerCourses}>
                {props.currentProgram?.courses ? props.currentProgram?.courses.length : 0} {t('programView.courses')}
              </span>
            </div>
            <div className={classes.headerSide}>
              <NavLink to={`/programs/edit/${urlParams.programId}`}>
                <i className="far fa-edit"></i>
                <span>{t('programView.edit')}</span>
              </NavLink>
            </div>
          </div>
          <p>{props.currentProgram?.subject}</p>
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
        <div className={classes.itemsList}>
          {props.currentProgram?.courses ? (
            props.currentProgram?.courses.length > 0 ? (
              courses
            ) : (
              <div className={classes.empty}>
                <div className={classes.emptyIcon}>{empty_state_icon}</div>
                <span>{t('programView.empty')}</span>
                <NavLink to="/courses/add">{t('programView.addCourse')}</NavLink>
              </div>
            )
          ) : (
            <div className={classes.empty}>
              <div className={classes.emptyIcon}>{empty_state_icon}</div>
              <span>{t('programView.empty')}</span>
              <NavLink to="/courses/add">{t('programView.addCourse')}</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramView;
