import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Button, PlusIcon, EditIcon, DeleteIcon } from 'Components';
import { AddEdit as AddLesson } from 'Pages/Lessons/AddEdit';
import CourseImage from 'Assets/Icons/course.svg';
import classes from './styles.module.css';

const Header = props => {
  const [addLesson, setAddLesson] = useState(false);
  const urlParams = useParams();

  const { course } = props;

  const handleSaveLesson = (name, file) => {
    setAddLesson(false);
  };

  const handleCloseLesson = () => {
    setAddLesson(false);
  };

  return (
    <div className={classes.header}>
      <AddLesson title="Add lesson" open={addLesson} handleSave={handleSaveLesson} handleClose={handleCloseLesson} />
      <div>
        <img src={CourseImage} alt="course_thumbnail" className={classes.thumbnail} />
      </div>
      <div className={classes.details}>
        <div className={classes.programName}>
          <span>{course?.programName}</span>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PlusIcon />}
            onClick={() => setAddLesson(true)}
          >
            Add lesson
          </Button>
        </div>
        <div className={classes.courseName}>{course?.name}</div>
        <div className={classes.courseDescription}>{course?.description || 'no description'}</div>
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
