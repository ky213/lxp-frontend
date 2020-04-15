import React, { Fragment, useState, useEffect } from "react";
import {
  Alert,
  Avatar,
  Col,
  Container,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Form,
  FormGroup,
  Row,
  UncontrolledTooltip,
  CardColumns
} from "@/components";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table
} from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import ThemedButton from "@/components/ThemedButton";
import { HeaderMain } from "@/routes/components/HeaderMain";
import {
  programService,
  courseService,
} from "@/services";

import { useAppState } from "@/components/AppState";

import styles from "./Courses.css";
import Loading from "@/components/Loading";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import {
  isMobileDevice,
  isTabletDevice,
  isLaptopDevice,
  isBiggerThanLaptop
} from "responsive-react";

import ContentMobile from "./components/ContentMobile";
import ContentDefault from "./components/ContentDefault";
import { CourseCard } from "./components/CourseCard";
import TinCan from 'tincanjs';
import config from '@/config';

const Courses = props => {
  const [{ currentUser, selectedInstitute }] = useAppState();
  const user = currentUser && currentUser.user;

  const [deviceIsMobile, setDeviceIsMobile] = React.useState(null);
  const [pageId, setPageId] = React.useState(null);

  const [programs, setPrograms] = React.useState([]);

  const [expLevels, setExpLevels] = React.useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = React.useState();
  const [selectedProgramId, setSelectedProgramId] = React.useState(null);
  const [coursesData, setCoursesData] = React.useState(null);
  const [rotationQualityData, setRotationQualityData] = React.useState(null);
  const [ttContent, setTtContent] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [subSpec, setSubSpec] = React.useState(null);

 

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [employeeNameFilter, setEmployeeNameFilter] = React.useState(null);
  const [expLevelIdFilter, setExpLevelIdFilter] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [displayFilterControls, setDisplayFilterControls] = React.useState(
    false
  );
  const [startSearch, setStartSearch] = React.useState(false);
  const [contentWidth, setContentWidth] = React.useState(null);

  let rowContent = React.useRef();
  var launchUrl = '';
  var activity;

  var parseXml;
  if (typeof window.DOMParser != "undefined") {
      parseXml = function(xmlStr) {
          return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
      };
  } else if (typeof window.ActiveXObject != "undefined" &&
        new window.ActiveXObject("Microsoft.XMLDOM")) {
      parseXml = function(xmlStr) {
          var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = "false";
          xmlDoc.loadXML(xmlStr);
          return xmlDoc;
      };
  } else {
      throw new Error("No XML parser found");
  }



  React.useEffect(() => {
    //resizeListener();
    setDeviceIsMobile(isMobileDevice());
    //window.addEventListener("resize", resizeListener);
    programService.getByCurrentUser(selectedInstitute.instituteId).then(data => {
      setPrograms(data);
    })
    .catch(err => console.log("programService.getByCurrentUser", err));
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
  }, [startSearch]);

  const resizeListener = () => {
    // console.log("##", rowContent.current.getBoundingClientRect());
    setContentWidth(window.innerWidth - rowContent.current.getBoundingClientRect().x);
    let x = isMobileDevice();
    setDeviceIsMobile(x);
    console.log("x", x);
  };

  const handleSearch = async () => {
    await loadCourses();
  };

  const loadCourses = async () => {
    setCoursesData(null);

    if (selectedProgramId) {
      setIsLoading(true);
      dismissAlert();

      try {
        const data = await courseService.getAll(selectedInstitute.instituteId, selectedProgramId)
        console.log("Get courses:", data);

        if (data) {
          setCoursesData(data);
        }
      }
      catch(err) {
        showAlertMessage({
          title: "Error",
          message: err,
          type: "danger"
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

  const onProgramChange = e => {
    if (e && e.length > 0) {
      let x = e[0].programId;
      setSelectedProgramId(x);
    } else setSelectedProgramId(null);
  };


  const sendStatement = () => {
    let lrs;

    try {
        lrs = new TinCan.LRS(
            {
                endpoint: config.apiUrl.replace('/api', '/xapi'),
                username: "test",
                password: "test",
                allowFail: false
            }
        );
    }
    catch (ex) {
        console.log('Failed to setup LRS object: ' + ex);
    }

    let statement = new TinCan.Statement(
        {
            id: TinCan.Utils.getUUID(),
            actor: getActor(),
            verb: {
                id: 'http://adlnet.gov/expapi/verbs/launched',
                display: {
                    en: 'launched'
                }
            },
            object: activity
        }
    );

    console.log(statement);
    lrs.saveStatement(
        statement,
        {
            callback: function (err, xhr) {
                if (err !== null) {
                    if (xhr !== null) {
                        console.log('Failed to save statement: ' + xhr.responseText + ' (' + xhr.status + ')');
                    }
                    console.log('Failed to save statement: ' + err);
                    alert('There was a problem communicating with the Learning Record Store. Your results may not be saved. Please check your internet connection and try again.');
                    return;
                }
                console.log("Statement saved");
            }
        }
    );
  }

  const readXML = (filename, callback) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/xml');
    xobj.open('GET', filename, true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
  } 

  const getTinCanXML = (course) => {
    const launchUrlBase = config.apiUrl + "/" + course.contentPath.replace('upload/', 'static/');

    console.log("xml url:", launchUrlBase + 'tincan.xml')
    return readXML(launchUrlBase + 'tincan.xml', function(data){
        var xmlActivity = parseXml(data).getElementsByTagName('activity')[0];
        var activityCfg = {
            id: xmlActivity.id,
            definition: {
                name: {},
                description: {}
            }
        }
        for (var i = xmlActivity.getElementsByTagName('name').length - 1; i >= 0; i--) {
            var name = xmlActivity.getElementsByTagName('name')[i];
            var nameLang = name.attributes.hasOwnProperty('lang') ? name.attributes.lang.nodeValue : 'en';
            if (name.childNodes.length > 0){
                activityCfg.definition.name[nameLang] = name.childNodes[0].nodeValue;
            }
        }
        for (var i = xmlActivity.getElementsByTagName('description').length - 1; i >= 0; i--) {
            var description = xmlActivity.getElementsByTagName('description')[i];
            var descLang = description.attributes.hasOwnProperty('lang') ? description.attributes.lang.nodeValue : 'en';
            if (description.childNodes.length > 0){
                activityCfg.definition.description[descLang] = description.childNodes[0].nodeValue;
            }
        }

        activity = new TinCan.Activity(activityCfg);
        launchUrl = launchUrlBase + xmlActivity.getElementsByTagName('launch')[0].childNodes[0].nodeValue;

        let launchLink = launchUrl;
        launchLink += '?endpoint=' + encodeURIComponent(config.apiUrl.replace('/api', '/xapi'));
        launchLink += '&auth=' + encodeURIComponent('Basic ' + TinCan.Utils.getBase64String("test" + ':' + "test"));

        launchLink += '&actor=' + encodeURIComponent(JSON.stringify(getActor().asVersion('1.0.0')));
        launchLink += '&registration=' + encodeURIComponent(TinCan.Utils.getUUID());

        launchLink += '&activity_id=' + encodeURIComponent(activity.id);

        sendStatement();
        window.open(launchLink);

        console.log("launch url:", launchUrl)
    });
}

  const getActor = () => {
      return new TinCan.Agent ({'name': user.fullName,'mbox': 'mailto:'+ user.email});
  }


  const handleLaunch = (course) => {
    getTinCanXML(course)
    console.log("Got course:", course)
    var launchLink = launchUrl;
    launchLink += '?endpoint=' + encodeURIComponent(config.endpoint);
    launchLink += '&auth=' + encodeURIComponent('Basic ' + TinCan.Utils.getBase64String(config.key + ':' + config.secret));

    launchLink += '&actor=' + encodeURIComponent(JSON.stringify(getActor().asVersion('1.0.0')));
    launchLink += '&registration=' + encodeURIComponent(TinCan.Utils.getUUID());

    launchLink += '&activity_id=' + encodeURIComponent(activity.id);

    sendStatement();
    window.open(launchLink);


  }

  const handleKeyDownSearch = ev => {
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
                Dismiss
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
                            programs.find(p => p.programId == selectedProgramId)
                          ]) ||
                        (programs && programs.length == 1 && [programs[0]]) ||
                        []
                      }
                      options={programs}
                      placeholder="Program..."
                      onChange={e => onProgramChange(e)}
                    />
                  </FormGroup>

                  {selectedProgramId && (
                    <React.Fragment>
                      <div className="align-right">
                        {(coursesData && (
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
                        ))} 
                        
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
                  width: `${contentWidth && contentWidth - 30}px` || "99%"
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
                              onChange={e =>
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
        
              <CardColumns>
                {coursesData && coursesData.length > 0 && coursesData.map(course => (
                  <CourseCard course={course} onLaunch={handleLaunch} />
                ))}
 
                </CardColumns>
              
          </>
        )}

        {/*rotationData && deviceIsMobile && (
          <Fragment>
            <Row>
              <Col lg={12}>
                {displayFilterControls && (
                  <React.Fragment>
                    <Form className={!deviceIsMobile ? "form-inline" : ""}>
                      <InputGroup>
                        <Input
                          onKeyDown={handleKeyDownSearch}
                          onChange={e => setEmployeeNameFilter(e.target.value)}
                          placeholder="Search for resident..."
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
                      <Input
                        type="select"
                        name="expLevel"
                        onChange={handleExpLevelIdFilter}
                        id="expLevel"
                        className="mr-2"
                      >
                        <option selected={!expLevelIdFilter} value={-1}>
                          All levels{" "}
                        </option>
                        {expLevels.map(x => {
                          return (
                            <option
                              selected={expLevelIdFilter == x.expLevelId}
                              value={x.expLevelId}
                            >
                              {x.name}
                            </option>
                          );
                        })}
                      </Input>
                    </Form>
                    <br />
                  </React.Fragment>
                )}
              </Col>
            </Row>

            <Row>
              <Col className="rotations-container">
                <ContentMobile
                  rotationData={rotationData}
                  toggleRotationDetails={toggleRotationDetails}
                />
              </Col>
            </Row>
          </Fragment>
        ) */}
      </Container>

      {/*
            <RotationDetailsModal
        subSpec={subSpec}
        modal={modal}
        courses={coursesData}
        toggleRotationDetails={toggleRotationDetails}
      />
      */}



    </React.Fragment>
  );
};

export default Courses;
