import React from "react";
import { HeaderMain } from "@/routes/components/HeaderMain";
import { Container, Button, Alert } from "@/components";
import { courseService } from "@/services";
import { Loading } from "@/components";
import { useAppState } from '@/components/AppState';

import CourseList from "./CourseList";
import EditCourse from "./EditCourse";

const Courses = () => {  
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  
  const [courses, setCourses] = React.useState(null);
  const [course, setCourse] = React.useState(null);  
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [editForm, setEditForm] = React.useState(false);
  

  React.useEffect(() => {
    getAllCourses();
  }, []);

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };


  const hideAlertMessage = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const getAllCourses = () => {
    setCourse(null);
    courseService.getAll(selectedInstitute.instituteId).then(data => {
      console.log('getAllCourses', data);
      setCourses(data);
    });
  }

  const handleCourseEdit = (e, courseId) => {
    e.preventDefault();
    hideAlertMessage();
    courseService.getById(courseId, selectedInstitute.instituteId).then(data => {
      setEditForm(true);
      setCourse(data);
    });
  }

  const addNewClick = () => {
    setEditForm(true);  
    setCourse(null);
  }

  const handleCancel = () => {
    hideAlertMessage();
    setEditForm(false);
    setCourse(null);
  };

  const editCourse = (courseData) => {
    courseService
      .update(courseData)
      .then(data => {
        setEditForm(false);
        setCourse(null);
        getAllCourses();
        showAlertMessage({
          title: "Success",
          message: "You have sucessfully updated an announcement",
          type: "success"
        });
      });
  }

  const insertCourse = (courseData) => {
    courseService
      .create(courseData)
      .then(courseId => {
        setEditForm(false);
        setCourse(null);
        getAllCourses();

        showAlertMessage({
          title: "Success",
          message: "You have sucessfully created announcement",
          type: "success"
        });

        return courseId;
      });
  }

  // refresh num of files after add/delete on Edit
  const updateCourseList = (fileNum) => {
    
    let x = courses.map(a => {
      if (a.announcementId == course.courseId)
        return {
          ...a, 
          fileNum
        }
      else
        return a;
    });
    setCourses(x);
  }

  return (
    <React.Fragment>
        <Container>
      {showAlert && alertMessage && (
        <Alert color={alertMessage.type}>
          <h6 className="mb-1 alert-heading">{alertMessage.title}</h6>
          {alertMessage.message}
          <div className="mt-2">
            <Button color={alertMessage.type} onClick={dismissAlert}>
              Dismiss
            </Button>
          </div>
        </Alert>
      )}

      {!editForm && (
        <React.Fragment>
            <HeaderMain title="Courses administration" />
            {(courses && (
              <CourseList
              courses={courses}
              handleCourseEdit={handleCourseEdit}
              addNewClick={addNewClick}
              getAllCourses={getAllCourses}
              />
            )) || <Loading />}
        </React.Fragment>
      )}
    
      {editForm && (
        <React.Fragment>
            <HeaderMain title="Announcement administration" />
            <EditCourse
              course={course}
              onCancel={handleCancel}
              editCourse={editCourse}
              insertCourse={insertCourse}
              showAlertMessage={showAlertMessage}
              hideAlertMessage={hideAlertMessage}
              updateCourseList={updateCourseList}
            />
        </React.Fragment>
      )}
      </Container>
    </React.Fragment>
  );
};

export default Courses;
