import React from "react";
import {
  Alert,
  Col,
  Container,
  CardBody,
  CardFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  Form,
  FormGroup,
  Row,
  UncontrolledTooltip,
  CardColumns,
} from "@/components";
import { Button } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import ThemedButton from "@/components/ThemedButton";
import { HeaderMain } from "@/routes/components/HeaderMain";
import { Paginations } from "@/routes/components/Paginations";
import { programService, courseService } from "@/services";

import { useAppState } from "@/components/AppState";

import styles from "./Courses.css";
import Loading from "@/components/Loading";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { isMobileDevice } from "responsive-react";

import { CourseCard } from "./components/CourseCard";
import { TinCanLaunch } from "@/helpers";

const recordsPerPage = 20;

const Courses = (props) => {
  const [{ currentUser, selectedInstitute }] = useAppState();
  const user = currentUser && currentUser.user;

  const [deviceIsMobile, setDeviceIsMobile] = React.useState(null);
  const [pageId, setPageId] = React.useState(null);

  const [programs, setPrograms] = React.useState([]);

  const [selectedProgramId, setSelectedProgramId] = React.useState(null);
  const [coursesData, setCoursesData] = React.useState(null);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [employeeNameFilter, setEmployeeNameFilter] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayFilterControls, setDisplayFilterControls] = React.useState(
    false
  );
  const [filter, setFilter] = React.useState(null);
  const [startSearch, setStartSearch] = React.useState(false);
  const [contentWidth, setContentWidth] = React.useState(null);

  let rowContent = React.useRef();

  React.useEffect(() => {
    setDeviceIsMobile(isMobileDevice());
    programService
      .getByCurrentUser(selectedInstitute.instituteId)
      .then((data) => {
        setPrograms(data);
      })
      .catch((err) => console.log("programService.getByCurrentUser", err));
  }, []);

  React.useEffect(() => {
    if (programs && programs.length == 1)
      setSelectedProgramId(programs[0].programId);
    else setSelectedProgramId(null);
  }, [programs]);

  React.useEffect(() => {
    setShowAlert(alertMessage ? true : false);
  }, [alertMessage]);

  React.useEffect(() => {
    if (selectedProgramId) {
      loadCourses();
    } else {
      setCoursesData(null);
    }
  }, [selectedProgramId]);

  React.useEffect(() => {
    loadCourses();
  }, [startSearch, pageId]);

  const handleSearch = async () => {
    await loadCourses();
  };

  const loadCourses = async () => {
    setCoursesData(null);

    if (selectedProgramId) {
      setIsLoading(true);
      dismissAlert();

      try {
        const data = await courseService.getAll(
          selectedInstitute.instituteId,
          selectedProgramId,
          pageId,
          recordsPerPage,
          filter
        );

        if (data) {
          setCoursesData(data);
        }
      } catch (err) {
        showAlertMessage({
          title: "Error",
          message: err,
          type: "danger",
        });
      }

      setIsLoading(false);
    }
  };

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  const onProgramChange = (e) => {
    if (e && e.length > 0) {
      let x = e[0].programId;
      setSelectedProgramId(x);
    } else setSelectedProgramId(null);
  };

  const handleLaunch = (course) => {
    TinCanLaunch.launchContent(
      user,
      selectedProgramId,
      course,
      (launchLink) => {
        window.open(launchLink);
      }
    );
  };

  const handleKeyDownSearch = (ev) => {
    console.log(
      "Typing:",
      ev.target.value,
      ev.target.value.length,
      ev.target.value == " ",
      ev.key
    );

    if (ev.key === "Enter" || ev.key === "Space") {
      ev.preventDefault();
      ev.stopPropagation();

      setStartSearch(!startSearch);
    }
  };

  return (
    <React.Fragment>
      <Container className="courses-home">
        <HeaderMain title="Courses" subTitles="" />

        {showAlert && alertMessage && (
          <Alert color={alertMessage.type}>
            <h6 className="mb-1 alert-heading">{alertMessage.title}</h6>
            {alertMessage.message}
            <div className="mt-2">
              <Button color={alertMessage.type} onClick={dismissAlert}>
                {intl.formatMessage({ id: "General.Dismiss" })}
              </Button>
            </div>
          </Alert>
        )}

        <Row>
          <Col lg={12}>
            <HeaderDemo
              title="View courses"
              subTitle="You can view and take courses from here."
            />
          </Col>
        </Row>

        <div className="mb-3">
          <div className={styles.cardBody} ref={rowContent}>
            <Row>
              <Col lg={12}>
                <Form className={!deviceIsMobile ? "form-inline" : ""}>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Typeahead
                      clearButton
                      id="programs"
                      labelKey="name"
                      selected={
                        (selectedProgramId &&
                          programs && [
                            programs.find(
                              (p) => p.programId == selectedProgramId
                            ),
                          ]) ||
                        (programs && programs.length == 1 && [programs[0]]) ||
                        []
                      }
                      options={programs}
                      placeholder="Program..."
                      onChange={(e) => onProgramChange(e)}
                    />
                  </FormGroup>

                  {selectedProgramId && (
                    <React.Fragment>
                      <div className="align-right">
                        {coursesData && (
                          <React.Fragment>
                            <ThemedButton
                              id="btnRefresh"
                              type="button"
                              onClick={loadCourses}
                              className={deviceIsMobile ? "btn-block" : ""}
                            >
                              Search
                            </ThemedButton>
                            <UncontrolledTooltip
                              placement="bottom"
                              target="btnRefresh"
                            >
                              Search courses
                            </UncontrolledTooltip>
                          </React.Fragment>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </Form>
              </Col>
            </Row>
          </div>
        </div>

        {isLoading && <Loading />}

        {coursesData && !deviceIsMobile && (
          <>
            <CardBody
              style={{
                width: `${contentWidth && contentWidth - 30}px` || "99%",
              }}
            >
              <Row>
                <Col lg={12}>
                  {displayFilterControls && (
                    <React.Fragment>
                      <Form className={!deviceIsMobile ? "form-inline" : ""}>
                        <InputGroup>
                          <Input
                            onKeyDown={handleKeyDownSearch}
                            onChange={(e) =>
                              setEmployeeNameFilter(e.target.value)
                            }
                            placeholder="Search for course..."
                            defaultValue={employeeNameFilter}
                          />
                          <InputGroupAddon addonType="append">
                            <Button
                              color="secondary"
                              outline
                              onClick={handleSearch}
                            >
                              <i className="fa fa-search"></i>
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                        &nbsp;
                      </Form>
                      <br />
                    </React.Fragment>
                  )}
                </Col>
              </Row>
            </CardBody>

            {coursesData &&
              coursesData.courses &&
              coursesData.courses.length > 0 && (
                <React.Fragment>
                  <CardColumns>
                    {coursesData.courses.map((course) => (
                      <CourseCard course={course} onLaunch={handleLaunch} />
                    ))}
                  </CardColumns>
                  <CardFooter className="d-flex justify-content-center pb-0">
                    <Paginations
                      pageId={pageId}
                      setPageId={setPageId}
                      totalNumber={coursesData.totalNumberOfRecords}
                      recordsPerPage={recordsPerPage}
                    />
                  </CardFooter>
                </React.Fragment>
              )}
          </>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Courses;
