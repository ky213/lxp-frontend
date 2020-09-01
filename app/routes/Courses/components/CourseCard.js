import React, { useState } from 'react';
import {
  Card,
  Button,
  Media,
  Avatar,
  AvatarAddOn,
  CardFooter,
  CardBody,
} from '@/components';
import { courseService } from '@/services';

const status = ['danger', 'success', 'warning', 'secondary'];

const CourseCard = ({ course, joinedCourses, onLaunch, ...otherProps }) => {
  const [courseIsJoined, setCourseIsJoined] = useState(
    joinedCourses.includes(course.courseId)
  );

  const createMarkup = (html) => {
    return { __html: html };
  };

  const handleJoinCourse = () => {
    if (!courseIsJoined)
      courseService
        .joinCourse(course.courseId)
        .then(() => {
          setCourseIsJoined(true);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <Card
      className="mb-3"
      onClick={() => {
        /*onLaunch(course)*/
      }}
    >
      <div className="cardWrapper">
        <div
          className="courseLogo"
          title="Launch course"
          style={{ backgroundImage: `url(${course.image})` }}
        ></div>
      </div>
      <CardBody>
        <div className="mt-3 mb-2">
          <div className="mb-2">
            <span
              className="h4 text-decoration-none"
              onClick={() => onLaunch(course)}
            >
              {course.name}
            </span>
            <a
              href="#"
              title="Launch course"
              className="pull-right"
              onClick={() => onLaunch(course)}
            >
              <i className="fa fa-external-link"></i>
            </a>
          </div>
          <div
            className="courseDescription"
            dangerouslySetInnerHTML={createMarkup(course.description)}
          ></div>
        </div>
        <Media className="mb-2">
          <Media left className="align-self-center mr-3">
            <Avatar.Image
              size="md"
              src={''}
              addOns={[
                <AvatarAddOn.Icon
                  className="fa fa-circle"
                  color="white"
                  key="avatar-icon-bg"
                />,
              ]}
            />
          </Media>
          <Media body>
            <div className="mt-0 d-flex text-inverse">{'Admin'}</div>
            <span>{'Role'}</span>
          </Media>
        </Media>
      </CardBody>
      <CardFooter className="bt-0 d-flex justify-content-between">
        <span className="mr-3">
          <i className="fa fa-eye mr-1"></i>
          <span className="text-inverse">0</span>
        </span>
        <Button
          color={courseIsJoined ? 'success' : 'primary'}
          onClick={handleJoinCourse}
        >
          {courseIsJoined ? 'Joined' : 'Join Course'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export { CourseCard };
