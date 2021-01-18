import React from 'react';

const CheckBox = props => {
  return (
    <div className={classes.filter} direction={props.direction}>
      <span className={classes.filterText}>All</span>
      <input type="checkbox" />
      <span className={classes.checkmark}></span>
    </div>
  );
};

export default CheckBox;
