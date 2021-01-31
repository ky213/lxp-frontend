import React from 'react';
import PropsTypes from 'prop-types';

import { empty_state_icon } from 'Assets/Images/empty_state_icon';
import classes from './styles.module.css';

const NoDataPlaceholder = props => {
  const { message } = props;
  return (
    <div className={classes.empty}>
      <div className={classes.emptyIcon}>{empty_state_icon}</div>
      <span>{message || 'no data'}</span>
    </div>
  );
};

export default NoDataPlaceholder;

NoDataPlaceholder.propTypes = {
  message: PropsTypes.string,
};
