import React from 'react';
import {
  Alert,
  Col,
  Container,
  CardFooter,
  Form,
  FormGroup,
  Row,
  UncontrolledTooltip,
  Table,
  Card,
} from '@/components';
import { Button } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import ThemedButton from '@/components/ThemedButton';
import { HeaderMain } from '@/routes/components/HeaderMain';
import { Paginations } from '@/routes/components/Paginations';
import { programService, courseService } from '@/services';

import { useAppState } from '@/components/AppState';

import { ResponsivePie } from '@nivo/pie';

import styles from './DashboardNew.css';
import Loading from '@/components/Loading';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import { isMobileDevice } from 'responsive-react';

import { TinCanLaunch } from '@/helpers';

import CourseSelector from './components/CourseSelector';

// tabel

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
  const [coursesData, setCoursesData] = React.useState({ courses: [] });
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);

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

  //  tabel
  const [loading, setLoading] = React.useState(false);
  const [csvData, setCsvData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(10);
  const csvLink = React.useRef();
  const [tablePageId, setTablePageId] = React.useState(1);
  const [selectedSectionInPie, setSelectedSectionInPie] = React.useState(null);

  const [chartData, setChartData] = React.useState([
    {
      id: 'selectCourse',
      label: 'Select Course',
      value: 1,
      color: 'hsl(166, 70%, 50%)',
    },
  ]);

  let rowContent = React.useRef();

  React.useEffect(() => {
    setDeviceIsMobile(isMobileDevice());
    programService
      .getByCurrentUser(selectedOrganization.organizationId)
      .then((data) => {
        console.log('Programs data:', data);
        setPrograms(data);
      })
      .catch((err) => console.log('programService.getByCurrentUser', err));
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

        console.log('Courses data:', data);

        if (data) {
          setCoursesData(data);
        }
      } catch (err) {
        showAlertMessage({
          title: 'Error',
          message: err,
          type: 'danger',
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

        if (data) {
          let notStarted = data.allUsers - (data.completed + data.inProgress);
          setChartData([
            {
              id: 'notStarted',
              label: 'Not Started',
              value: notStarted,
              color: 'hsl(344, 70%, 50%)',
            },
            {
              id: 'completedUsers',
              label: 'Completed',
              value: data.completed,
              color: 'hsl(73, 70%, 50%)',
            },
            {
              id: 'inProgress',
              label: 'In Progress',
              value: data.inProgress,
              color: 'hsl(286, 70%, 50%)',
            },
          ]);
        }
      } catch (err) {
        showAlertMessage({
          title: 'Error',
          message: err,
          type: 'danger',
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
    } else setSelectedCourseId(null);
  };

  const handleLaunch = (course) => {
    console.log('Got course before launch:', course);
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
      'Typing:',
      ev.target.value,
      ev.target.value.length,
      ev.target.value == ' ',
      ev.key
    );

    if (ev.key === 'Enter' || ev.key === 'Space') {
      ev.preventDefault();
      ev.stopPropagation();

      setStartSearch(!startSearch);
    }
  };

  const fetchAttemptedUsersData = async (Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.attemptedUsers(
        selectedProgramId,
        selectedCourseId,
        Offset,
        10
      );
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  const fetchNotAttemptedUsersData = async (Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.notAttemptedUsers(
        selectedOrganization.organizationId,
        selectedProgramId,
        selectedCourseId,
        Offset,
        10
      );
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  const fetchCompletedUsersData = async (Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.completedUsers(
        selectedProgramId,
        selectedCourseId,
        Offset,
        10
      );
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  let paginationContent = null;
  if (totalNumberOfRecords > 0 && selectedSectionInPie != null) {
    paginationContent = (
      <CardFooter className="d-flex justify-content-center pb-0">
        <Paginations
          pageId={tablePageId}
          setPageId={(pageIdSelected) => {
            if (selectedSectionInPie == 'inProgress')
              fetchAttemptedUsersData((pageIdSelected - 1) * 10);
            if (selectedSectionInPie == 'notStarted')
              fetchNotAttemptedUsersData((pageIdSelected - 1) * 10);
            if (selectedSectionInPie == 'completedUsers')
              fetchCompletedUsersData((pageIdSelected - 1) * 10);
            if (
              ['inProgress', 'notStarted', 'completedUsers'].includes(
                selectedSectionInPie
              )
            )
              setTablePageId(pageIdSelected);
          }}
          totalNumber={totalNumberOfRecords}
          recordsPerPage={10}
        />
      </CardFooter>
    );
  }

  return (
    <Container className="courses-home">
      <HeaderMain title="Courses" subTitles="" />

      {showAlert && alertMessage && (
        <Alert color={alertMessage.type}>
          <h6 className="mb-1 alert-heading">{alertMessage.title}</h6>
          {alertMessage.message}
          <div className="mt-2">
            <Button color={alertMessage.type} onClick={dismissAlert}>
              {intl.formatMessage({ id: 'General.Dismiss' })}
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

      {isLoading && <Loading />}

      <CourseSelector />

      <div className="mb-3">
        <Col lg={12}>
          <div style={{ height: 400 }}>
            <ResponsivePie
              data={chartData}
              margin={{}}
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
              onClick={(e) => {
                setSelectedSectionInPie(e.id);
                setTotalNumberOfRecords(e.value);
                if (e.id == 'inProgress') fetchAttemptedUsersData();
                if (e.id == 'notStarted') fetchNotAttemptedUsersData();
                if (e.id == 'completedUsers') fetchCompletedUsersData();
              }}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: 'ruby',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'c',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'go',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'python',
                  },
                  id: 'dots',
                },
                {
                  match: {
                    id: 'scala',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'lisp',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'elixir',
                  },
                  id: 'lines',
                },
                {
                  match: {
                    id: 'javascript',
                  },
                  id: 'lines',
                },
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
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
          <Row>
            <Col lg={12}>
              <Card className="mb-3">
                {!loading && (
                  <Table className={styles.table} hover striped responsive>
                    <thead>
                      <tr>
                        <th
                          className="align-middle bt-0 text-center"
                          width="20%"
                        >
                          Name
                        </th>
                        <th className="align-middle bt-0 text-left" width="15%">
                          surname
                        </th>
                        <th className="align-middle bt-0 text-left" width="15%">
                          Email
                        </th>
                        <th className="align-middle bt-0 text-left" width="20%">
                          Gender
                        </th>
                        <th className="align-middle bt-0 text-left" width="20%">
                          total number of answers (correct and wrong)
                        </th>
                        <th
                          className="align-middle bt-0 text-center"
                          width="10%"
                        >
                          Number of incorrect answers
                        </th>
                        <th className="align-middle bt-0 text-right" width="5%">
                          Number of correct answers
                        </th>
                        <th
                          className="align-middle bt-0 text-center"
                          width="10%"
                        >
                          Number of points collected by user in course
                        </th>
                        <th
                          className="align-middle bt-0 text-center"
                          width="10%"
                        >
                          Phone Number
                        </th>
                        <th
                          className="align-middle bt-0 text-center"
                          width="10%"
                        >
                          Pager Number
                        </th>
                        <th
                          className="align-middle bt-0 text-center"
                          width="10%"
                        >
                          Start Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((user) => (
                          <tr>
                            <td className="align-middle bt-0">{user.name}</td>
                            <td className="align-middle bt-0">
                              {user.surname}
                            </td>
                            <td className="align-middle bt-0">{user.email}</td>
                            <td className="align-middle bt-0">{user.gender}</td>
                            <td className="align-middle bt-0">
                              {user.answers_count}
                            </td>
                            <td className="align-middle bt-0">
                              {user.response_fail_count}
                            </td>
                            <td className="align-middle bt-0">
                              {user.response_success_count}
                            </td>
                            <td className="align-middle bt-0">{user.scores}</td>
                            <td className="align-middle bt-0">
                              {user.phone_number}
                            </td>
                            <td className="align-middle bt-0">
                              {user.pager_number}
                            </td>
                            <td className="align-middle bt-0">
                              {user.start_date}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
                {loading && <Loading />}

                {/* END Table */}
                {paginationContent}
              </Card>
            </Col>
          </Row>
        </Col>
      </div>
    </Container>
  );
};

export default DashboardNew;
