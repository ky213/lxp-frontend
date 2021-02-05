import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import moment from 'moment';

import { NoDataPlaceholder, Preloader } from 'Components';
import { USER_ROLES, DATE_FORMAT } from 'Config/constants';
import { getActivities, getActivitiesByLearner, resetActivitiesState } from 'Store/Reducers/activities';
import classes from './Activities.module.css';
import ActivityItem from './ActivityItem/ActivityItem';

const StyledLabel = styled.label`
  margin-left: ${({ direction }) => (direction === 'rtl' ? '56px' : '0')};
  margin-right: ${({ direction }) => (direction === 'ltr' ? '56px' : '0')};
`;

const Activities = props => {
  const { t, i18n } = useTranslation();

  const { activities, profile } = props;
  const isLearner = profile.role === USER_ROLES.LEARNER;

  useEffect(() => {
    const from = moment().format(DATE_FORMAT.DEFAULT);
    const to = moment().format(DATE_FORMAT.DEFAULT);

    if (isLearner) props.getActivitiesByLearner(profile.organizationId, profile.employeeId, profile.userId);
    else props.getActivities(profile.organizationId, profile.employeeId, profile.userId, from, to);

    return props.resetActivitiesState;
  }, []);

  activities.allActivities.sort(function (a, b) {
    return new Date(b.end) - new Date(a.end);
  });

  const activityCards = activities.allActivities.map(item => {
    return <ActivityItem item={item} key={item.activityId} width={props.blockWidth} />;
  });

  if (activities.loading) return <Preloader />;

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          <div className={classes.headerHeader}>
            <h1>Activities</h1>
            <NavLink to="/activities/add">
              <div>
                <span>+</span>
              </div>
              {t('activities.addActivityBut')}
            </NavLink>
          </div>
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
            <StyledLabel className={classes.filter} direction={props.direction}>
              <span className={classes.filterText}>{t('activities.filters.private')}</span>
              <input
                type="checkbox"
                onChange={() => {
                  props.setPrivateParam(!props.privateParam);
                }}
                checked={props.privateParam}
              />
              <span className={classes.checkmark}></span>
            </StyledLabel>
          </div>
        </div>
      </div>
      <div className={classes.itemsList}>
        <div className={classes.containerItems}>
          {activities.length > 0 && activities != null && activities != undefined ? (
            activityCards
          ) : (
            <NoDataPlaceholder message="no activities yet" />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.authentication.profile,
  activities: state.activities,
});

const mapDispatchToProps = {
  getActivities,
  getActivitiesByLearner,
  resetActivitiesState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
