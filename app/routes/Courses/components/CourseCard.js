import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { hot } from 'react-hot-loader'
import { toast } from 'react-toastify'
import { isNil } from 'lodash'
import html2pdf from 'html2pdf.js'

import {
  Card,
  Button,
  Media,
  Avatar,
  AvatarAddOn,
  CardFooter,
  CardBody,
  Progress,
} from '@/components'
import { courseService, userService } from '@/services'
import { useAppState } from '@/components/AppState'

let CourseCard = ({
  course,
  joinedCourses,
  onLaunch,
  isLearner,
  isSuperAdmin,
  ...otherProps
}) => {
  const [{ currentUser, selectedOrganization }] = useAppState()
  const [courseIsJoined, setCourseIsJoined] = useState(
    joinedCourses.includes(course.courseId)
  )

  const createMarkup = html => {
    return { __html: html }
  }

  const location = useLocation()

  const handleJoinCourse = () => {
    if (!courseIsJoined)
      courseService
        .joinCourse(course.courseId)
        .then(() => {
          setCourseIsJoined(true)
        })
        .catch(error => {
          toast.error(
            <div>
              <h4 className="text-danger">Error</h4>
              <p>{JSON.stringify(error)}</p>
            </div>
          )
        })
  }

  const downloadCertificate = async () => {
    try {
      const { htmlBody } = await userService.downloadCertificateAsPDF(
        selectedOrganization.organizationId,
        course.courseId,
        currentUser.user.userId
      )
      if (htmlBody)
        html2pdf()
          .set({
            margin: 1,
            filename: `${course.name}-certificate.pdf`,
            // jsPDF: { orientation: 'landscape' },
          })
          .from(htmlBody)
          .save()
    } catch (error) {
      toast.error(
        <div>
          <h4 className="text-danger">Error</h4>
          <p>{error.message}</p>
        </div>
      )
    }
  }

  return (
    <Card className="mb-3">
      <div className="cardWrapper">
        <div
          className="courseLogo"
          title="Launch course"
          style={{
            backgroundImage: `url(${course.image})`,
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
      <CardBody>
        <div className="mt-3 mb-2">
          <div className="mb-2">
            <span className="h4 text-decoration-none">{course.name}</span>
            {!isSuperAdmin && (
              <Button
                color="primary"
                title="Launch course"
                className="pull-right"
                onClick={() => {
                  if (isLearner && !courseIsJoined) {
                    alert('You have to join the course first')
                    return
                  }
                  onLaunch(course)
                }}
              >
                Launch
              </Button>
            )}
            <p>
              <small>{course.courseCode}</small>
            </p>
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
          {/* <Media body>
            <div className="mt-0 d-flex text-inverse">{'Admin'}</div>
            <span>{'Role'}</span>
          </Media> */}
        </Media>
        {!isNil(course?.courseProgress) && (
          <>
            <div className="text-right">
              {course.isCompleted
                ? '100'
                : Math.floor(course.courseProgress * 100)}
              %
            </div>
            <Progress
              value={course.isCompleted ? 100 : course.courseProgress * 100}
              color={
                course.courseProgress >= 1 || course.isCompleted
                  ? 'success'
                  : ''
              }
              max={100}
              slim
            />
          </>
        )}
      </CardBody>
      <CardFooter className="bt-0 d-flex justify-content-between">
        <span className="">
          {location.pathname === '/courses' && (
            <>
              <i className="fa fa-eye mr-1"></i>
              <span className="text-inverse">
                {course.NumofUsersInProgress}
              </span>
            </>
          )}
          {course.isCompleted && (
            <a href="#" onClick={downloadCertificate}>
              Download certificate
            </a>
          )}
        </span>
        {isLearner && (
          <>
            <Button
              color={courseIsJoined ? 'success' : 'primary'}
              onClick={handleJoinCourse}
              disabled={courseIsJoined}
            >
              {courseIsJoined ? 'Joined' : 'Join Course'}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

CourseCard = hot(module)(CourseCard)

export { CourseCard }
