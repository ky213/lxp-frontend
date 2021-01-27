import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Button, PlusIcon, EditIcon, DeleteIcon, Typography } from 'Components';
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
        <div className={classes.programName}>
          <span>Program name</span>
          <Button variant="contained" color="primary" size="small" startIcon={<PlusIcon />}>
            Add lesson
          </Button>
        </div>
        <div className={classes.courseName}>Course name</div>
        <div className={classes.courseDescription}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum quaerat atque dolores facilis ab facere
          quisquam adipisci reiciendis voluptas nulla!
        </div>
        <div className={classes.courseActions}>
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
