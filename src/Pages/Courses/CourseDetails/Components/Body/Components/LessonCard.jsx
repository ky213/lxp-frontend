import React from 'react';

import classes from './styles.module.css';

const LessonCard = () => {
  return (
    <div className={classes.main}>
      <div>
        <div>Number</div>
        <div>01</div>
      </div>
      <div>
        <div>assigned by name</div>
        <div>lesson title</div>
        <div>desciprtion</div>
      </div>
      <div>
        <div>1h 30min</div>
        <div>10 parts</div>
        <div>beginner level</div>
      </div>
    </div>
  );
};

export default LessonCard;
