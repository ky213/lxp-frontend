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

import {
  ListGroup,
  ListGroupItem,
} from '@/components'

const ContentDefault = ({ courses, onLaunch }) => {

  return (
    <>
      {courses && courses.length > 0 && courses.map(course => (
        <CourseCard course={course} onLaunch={onLaunch} />
      ))}
    </>
  );
};

export default ContentDefault;
