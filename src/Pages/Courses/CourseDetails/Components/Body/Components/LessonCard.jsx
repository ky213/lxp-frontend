import React from 'react';

import LessonTiming from 'Assets/Icons/LessonTiming.svg';
import LessonParts from 'Assets/Icons/LessonParts.svg';
import LessonLevelBeginner from 'Assets/Icons/LessonLevelBeginner.svg';
import classes from './styles.module.css';

const LessonCard = () => {
  return (
    <div className={classes.main}>
      <div className={classes.lessonNumber}>
        <div>
          <div className={classes.title}>Lesson</div>
          <div className={classes.number}>01</div>
        </div>
      </div>
      <div className={classes.separator}></div>
      <div className={classes.description}>
        <div className={classes.assignedBy}>assigned by name</div>
        <div className={classes.lessonName}>lesson title</div>
        <div className={classes.bottomText}>desciprtion</div>
      </div>
      <div className={classes.lessonSpec}>
        <div>
          <img src={LessonTiming} alt="lesson_timing" /> <span>1h 30min</span>
        </div>
        <div>
          <img src={LessonParts} alt="lesson_parts" /> <span>10 parts</span>
        </div>
        <div>
          <img src={LessonLevelBeginner} alt="lesson_level" /> <span>beginner level</span>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
