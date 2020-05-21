import React from "react";
import { useIntl } from "react-intl";
import { HeaderMain } from "@/routes/components/HeaderMain";
import { Container, Button, Alert } from "@/components";
import { courseService } from "@/services";
import { Loading } from "@/components";
import { useAppState } from '@/components/AppState';

import CourseList from "./CourseList";
import EditCourse from "./EditCourse";

const recordsPerPage = 20;

const AdminCourses = () => {  
  const intl = useIntl();
  
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  
  const [courses, setCourses] = React.useState(null);
  const [course, setCourse] = React.useState(null);  
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [editForm, setEditForm] = React.useState(false);  
  const [pageId, setPageId] = React.useState(1);

  React.useEffect(() => {
    getAllCourses();
  }, []);

  React.useEffect(() => {
    getAllCourses();
  }, [pageId]);

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
    courseService.getAll(selectedInstitute.instituteId, null, pageId, recordsPerPage).then(data => {
      console.log('getAllCourses', data);
      setCourses(data);
    });
  }

  const handleCourseEdit = (e, courseId) => {
    console.log('handleCourseEdit', courseId);
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

  const finishEdit = () => {
    setEditForm(false);
    setCourse(null);
    getAllCourses();
    showAlertMessage({
      title: intl.formatMessage({ id: 'General.Success'}),
      message: "You have sucessfully updated the course",
      type: "success"
    });
  }

  const finishInsert = () => {
    setEditForm(false);
    setCourse(null);
    getAllCourses();

    showAlertMessage({
      title: intl.formatMessage({ id: 'General.Success'}),
      message: "You have sucessfully created a course",
      type: "success"
    });
  }

  // refresh num of files after add/delete on Edit
  const updateCourseList = (fileNum) => {
    
    let x = courses.courses.map(c => {
      if (c.course_id == course.courseId)
        return {
          ...c, 
          fileNum
        }
      else
        return c;
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
            {(courses && courses.courses && (
              <CourseList
              courses={courses.courses}
              handleCourseEdit={handleCourseEdit}
              addNewClick={addNewClick}
              getAllCourses={getAllCourses}
              showAlertMessage={showAlertMessage}
              pageId={pageId}
              setPageId={setPageId}
              recordsPerPage={recordsPerPage}
              totalNumberOfRecords={courses.totalNumberOfRecords}              
              />
            )) || <Loading />}
        </React.Fragment>
      )}
    
      {editForm && (
        <React.Fragment>
            <HeaderMain title="Course administration" />
            <EditCourse
              course={course}
              onCancel={handleCancel}
              finishEdit={finishEdit}
              finishInsert={finishInsert}
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

export default AdminCourses;
