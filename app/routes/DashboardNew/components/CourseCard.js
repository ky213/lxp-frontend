import React from "react";

import {
  Card,
  Media,
  Avatar,
  AvatarAddOn,
  CardFooter,
  CardBody,
} from "@/components";

const status = ["danger", "success", "warning", "secondary"];

const CourseCard = ({ course, onLaunch, ...otherProps }) => {
  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <React.Fragment>
      {/* START Card */}
      <Card className="mb-3" onClick={() => onLaunch(course)}>
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
              <span className="h4 text-decoration-none" onClick={() => onLaunch(course)}>
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
                src={""}
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
              <div className="mt-0 d-flex text-inverse">{"Admin"}</div>
              <span>{"Role"}</span>
            </Media>
          </Media>
        </CardBody>
        <CardFooter className="bt-0">
          <span className="mr-3">
            <i className="fa fa-eye mr-1"></i>{" "}
            <span className="text-inverse">0</span>
          </span>
        </CardFooter>
      </Card>
      {/* END Card */}
    </React.Fragment>
  );
};

export { CourseCard };
