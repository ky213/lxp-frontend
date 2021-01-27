import React from 'react';

import { LessonCard } from './Components';
import classes from './styles.module.css';
import LessonIcon from 'Assets/Icons/LessonIcon.svg';

const Body = () => {
  return (
    <div className={classes.main}>
      <div className={classes.title}>
        <img src={LessonIcon} alt="" />
        <span>Lessons</span>
      </div>
      <div>
        <LessonCard />
        <LessonCard />
        <LessonCard />
      </div>
    </div>
  );
};

export default Body;
