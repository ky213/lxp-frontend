import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, EditIcon, DeleteIcon } from 'Components';
import { AddEdit as EditLesson } from 'Pages/Lessons/AddEdit';
import CourseImage from 'Assets/Icons/course.svg';
import classes from './styles.module.css';

const Header = props => {
  const [editLesson, setEditLesson] = useState(false);
  const urlParams = useParams();

  const { lesson } = props;

  const handleSaveLesson = (name, file) => {
    setEditLesson(false);
  };

  const handleCloseLesson = () => {
    setEditLesson(false);
  };

  return (
    <div className={classes.header}>
      <EditLesson
        title="Edit lesson"
        lesson={lesson}
        open={editLesson}
        handleSave={handleSaveLesson}
        handleClose={handleCloseLesson}
      />
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
            <Button
              className={classes.actionButton}
              size="small"
              startIcon={<EditIcon />}
              onClick={() => setEditLesson(true)}
            >
              <span>Edit</span>
            </Button>
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
