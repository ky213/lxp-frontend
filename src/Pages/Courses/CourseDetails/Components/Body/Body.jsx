import React from 'react';

import { NoDataPlaceholder } from 'Components';
import { LessonCard } from './Components';
import classes from './styles.module.css';
import LessonIcon from 'Assets/Icons/LessonIcon.svg';

const Body = props => {
  const { course } = props;

  return (
    <div className={classes.main}>
      <div className={classes.title}>
        <img src={LessonIcon} alt="" />
        <span>Lessons</span>
      </div>
      <div>
        {course?.lessons?.map(lesson => (
          <LessonCard lesson={lesson} key={lesson.lessonId} />
        ))}
        {course?.lessons?.length === 0 && <NoDataPlaceholder message="no lessons yet" />}
      </div>
    </div>
  );
};

export default Body;
