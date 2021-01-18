import React from 'react';

const PageHeader = () => {
  return (
    <div className={classes.header}>
      <div className={classes.headerContainer}>
        <div className={classes.headerHeader}>
          <h1>{t('activities.title')}</h1>
          <NavLink to="/activities/add">
            <div>+</div>
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
  );
};
