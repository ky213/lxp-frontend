import React from "react";
import {  
  Table
} from "reactstrap";
import moment from "moment";
import styled from "styled-components";

import styles from "../Courses.css";
import {
  CourseCard
} from "./CourseCard";

const ContentDefault = ({ courses, onLaunch }) => {

  return (
    <div key="ttContent" className={styles.rotationTimetable}>
      {courses && courses.length > 0 && courses.map(course => (
        <CourseCard course={course} onLaunch={onLaunch} />
      ))}
    </div>
  );
};

export default ContentDefault;
