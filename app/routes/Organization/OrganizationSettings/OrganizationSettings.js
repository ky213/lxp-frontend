import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import ThemedButton from '@/components/ThemedButton';
import { useIntl } from 'react-intl';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  Alert,
} from '@/components';
import { organizationService, groupsService } from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import ImageUpload from '@/components/ImageUpload';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import { useAppState } from '@/components/AppState';
import { SUPER_ADMIN_UPDATE_ORGANIZATION } from '@/actions';

const Swatch = styled.section`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

const SwatchSelectedColor = styled.section`
  background-color: ${(props) => (props.color ? props.color : '#1EB7FF')};
  width: 36px;
  height: 14px;
`;

const ColorPickerPopover = styled.section`
  position: absolute;
  z-index: 2;
`;

const ColorPickerCover = styled.section`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const InvalidFeedback = styled.section`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ed1c24;
`;

const OrganizationSettings = (props) => {
  const intl = useIntl();

  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
  const [organization, setOrganization] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [
    showBackgroundColorPicker,
    setShowBackgroundColorPicker,
  ] = React.useState(false);
  const [selectedColorCode, setSelectedColorCode] = React.useState('#FFFFFF');
  const [
    selectedBackgroundColorCode,
    setSelectedBackgroundColorCode,
  ] = React.useState('#1EB7FF');
  const [selectedLogoDataUrl, setSelectedLogoDataUrl] = React.useState(null);
  const [groups, setGroups] = React.useState([]);

  const { onCancel } = props;

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  React.useEffect(() => {
    //const organizationId = queryParams && queryParams.id || currentUser && currentUser.user.organizationId;
    if (props.organizationId) {
      //console.log("Edit organization useEffect:", organizationId)
      organizationService.getById(props.organizationId).then((data) => {
        setOrganization(data);
        setSelectedColorCode(data.colorCode || '#FFFFFF');
        setSelectedBackgroundColorCode(data.backgroundColorCode || '#1EB7FF');
        setSelectedLogoDataUrl(data.logo || null);

        // console.log('Got organization:', data);
      });
    } else {
      setOrganization(null);
      setSelectedColorCode('#FFFFFF');
      setSelectedBackgroundColorCode('#1EB7FF');
      setSelectedLogoDataUrl(null);
    }
  }, [props.organizationId]);

  React.useEffect((params) => {
    groupsService
      .getAll(selectedOrganization?.organizationId)
      .then((response) => setGroups(response.groups));
  }, []);

  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <HeaderDemo
            title="Edit organization settings"
            subTitle="You can change organization settings like organization name, logo, academic months etc. here"
          />
        </Col>
      </Row>

      <Consumer>
        {(themeState) => (
          <Formik
            {...themeState}
            {...props}
            enableReinitialize={true}
            initialValues={{
              name: (organization && organization.name) || '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              defaultGroupId: Yup.string().required(
                'Default group is required'
              ),
            })}
            onSubmit={async (
              { name, defaultGroupId },
              { setStatus, setSubmitting }
            ) => {
              setStatus();
              //console.log('onSubmit', name, academicFirstMonth, academicLastMonth);

              // Updating existing
              if (organization) {
                try {
                  const updatedOrganization = {
                    name,
                    organizationId: organization.organizationId,
                    colorCode: selectedColorCode,
                    backgroundColorCode: selectedBackgroundColorCode,
                    logo: selectedLogoDataUrl,
                    defaultGroupId,
                  };
                  await organizationService.update(updatedOrganization);

                  dispatch({
                    type: SUPER_ADMIN_UPDATE_ORGANIZATION,
                    organization: updatedOrganization,
                  });

                  showAlertMessage({
                    title: intl.formatMessage({ id: 'General.Success' }),
                    message:
                      'You have sucessfully changed the organization settings!',
                    type: 'success',
                  });

                  props.onEdited();
                  setSubmitting(false);
                } catch (error) {
                  showAlertMessage({
                    title: 'Error',
                    message: `Error while changing organization settings: ${error}`,
                    type: 'danger',
                  });
                  setSubmitting(false);
                  setStatus(error);
                }
              } else {
                organizationService
                  .create({
                    name,
                    colorCode: selectedColorCode,
                    backgroundColorCode: selectedBackgroundColorCode,
                    logo: selectedLogoDataUrl,
                    defaultGroupId,
                  })
                  .then(
                    (reponse) => {
                      showAlertMessage({
                        title: intl.formatMessage({ id: 'General.Success' }),
                        message:
                          'You have sucessfully created an organization!',
                        type: 'success',
                      });

                      props.onEdited();
                      setSubmitting(false);
                    },
                    (error) => {
                      showAlertMessage({
                        title: 'Error',
                        message: `Error while trying to create an organization: ${error}`,
                        type: 'danger',
                      });
                      setSubmitting(false);
                      setStatus(error);
                    }
                  );
              }

              themeState.onChangeTheme({
                backgroundColor: selectedBackgroundColorCode,
                foregroundColor: selectedColorCode,
                organizationLogo: selectedLogoDataUrl,
              });
            }}
          >
            {(props) => {
              return (
                <React.Fragment>
                  {showAlert && alertMessage && (
                    <Alert color={alertMessage.type}>
                      <h6 className="mb-1 alert-heading">
                        {alertMessage.title}
                      </h6>
                      {alertMessage.message}
                      <div className="mt-2">
                        <Button
                          color={alertMessage.type}
                          onClick={dismissAlert}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </Alert>
                  )}
                  <Row>
                    <Col lg={12}>
                      <Card className="mb-3">
                        <CardBody>
                          <Form onSubmit={props.handleSubmit}>
                            <FormGroup row>
                              <Label for="name" sm={3}>
                                Name
                              </Label>
                              <Col sm={9}>
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  className={
                                    'bg-white form-control' +
                                    (props.errors.name && props.touched.name
                                      ? ' is-invalid'
                                      : '')
                                  }
                                  placeholder="Enter Name..."
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="name" sm={3}>
                                Logo
                              </Label>
                              <Col sm={9}>
                                <ImageUpload
                                  maxFileSizeKB={200}
                                  defaultImage={selectedLogoDataUrl}
                                  onSelectedImage={(imageDataUrl) => {
                                    //console.log("Selected image:", imageDataUrl)
                                    setSelectedLogoDataUrl(imageDataUrl);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="colorPicker" sm={3}>
                                Foreground color
                              </Label>
                              <Col sm={9}>
                                <Swatch>
                                  <SwatchSelectedColor
                                    onClick={() =>
                                      setShowColorPicker(!showColorPicker)
                                    }
                                    color={selectedColorCode}
                                  />
                                </Swatch>
                                {showColorPicker && (
                                  <ColorPickerPopover>
                                    <ColorPickerCover
                                      onClick={() => setShowColorPicker(false)}
                                    />
                                    <SketchPicker
                                      color={selectedColorCode}
                                      onChange={(color) => {
                                        setSelectedColorCode(color.hex);
                                      }}
                                    />
                                  </ColorPickerPopover>
                                )}
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="colorPicker" sm={3}>
                                Background color
                              </Label>
                              <Col sm={9}>
                                <Swatch>
                                  <SwatchSelectedColor
                                    onClick={() =>
                                      setShowBackgroundColorPicker(
                                        !showBackgroundColorPicker
                                      )
                                    }
                                    color={selectedBackgroundColorCode}
                                  />
                                </Swatch>
                                {showBackgroundColorPicker && (
                                  <ColorPickerPopover>
                                    <ColorPickerCover
                                      onClick={() =>
                                        setShowBackgroundColorPicker(false)
                                      }
                                    />
                                    <SketchPicker
                                      color={selectedBackgroundColorCode}
                                      onChange={(color) => {
                                        setSelectedBackgroundColorCode(
                                          color.hex
                                        );
                                      }}
                                    />
                                  </ColorPickerPopover>
                                )}
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="group" sm={3}>
                                Default Group
                              </Label>
                              <Col sm={9}>
                                <Field
                                  component="select"
                                  name="defaultGroupId"
                                  id="defaultGroupId"
                                  className={
                                    'bg-white form-control' +
                                    (props.errors.defaultGroupId &&
                                    props.touched.defaultGroupId
                                      ? ' is-invalid'
                                      : '')
                                  }
                                >
                                  <option value="">Select user group...</option>
                                  {groups.map((group) => {
                                    return (
                                      <option
                                        value={group.groupId}
                                        selected={
                                          organization &&
                                          group.groupId ==
                                            organization.defaultGroupId
                                        }
                                      >
                                        {group.name}
                                      </option>
                                    );
                                  })}
                                </Field>
                                {props.errors.defaultGroupId && (
                                  <InvalidFeedback>
                                    {props.errors.defaultGroupId}
                                  </InvalidFeedback>
                                )}
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col sm={3} />
                              <Col sm={9}>
                                <ThemedButton type="submit">
                                  {(organization && 'Update') || 'Create'}
                                </ThemedButton>
                              </Col>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              );
            }}
          </Formik>
        )}
      </Consumer>
    </React.Fragment>
  );
};

export default OrganizationSettings;
