import React from "react";
import { useIntl } from "react-intl";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import moment from "moment";
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";
import { Typeahead } from "react-bootstrap-typeahead";

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  FormGroup,
  Label,
  Loading
} from "@/components";
import { announcementService, expLevelService, programService, roleService } from "@/services";
import { Consumer } from "@/components/Theme/ThemeContext";
import FileList from "./FileList";
import { useAppState } from '@/components/AppState';

const EditAnnouncements = ({ announcement, onCancel, editAnnouncement, createAnnouncement,
showAlertMessage, updateAnnouncementInList }) => {
  const intl = useIntl();
  
  const [{selectedOrganization}] = useAppState();

  const [files, setFiles] = React.useState([]);
  const [programs, setPrograms] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [expLevels, setExpLevels] = React.useState([]);
  const [dutyDateFrom, setDutyDateFrom] = React.useState(null);
  const [dutyDateTo, setDutyDateTo] = React.useState(null);

  const [programsLoaded, setProgramsLoaded] = React.useState(false);
  const [expLevelsLoaded, setExpLevelsLoaded] = React.useState(false);
  const [rolesLoaded, setRolesLoaded] = React.useState(false);
  const [formLoaded, setFormLoaded] = React.useState(false);

  React.useEffect(() => {
    programService.getByCurrentUser(selectedOrganization.organizationId).then(data => {
      setPrograms(data);
      setProgramsLoaded(true);
    });
    roleService.getAll().then(data => {
      setRoles(data);
      setExpLevelsLoaded(true);
    });
    expLevelService.getAll().then(data => {
      setExpLevels(data);
      setRolesLoaded(true);
    });
  }, []);

  React.useEffect(() => {
    if (programsLoaded && expLevelsLoaded && rolesLoaded) setFormLoaded(true);
  }, [programsLoaded, expLevelsLoaded, rolesLoaded]);

  React.useEffect(() => {
    console.log('files', files);
  }, [files]);

  React.useEffect(() => {
    if (announcement)
    {
      if (announcement.dateFrom) {
        setDutyDateFrom(moment(announcement.dateFrom).toDate());
      }

      if (announcement.dateTo) {
        setDutyDateTo(moment(announcement.dateTo).toDate());
      }

      setFiles(announcement.files);
    } 
  }, [announcement]);

  const cancel = () => {
    onCancel();
  };

  const uploadFile = (file) => {    
    announcementService.addFile(file)
      .then((announcementFileId) => {
        updateAnnouncementInList(files.length + 1);
        file = {...file, announcementFileId: announcementFileId, status: 'uploaded'};
        setFiles(z => z.map(f => {
          if (f.name != file.name)
            return f;
          
          return file;
        }));
        showAlertMessage({
          title: intl.formatMessage({ id: 'General.Success'}),
          message: intl.formatMessage({ id: 'File.FileUploadSuccess'}),
          type: "success"
        });
      })
      .catch((error) => {
        file = {...file, status: 'error'};
        setFiles(z => z.map(f => {
          if (f.name != file.name)
            return f;
          
          return file;
        }));
        showAlertMessage({
          title: intl.formatMessage({ id: 'General.Error'}),
          message: intl.formatMessage({ id: 'File.FileUploadError'}),
          type: "danger"
        });
      });
  }

  const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ed1c24;
  `;

  const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['clean']
    ],
  }

  const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent'
  ]

  return (
    (formLoaded && (
      <Consumer>
        {themeState => (
          <Formik
            {...themeState}
            enableReinitialize={true}
            initialValues={{
              title: (announcement && announcement.title) || "",
              text: (announcement && announcement.text) || "",
              programs: (announcement && announcement.programs) || [],
              roles: (announcement && announcement.roles) || [],
              expLevels: (announcement && announcement.expLevels) || [],
              isActive: (announcement && announcement.isActive) || false
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required(intl.formatMessage({ id: 'AdminAnnouncements.TitleRequired'})),
              text: Yup.string().required(intl.formatMessage({ id: 'AdminAnnouncements.TextRequired'}))
            })}
            onSubmit={(
              { title, text, programs, roles, expLevels, isActive },
              { setStatus, setSubmitting }
            ) => {
              console.log(title, text, programs, roles, expLevels, isActive, dutyDateFrom, dutyDateTo);
              let a = {
                title,
                text,
                programs: programs.map(t => t.programId),
                roles: roles.map(t => t.role_id),
                expLevels: expLevels.map(t => t.expLevelId),
                isActive,
                dateFrom: dutyDateFrom && moment(dutyDateFrom).format() || null,
                dateTo: dutyDateTo && moment(dutyDateTo).format() || null,
                organizationId: selectedOrganization.organizationId
              };

              if (announcement) {
                a = { ...a, announcementId: announcement.announcementId };
                editAnnouncement(a);
              } else {
                createAnnouncement(a);
              }
            }}
          >
            {props => {
              return (
                <React.Fragment>
                  <Row>
                    <Col lg={12}>
                      <Card className="mb-3">
                        <CardBody>
                          {/* START Form */}
                          <Form onSubmit={props.handleSubmit}>
                            {/* START Input */}
                            <FormGroup row>
                              <Label for="title" sm={3}>
                              {intl.formatMessage({ id: 'General.Title'})}
                              </Label>
                              <Col sm={9}>
                                <Field
                                  type="text"
                                  name="title"
                                  id="title"
                                  className={
                                    "bg-white form-control" +
                                    (props.errors.title && props.touched.title
                                      ? " is-invalid"
                                      : "")
                                  }
                                  placeholder={intl.formatMessage({ id: 'General.TitlePlaceholder'})}
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="ann" sm={3}>
                              {intl.formatMessage({ id: 'General.Text'})}
                              </Label>
                              <Col sm={9}>
                                <ReactQuill
                                  value={props.values.text}
                                  name="text"
                                  onChange={ x => props.setFieldValue(
                                    "text",
                                    x
                                  )}
                                  modules={modules}
                                  formats={formats}
                                  className={
                                    "bg-white form-control" +
                                    (props.errors.text && props.touched.text
                                      ? " is-invalid"
                                      : "")
                                  }
                                  placeholder={intl.formatMessage({ id: 'General.TextPlaceholder'})}
                                  style={{
                                    minHeight: "180px"
                                  }}
                                />
                                <ErrorMessage
                                  name="text"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="period" sm={3}>
                              {intl.formatMessage({ id: 'AdminAnnouncements.AvailableInPeriod'})}
                              </Label>
                              <Col sm={4}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <i className="fa fa-fw fa-calendar"></i>
                                    {intl.formatMessage({ id: 'General.From'})}
                                  </InputGroupAddon>
                                  <DatePicker
                                    id="dateFrom"
                                    name="dateFrom"
                                    showMonthDropdown
                                    showYearDropdown
                                    autoComplete="off"
                                    className={
                                      "bg-white form-control zIndex100" +
                                      (props.errors.dateFrom &&
                                      props.touched.dateFrom
                                        ? " is-invalid"
                                        : "")
                                    }
                                    selected={dutyDateFrom}
                                    showMonthDropdown
                                    showYearDropdown
                                    onChange={date => {
                                      setDutyDateFrom(date);
                                    }}
                                  />
                                  {props.errors.dateFrom &&
                                    props.touched.dateFrom && (
                                      <InvalidFeedback>
                                        {props.errors.dateFrom}
                                      </InvalidFeedback>
                                    )}
                                </InputGroup>
                              </Col>
                              <Col sm={4}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <i className="fa fa-fw fa-calendar"></i>
                                    {intl.formatMessage({ id: 'General.To'})}
                                  </InputGroupAddon>
                                  <DatePicker
                                    id="dateTo"
                                    autoComplete="off"
                                    name="dateTo"
                                    showMonthDropdown
                                    showYearDropdown
                                    className={
                                      "bg-white form-control zIndex100" +
                                      (props.errors.dateTo &&
                                      props.touched.dateTo
                                        ? " is-invalid"
                                        : "")
                                    }
                                    selected={dutyDateTo}
                                    showMonthDropdown
                                    showYearDropdown
                                    onChange={date => setDutyDateTo(date)}
                                  />
                                  {props.errors.dateTo &&
                                    props.touched.dateTo && (
                                      <InvalidFeedback>
                                        {props.errors.dateTo}
                                      </InvalidFeedback>
                                    )}
                                </InputGroup>
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="programs" sm={3}>
                              {intl.formatMessage({ id: 'General.Program'})}
                              </Label>
                              <Col sm={9}>
                                <Typeahead
                                  clearButton
                                  id="programs"
                                  selected={props.values.programs}
                                  labelKey="name"
                                  multiple
                                  className={
                                    props.errors.programs &&
                                    props.touched.programs
                                      ? " is-invalid"
                                      : ""
                                  }
                                  options={programs}
                                  placeholder={intl.formatMessage({ id: 'General.ProgramPlaceholder'})}
                                  onChange={selectedOptions =>
                                    props.setFieldValue(
                                      "programs",
                                      selectedOptions
                                    )
                                  }
                                  onInputChange={selectedOptions =>
                                    props.setFieldValue(
                                      "programs",
                                      selectedOptions
                                    )
                                  }
                                />
                                {props.errors.programs && (
                                  <InvalidFeedback>
                                    {props.errors.programs}
                                  </InvalidFeedback>
                                )}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="expLevel" sm={3}>
                              {intl.formatMessage({ id: 'General.ExpLevel'})}
                              </Label>
                              <Col sm={9}>
                                <Typeahead
                                  clearButton
                                  id="expLevel"
                                  selected={props.values.expLevels}
                                  labelKey="name"
                                  multiple
                                  className={
                                    props.errors.expLevels &&
                                    props.touched.expLevels
                                      ? " is-invalid"
                                      : ""
                                  }
                                  options={expLevels}
                                  placeholder={intl.formatMessage({ id: 'General.ExpLevelPlaceholder'})}
                                  onChange={selectedOptions =>
                                    props.setFieldValue(
                                      "expLevels",
                                      selectedOptions
                                    )
                                  }
                                  onInputChange={selectedOptions =>
                                    props.setFieldValue(
                                      "expLevels",
                                      selectedOptions
                                    )
                                  }
                                />
                                {props.errors.expLevels && (
                                  <InvalidFeedback>
                                    {props.errors.expLevels}
                                  </InvalidFeedback>
                                )}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="roles" sm={3}>
                              {intl.formatMessage({ id: 'General.Role'})}
                              </Label>
                              <Col sm={9}>
                                <Typeahead
                                  clearButton
                                  id="roles"
                                  name="roles"
                                  selected={props.values.roles}
                                  labelKey="name"
                                  multiple
                                  className={
                                    props.errors.roles && props.touched.roles
                                      ? " is-invalid"
                                      : ""
                                  }
                                  options={roles}
                                  placeholder={intl.formatMessage({ id: 'General.RolePlaceholder'})}
                                  onChange={selectedOptions =>
                                    props.setFieldValue(
                                      "roles",
                                      selectedOptions
                                    )
                                  }
                                  onInputChange={selectedOptions =>
                                    props.setFieldValue(
                                      "roles",
                                      selectedOptions
                                    )
                                  }
                                />
                                {props.errors.roles && (
                                  <InvalidFeedback>
                                    {props.errors.roles}
                                  </InvalidFeedback>
                                )}
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="email" sm={3}>
                              {intl.formatMessage({ id: 'General.Status'})}
                              </Label>
                              <Col sm={9}>
                                <CustomInput
                                  inline
                                  type="radio"
                                  id="isActive"
                                  name="announcementStatus"
                                  label="Active"
                                  checked={props.values.isActive}
                                  value={true}
                                  onChange={event => {
                                    console.log("a", event.target.value);
                                    props.setFieldValue("isActive", true);
                                  }}
                                />
                                <CustomInput
                                  inline
                                  type="radio"
                                  id="isInactive"
                                  name="announcementStatus"
                                  label="Inactive"
                                  value={false}
                                  checked={!props.values.isActive}
                                  onChange={event => {
                                    console.log("b", event.target.value);
                                    props.setFieldValue("isActive", false);
                                  }}
                                />{" "}
                              </Col>
                            </FormGroup>

                            <Row>
                              <Col sm={3} />
                              <Col sm={9}>
                                <FileList
                                  announcement={announcement}
                                  files={files}
                                  setFiles={setFiles}
                                  uploadFile={uploadFile}
                                  showAlertMessage={showAlertMessage}
                                  updateAnnouncementInList={updateAnnouncementInList}
                                />
                              </Col>
                            </Row>

                            <FormGroup row>
                              <Col sm={3} />
                              <Col sm={9}>
                                <ThemedButton type="submit">
                                  {(announcement && intl.formatMessage({ id: 'General.Update'})) || intl.formatMessage({ id: 'General.Create'})}
                                </ThemedButton>{" "}
                                <Button
                                  type="button"
                                  onClick={cancel}
                                  color="light"
                                >
                                  {intl.formatMessage({ id: 'General.Back'})}
                                </Button>
                              </Col>
                            </FormGroup>
                          </Form>
                          {/* END Form */}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  {/* END Section 2 */}
                </React.Fragment>
              );
            }}
          </Formik>
        )}
      </Consumer>
    )) || <Loading />
  );
};

export default EditAnnouncements;
