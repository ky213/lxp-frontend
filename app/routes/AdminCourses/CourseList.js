import React from "react";
import moment from "moment";
import {
  ButtonGroup,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CustomInput,
  Table,
  UncontrolledTooltip
} from "@/components";
import ThemedButton from "@/components/ThemedButton";
import { courseService } from "@/services";
import { useAppState } from '@/components/AppState';

const CourseList = ({
  courses,
  handleCourseEdit,
  addNewClick,
  getAllCourses,
  showAlertMessage
}) => {
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const [selectedCourses, setSelectedCourses] = React.useState([]);

  const onSelected = (courseId, e) => {
    if(e.target.checked) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
    else {
      setSelectedCourses(selectedCourses.filter(c => c != courseId));
    }
  }

  const onDelete = async () => {
    const message = selectedCourses.length == 1 ? "this course" : "these courses";
    if(confirm(`Are you sure you want to delete ${message}?`)) {
        try {
            await courseService.deleteCourses(selectedCourses, selectedInstitute.instituteId);
            getAllCourses();
            setSelectedCourses([]);
            showAlertMessage({
              title: "Success",
              message: "You have sucessfully deleted the courses",
              type: "success"
            });
        }
        catch(error) {
            console.log("Error while deleting courses:", error);
            alert(`Something went wrong while deleting ${message}!`)
        }
    }
  }
  
  return (
    <React.Fragment>
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <ThemedButton
                className="pull-right"
                onClick={addNewClick}
                id="tooltipAddNew"
              >
                <i className="fa fa-fw fa-pencil"></i>
              </ThemedButton>
              <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                Add New Course
              </UncontrolledTooltip>
              
              {selectedCourses && selectedCourses.length > 0 && (
                <ButtonGroup className="mr-2 pull-right">
                    <Button color="link" onClick={onDelete} className="text-decoration-none align-self-center" id="tooltipDelete">
                        <i className="fa fa-fw fa-trash"></i>
                    </Button>
                    <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                        Delete
                    </UncontrolledTooltip>
                </ButtonGroup>
              )}
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col>
              {courses && courses.length > 0 && (
                <Table className="mb-0" hover responsive>
                  <thead>
                    <tr>
                      <th className="bt-0"></th>
                      <th className="bt-0"></th>
                      <th className="bt-0">Name</th>
                      <th className="bt-0">Program name</th>
                      <th className="bt-0 text-center">Starting date</th>
                      <th className="bt-0 text-center">Period days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(item => {
                      return (
                        <tr key={item.courseId}>
                          <td>
                            <CustomInput
                              type="checkbox"
                              onClick={e =>
                                onSelected(item.courseId, e)
                              }
                              id={`CourseCheckbox-${item.courseId}`}
                            />
                          </td>
                          <td>
                            <a
                              href="#"
                              onClick={e =>
                                handleCourseEdit(e, item.courseId)
                              }
                            >
                              <i className="fa fa-fw fa-pencil mr-2"></i>
                              Edit
                            </a>
                          </td>
                          <td className="">{item.name}</td>
                          <td className="">{item.programName}</td>
                          <td className="text-center">{item.startingDate && moment(item.startingDate).format("L")}</td>
                          <td className="text-center">{item.periodDays}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}

              {!courses ||
                (courses.length == 0 && (
                  <React.Fragment>No courses yet</React.Fragment>
                ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default CourseList;
