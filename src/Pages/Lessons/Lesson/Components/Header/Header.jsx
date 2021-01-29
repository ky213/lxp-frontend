import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Button, EditIcon, DeleteIcon } from 'Components';
import CourseImage from 'Assets/Icons/course.svg';
import classes from './styles.module.css';

const Header = props => {
  const urlParams = useParams();

  const { course } = props;

  return (
    <div className={classes.header}>
      <div>
        <img src={CourseImage} alt="course_thumbnail" className={classes.thumbnail} />
      </div>
      <div className={classes.details}>
        <div className={classes.courseName}>
          <span>Course name</span>
        </div>
        <div className={classes.status}>
          <p className={classes.number}>Lesson 01</p>
          <p className={classes.separator}></p>
          <p className={classes.badge}>in progress</p>
        </div>
        <div className={classes.lessonName}>Lesson name</div>
        <div className={classes.lessonActions}>
          <div>
            <NavLink to={`/courses/edit/${urlParams.courseId}`}>
              <Button className={classes.actionButton} size="small" startIcon={<EditIcon />}>
                <span>Edit</span>
              </Button>
            </NavLink>
          </div>
          <div>
            <Button className={classes.actionButton} size="small" startIcon={<DeleteIcon color="error" />}>
              <span style={{ color: '#C70000' }}>Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
