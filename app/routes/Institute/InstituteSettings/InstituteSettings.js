import React from 'react';
import { useParams, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import { SketchPicker } from 'react-color';
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";

import { 
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    Button,
    InputGroup,
    InputGroupAddon,
    CustomInput,
    FormGroup, 
    Label, 
    Media,
    Input, 
    FormText,
    Alert
} from '@/components';
import { instituteService } from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import  ImageUpload from '@/components/ImageUpload';
import {
    HeaderDemo
} from "@/routes/components/HeaderDemo";
import { useAppState } from '@/components/AppState';
import {SUPER_ADMIN_UPDATE_INSTITUTE} from '@/actions';

const Swatch = styled.section`
    padding: 5px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    cursor: pointer;
`;

const SwatchSelectedColor = styled.section`
    background-color: ${props => props.color ?  props.color : "#1EB7FF"};
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
    color: #ED1C24;
`;

const InstituteSettings = (props) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const [institute, setInstitute] = React.useState(null);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const [showColorPicker, setShowColorPicker] = React.useState(false);
    const [showBackgroundColorPicker, setShowBackgroundColorPicker] = React.useState(false);
    const [selectedColorCode, setSelectedColorCode] = React.useState('#FFFFFF');
    const [selectedBackgroundColorCode, setSelectedBackgroundColorCode] = React.useState('#1EB7FF');
    const [selectedLogoDataUrl, setSelectedLogoDataUrl] = React.useState(null);
    const { onCancel } = props;
    
    const dismissAlert = () => {
        setAlertMessage(null);
        setShowAlert(false);
    }

    const showAlertMessage = ({message, type, title}) => {
        setAlertMessage({ title, message, type });
        setShowAlert(true);
    }

    React.useEffect(() => {
            //const instituteId = queryParams && queryParams.id || currentUser && currentUser.user.instituteId;
            if(props.instituteId) {
                //console.log("Edit institute useEffect:", instituteId)
                instituteService.getById(props.instituteId).then((data) => {
                    setInstitute(data);
                    setSelectedColorCode(data.colorCode || '#FFFFFF');
                    setSelectedBackgroundColorCode(data.backgroundColorCode || '#1EB7FF');
                    setSelectedLogoDataUrl(data.logo || null);
                    
                
                // console.log('Got institute:', data);
                });
            } 
            else {
                setInstitute(null);
                setSelectedColorCode('#FFFFFF');
                setSelectedBackgroundColorCode('#1EB7FF');
                setSelectedLogoDataUrl(null);
            }
        }, [props.instituteId]
    );

    return (
        <React.Fragment>
            <Row> 
                <Col lg={ 12 }>
                    <HeaderDemo 
                    title="Edit institute settings"
                    subTitle="You can change institute settings like institute name, logo, academic months etc. here" 
                    />
                </Col>
            </Row>

        <Consumer>
        {
            (themeState) => (
            <Formik { ...themeState } { ...props }
                enableReinitialize={true}
                initialValues={{
                    name: institute && institute.name || '',
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                })}
                onSubmit={async ({ name, academicFirstMonth, academicLastMonth }, { setStatus, setSubmitting }) => {
                    setStatus();
                    //console.log('onSubmit', name, academicFirstMonth, academicLastMonth);

                    // Updating existing
                    if(institute) {
                        try {
                            const updatedInstitute = {name, instituteId: institute.instituteId, 
                                colorCode: selectedColorCode, backgroundColorCode: selectedBackgroundColorCode, logo: selectedLogoDataUrl};
                            await instituteService.update(updatedInstitute);

                            dispatch({type:SUPER_ADMIN_UPDATE_INSTITUTE, institute: updatedInstitute});

                            showAlertMessage({
                                title: intl.formatMessage({ id: 'General.Sucess'}),
                                message: "You have sucessfully changed the institute settings!",
                                type: "success"
                            });

                            props.onEdited();
                            setSubmitting(false);
                        }
                        catch(exc) {
                            showAlertMessage({
                                title: "Error",
                                message: `Error while changing institute settings: ${error}`,
                                type: "danger"
                            });
                            setSubmitting(false);
                            setStatus(error);  
                        }
                       
                    }
                    else {
                        instituteService.create({name, colorCode: selectedColorCode, backgroundColorCode: selectedBackgroundColorCode, 
                            logo: selectedLogoDataUrl}).then(
                            reponse => {
                                showAlertMessage({
                                    title: intl.formatMessage({ id: 'General.Sucess'}),
                                    message: "You have sucessfully created an institute!",
                                    type: "success"
                                });
      
                                props.onEdited();
                                setSubmitting(false);
                            },
                            error => {
                                showAlertMessage({
                                    title: "Error",
                                    message: `Error while trying to create an institute: ${error}`,
                                    type: "danger"
                                });
                                setSubmitting(false);
                                setStatus(error);  
                            }
                        ); 
                    }

                    themeState.onChangeTheme({backgroundColor: selectedBackgroundColorCode, foregroundColor: selectedColorCode,
                    instituteLogo: selectedLogoDataUrl});             
                }}
            >
                 {props => {
                     return (
                      <React.Fragment>
            
                        
                          {
                            showAlert && alertMessage && (
                                <Alert color={alertMessage.type}>
                                    <h6 className="mb-1 alert-heading">
                                        {alertMessage.title}
                                    </h6>
                                    {alertMessage.message}
                                    <div className="mt-2">
                                        <Button color={alertMessage.type} onClick={dismissAlert}>Dismiss</Button>
                                    </div>      
                                </Alert>
                            )
                          }
                          { /* START Section 1 */}
                          <Row>
                              <Col lg={ 12 }>
                                  <Card className="mb-3">
                                      <CardBody>
                                          { /* START Form */}
                                          <Form onSubmit={props.handleSubmit}>
                                              { /* START Input */}
            
                                              <FormGroup row>
                                                  <Label for="name" sm={3}>
                                                      Name
                                                  </Label>
                                                  <Col sm={9}>
                                                      <Field 
                                                          type="text" 
                                                          name="name" 
                                                          id="name" 
                                                          className={'bg-white form-control' + (props.errors.name && props.touched.name ? ' is-invalid' : '')} 
                                                          placeholder="Enter Name..." 
                                                      />
                                                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                  </Col>                                                    
                                              </FormGroup>
                                              <FormGroup row>
                                                  <Label for="name" sm={3}>
                                                      Logo
                                                  </Label>
                                                  <Col sm={9}>
                                                      <ImageUpload maxFileSizeKB={200} defaultImage={selectedLogoDataUrl} onSelectedImage={(imageDataUrl) => {
                                                          //console.log("Selected image:", imageDataUrl)
                                                          setSelectedLogoDataUrl(imageDataUrl);
                                                      }} />
                                                  </Col>                                                    
                                              </FormGroup>
                                              <FormGroup row>
                                                  <Label for="colorPicker" sm={3}>
                                                      Foreground color
                                                  </Label>
                                                  <Col sm={9}>
                                                    <Swatch>
                                                        <SwatchSelectedColor onClick={() => setShowColorPicker(!showColorPicker)} color={selectedColorCode} />
                                                    </Swatch>
                                                    { showColorPicker && (
                                                        <ColorPickerPopover>
                                                            <ColorPickerCover onClick={() => setShowColorPicker(false)} />
                                                            <SketchPicker color={ selectedColorCode } onChange={(color) => {
                                                                setSelectedColorCode(color.hex); 
                                                            }} />
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
                                                        <SwatchSelectedColor onClick={() => setShowBackgroundColorPicker(!showBackgroundColorPicker)} color={selectedBackgroundColorCode} />
                                                    </Swatch>
                                                    { showBackgroundColorPicker && (
                                                        <ColorPickerPopover>
                                                            <ColorPickerCover onClick={() => setShowBackgroundColorPicker(false)} />
                                                            <SketchPicker color={ selectedBackgroundColorCode } onChange={(color) => {
                                                                setSelectedBackgroundColorCode(color.hex); 
                                                            }} />
                                                        </ColorPickerPopover> 
                                                    )}
                                                  </Col>
                                              </FormGroup>
                                              <FormGroup row>
                                                  <Col sm={3} />
                                                  <Col sm={9}>
                                                      <ThemedButton type="submit">{institute && "Update" || "Create"}</ThemedButton>{' '}
                                                      {/*<Button type="button" onClick={() => onCancel()} color="light">{!institute && "Cancel" || "Go back"}</Button>*/}
                                                  </Col>
                                              </FormGroup>
                                          </Form>
                                          { /* END Form */}
                                      </CardBody>
                                  </Card>                  
                              </Col>                
                          </Row>
                          { /* END Section 2 */}
               
                  </React.Fragment>
                )
            }}
            </Formik>)
            }
        </Consumer>
   
</React.Fragment>
    )
};

export default InstituteSettings;