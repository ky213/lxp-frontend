import React, { useState } from "react";
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

import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar'

import styles from "./DashboardNew.css";
import Loading from "@/components/Loading";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { isMobileDevice } from "responsive-react";

import { CourseCard } from "./components/CourseCard";
import { TinCanLaunch } from "@/helpers";

const recordsPerPage = 20;

const DashboardNew = (props) => {
  const [{ currentUser, selectedOrganization }] = useAppState();
  const user = currentUser && currentUser.user;

  const [deviceIsMobile, setDeviceIsMobile] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);

  const [allUsers, setAllUsers] = React.useState(0);
  const [completedUsers, setCompletedUsers] = React.useState(0);
  const [inProgressUsers, setInProgressUsers] = React.useState(0);

  const [programs, setPrograms] = React.useState([]);

  const [selectedProgramId, setSelectedProgramId] = React.useState(null);
  const [coursesData, setCoursesData] = React.useState([]);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);
  const [selectedCourseName, setSelectedCourseName] = React.useState(null);

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

  const [chartData, setChartData] = React.useState(
    [{
      "id": "selectCourse",
      "label": "Select Course",
      "value": 1,
      "color": "hsl(166, 70%, 50%)"
    }]
  );

  // Progress Breakdown
  const [breakdownChartData, setBreakdownChartData] = React.useState(
    [{
      "id": "selectCourse",
      "label": "Select Course",
      "value": 1,
      "color": "hsl(166, 70%, 50%)"
    }]
  );

  const [ahmedChartsData, setAhmedChartsData] = useState([
    {
      "country": "Select Course",
      "Total Number of students": 1,
      "Total Number of studentsColor": "hsl(78, 70%, 50%)"
    }
  ])

  let rowContent = React.useRef();

  React.useEffect(() => {
    setDeviceIsMobile(isMobileDevice());
    programService
      .getByCurrentUser(selectedOrganization.organizationId)
      .then((data) => {
        console.log("Programs data:", data)
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
    if (selectedCourseId) {
      loadStudents();
      loadBreakDown();
    }
  }, [selectedCourseId]);

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
          selectedOrganization.organizationId,
          selectedProgramId,
          pageId,
          recordsPerPage,
          filter
        );

        console.log("Courses data:", data)

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


  const loadStudents = async () => {
    // setCoursesData(null);

    if (selectedCourseId) {
      setIsLoading(true);
      dismissAlert();

      try {
        const data = await courseService.getAllUsersJoinedCourse(
          selectedOrganization.organizationId,
          selectedProgramId,
          selectedCourseId
        );

        console.log("records data:", data)

        if (data) {
          setAhmedChartsData([{
            "country": selectedCourseName,
            "Total Number of students": data.allUsers,
            "Total Number of studentsColor": "hsl(78, 70%, 50%)"
          }])
          setChartData([
            {
              "id": "AllUsers",
              "label": "All Users",
              "value": data.allUsers,
              "color": "hsl(344, 70%, 50%)"
            },
            {
              "id": "completedUsers",
              "label": "Completed Users",
              "value": data.completed,
              "color": "hsl(73, 70%, 50%)"
            },
            {
              "id": "inProgress",
              "label": "In Progress",
              "value": data.inProgress,
              "color": "hsl(286, 70%, 50%)"
            }
          ])
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

  const loadBreakDown = async () => {
    // setCoursesData(null);

    if (selectedCourseId) {
      setIsLoading(true);
      dismissAlert();

      try {
        const data = await courseService.progressBreakdown(
          "ea5692e4-8598-4c3f-9465-7d6e8d6c0414"
        );

        console.log("records data:", data)
        const newData = {
          "totalBreakdownUsersCount": "5",
          "breakDownAnswersDistribution": [
            {
              "points": "1",
              "count": "3"
            },
            {
              "points": "2",
              "count": "1"
            },
            {
              "points": "3",
              "count": "1"
            }
          ]
        }
        if (newData) {
          if (newData.totalBreakdownUsersCount != "0")
            setBreakdownChartData([
              {
                "id": "Row 1",
                "label": "Row 1 of break Down Answers Distribution",
                "value": newData.breakDownAnswersDistribution[0].count,
                "color": "hsl(344, 70%, 50%)"
              },
              {
                "id": "Row 2",
                "label": "Row 2 of break Down Answers Distribution",
                "value": newData.breakDownAnswersDistribution[1].count,
                "color": "hsl(73, 70%, 50%)"
              },
              {
                "id": "Row 3",
                "label": "Row 3 of break Down Answers Distribution",
                "value": newData.breakDownAnswersDistribution[2].count,
                "color": "hsl(286, 70%, 50%)"
              }
            ]);
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

  const onCourseChange = (e) => {
    // console.log('dataaaa :', e[0].courseId)
    if (e && e.length > 0) {
      let x = e[0].courseId;
      setSelectedCourseId(e[0].courseId);
      setSelectedCourseName(e[0].name);
    } else setSelectedCourseId(null);
  };

  const handleLaunch = (course) => {
    console.log("Got course before launch:", course)
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
                  {coursesData && !deviceIsMobile && (
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Typeahead
                        clearButton
                        id="cources"
                        labelKey="name"
                        selected={
                          (selectedCourseId &&
                            coursesData.courses && [
                              coursesData.courses.find(
                                (p) => p.courseId == selectedCourseId
                              ),
                            ]) ||
                          (coursesData.courses && coursesData.courses.length == 1 && [coursesData.courses[0]]) ||
                          []
                        }
                        options={coursesData.courses}
                        placeholder="Cources..."
                        onChange={(e) => onCourseChange(e)}
                      />
                    </FormGroup>
                  )}

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
        <Row>
          <Col lg={6}>
            <div style={{ height: 400 }}>
              <ResponsivePie
                data={chartData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
                fill={[
                  {
                    match: {
                      id: 'ruby'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'c'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'go'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'python'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'scala'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'lisp'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'elixir'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'javascript'
                    },
                    id: 'lines'
                  }
                ]}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
            </div>

          </Col>


          <Col lg={6}>
            <div style={{ height: 400 }}>
              <ResponsivePie
                data={breakdownChartData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
                fill={[
                  {
                    match: {
                      id: 'ruby'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'c'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'go'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'python'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'scala'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'lisp'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'elixir'
                    },
                    id: 'lines'
                  },
                  {
                    match: {
                      id: 'javascript'
                    },
                    id: 'lines'
                  }
                ]}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    translateY: 56,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
            </div>

          </Col>
        </Row>



        <div className="mb-3">
          <Col lg={12}>
            <div style={{ height: 400 }}>
              <ResponsiveBar
                data={ahmedChartsData}
                keys={['Total Number of students']}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                defs={[
                  {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                  },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                  }
                ]}
                fill={[
                  {
                    match: {
                      id: 'fries'
                    },
                    id: 'dots'
                  },
                  {
                    match: {
                      id: 'sandwich'
                    },
                    id: 'lines'
                  }
                ]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Cources',
                  legendPosition: 'middle',
                  legendOffset: 32
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Numbers',
                  legendPosition: 'middle',
                  legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
              />
            </div>

          </Col>
        </div>


      </Container>
    </React.Fragment>
  );
};

export default DashboardNew;
