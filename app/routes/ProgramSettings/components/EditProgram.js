import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Label,
  Alert
} from "@/components";
import { programService, authenticationService, userService } from "@/services";
import { Consumer } from "@/components/Theme/ThemeContext";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Role } from '@/helpers';
import { Loading } from "@/components";
import { useAppState } from '@/components/AppState';

const Swatch = styled.section`
    padding: 5px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    cursor: pointer;
`;

const SwatchSelectedColor = styled.section`
    background-color: ${props => props.color ? props.color : "#1EB7FF"};
    width: 36px;
    height: 14px;
    border-radius: 2px;
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

const EditProgram = (props) => {
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const today = moment().format('YYYY-MM-DD');

  const [program, setProgram] = React.useState(null);
  const [blockTypes, setBlockTypes] = React.useState([]);
  const [timeDifference, setTimeDifference] = React.useState(480);
  const [remainder, setRemainder] = React.useState(program && program.dutyTimeFrom && (30 - moment(`${today}T${program.dutyTimeFrom}`).minute() % 30) || 0);

  React.useEffect(() => {
    //console.log("Got program to edit in program settings:", props.programId)
    programService.getBlockTypes().then(dataBlockTypes => {
      setBlockTypes(dataBlockTypes);
    });

    if(props.programId) {
      programService.getById(props.programId, selectedInstitute.instituteId).then(data => {
        setProgram(data);

        if(data) {
          //console.log("Got program data:", data)
          const to = data.dutyTimeTo && moment(`${today}T${data.dutyTimeTo}`) || null;
          const from = data.dutyTimeFrom && moment(`${today}T${data.dutyTimeFrom}`) || null;

          const calculatedTimeDifference = to && from &&  Math.round(
            moment
            .duration(to.diff(from))
            .add(remainder, 'minutes')
            .asMinutes()
          ) || 480; 

          //console.log("Initial time diff program:", calculatedTimeDifference)
          setTimeDifference(calculatedTimeDifference);
        }
      });
    }
      
  }, [props.programId]);


  const handleCancelUpdate = () => {
    /* console.log("Handle cancel create:"); */
    setProgram(null);
    props.onCancelUpdate();
  }

  //console.log("Duty time from:", today, program && program.dutyTimeFrom, program && program.dutyTimeFrom && moment(`${today}T${program.dutyTimeFrom}`).toDate())
  if(!program) return <Loading />;

  return (
    <Consumer>
      {themeState => (
        <Formik
          {...themeState}
          {...props}
          enableReinitialize={false}
          initialValues={{
            name: (program && program.name) || "",
            description: (program && program.description) || "",
            timeFrom: program && program.dutyTimeFrom && moment(`${today}T${program.dutyTimeFrom}`).toDate() || "",
            timeTo: program && program.dutyTimeTo && moment(`${today}T${program.dutyTimeTo}`).toDate() || "",
            allowedAnnualVacationWeeks: (program && program.allowedAnnualVacationWeeks) || "",
            allowedEducationalLeaveDays: (program && program.allowedEducationalLeaveDays) || "",
            allowedEmergencyLeaveDays: (program && program.allowedEmergencyLeaveDays) || "",
            totalBlock: (program && (program.totalBlockJunior + program.totalBlockJunior)) || "",
            totalBlockSenior: (program && program.totalBlockSenior) || "",
            totalBlockJunior: (program && program.totalBlockJunior) || "",
            blockType: (program && program.blockTypeId) || "",
            minExperienceLevel: program && program.minExperienceLevel || "",
            maxExperienceLevel: program && program.maxExperienceLevel || "",
            seniorResidentsStartLevel: program && program.seniorResidentsStartLevel || ""
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name of a program is required'),
            description: Yup.string().max(300, 'Description cant be more than 300 characters long'),
            timeFrom: Yup.date().required('You need to enter the start of duty hours'),
            timeTo: Yup.date().required('You need to enter the end of duty hours'),
            allowedAnnualVacationWeeks: Yup.string().required('Allowed Annual Vacation is required'),
            allowedEducationalLeaveDays: Yup.string().required('Allowed Educational Vacation is required'),
            allowedEmergencyLeaveDays: Yup.string().required('Allowed Emergency Vacation is required'),
            totalBlock: Yup.string().required('Total Block is required'),
            totalBlockSenior: Yup.string().required('Senior Block is required'),
            totalBlockJunior: Yup.string().required('Junior Block is required'),
            blockType: Yup.string().required('You need to select the block type'),
            minExperienceLevel: Yup.number().required(),
            maxExperienceLevel: Yup.number().required(),
            seniorResidentsStartLevel: Yup.number().required()
          })}
          onSubmit={({ name, description, timeFrom, timeTo, allowedAnnualVacationWeeks, allowedEducationalLeaveDays, allowedEmergencyLeaveDays,
            totalBlock, totalBlockSenior, totalBlockJunior, blockType, minExperienceLevel, maxExperienceLevel, seniorResidentsStartLevel },

            { setStatus, setSubmitting }) => {

              {console.log("ProgramSettings #### onSubmit ")}

            if (program) {
              programService.update({
                name,
                programId: program.programId,
                description,
                timeFrom: timeFrom && moment(timeFrom).format('HH:mm:ss') || null,
                timeTo: timeTo && moment(timeTo).format('HH:mm:ss') || null,
                allowedAnnualVacationWeeks,
                allowedEducationalLeaveDays,
                allowedEmergencyLeaveDays,
                totalBlock,
                totalBlockSenior,
                totalBlockJunior,
                blockTypeId: blockType,
                minExperienceLevel,
                maxExperienceLevel, 
                seniorResidentsStartLevel                
              }).then(
                reponse => {
                  let alertMessage = { title: intl.formatMessage({ id: 'General.Success'}), message: "You have sucessfully changed the program!", type: "success" }
                  props.onEdited(alertMessage);
                },
                error => {
                  let alertMessage = { title: "Error", message: `Error while changing program: ${error}`, type: "danger" }
                  props.onEdited(alertMessage);
                  setSubmitting(false);
                  setStatus(error);
                }
              );
            }

          }}
        >
          {formikProps => {

            return (

              <React.Fragment>
               
                    <Col lg={12}>
                      <Card className="mb-3">
                        <CardBody>
                          {/* START Form */}
                          <Form>

                            <FormGroup row>
                              <Label for="name" sm={3}>
                                Program name
                              </Label>
                              <Col sm={9}>
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  className={'bg-white form-control' + (formikProps.errors.name && formikProps.touched.name ? ' is-invalid' : '')}
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
                              <Label for="textArea" sm={3}>
                                Description
                              </Label>
                              <Col sm={9}>
                                <Field
                                  component="textarea"
                                  name="description"
                                  id="description"
                                  className={'bg-white form-control' + (formikProps.errors.description && formikProps.touched.description ? ' is-invalid' : '')}
                                  placeholder="Enter description of the program here..."
                                />
                                <ErrorMessage
                                  name="description"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="duty-hours" sm={3}>
                                Working hours
                              </Label>
                              <Col sm={4}>
                                <Field 
                                  component={(props) => {
                                    return (
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                          <i className="fa fa-fw fa-clock-o"></i> From:
                                        </InputGroupAddon>
                                        <DatePicker
                                            label="From"
                                            showMonthDropdown
                                            showYearDropdown
                                            autoComplete="off"
                                            showTimeSelect
                                            className={'bg-white form-control' + (formikProps.errors.timeFrom && formikProps.touched.timeFrom ? ' is-invalid' : '')}
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            name={props.field.name}
                                            clearable
                                            selected={props.field.value}
                                            onChange={(val) => {
                                                formikProps.setFieldValue('timeTo', moment(val).add(timeDifference, 'minutes').toDate());
                                                props.form.setFieldValue('timeFrom', val || '')
                                            }}
                                        />
                                      </InputGroup>
                                    )
                                  }} 
                                  name="timeFrom" 
                                />
                                <ErrorMessage name="timeFrom" component="div" className="invalid-feedback" />
                              </Col>
                              <Col sm={4}>
                                <Field 
                                  component={(props) => {
                                    return (
                                      <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                          <i className="fa fa-fw fa-clock-o"></i> To:
                                        </InputGroupAddon>
                                        <DatePicker
                                            label="To"
                                            autoComplete="off"
                                            showMonthDropdown
                                            showYearDropdown
                                            showTimeSelect
                                            className={'bg-white form-control' + (formikProps.errors.timeTo && formikProps.touched.timeTo ? ' is-invalid' : '')}
                                            showTimeSelectOnly
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            name={props.field.name}
                                            clearable
                                            selected={props.field.value}
                                            onChange={(val) => {
                                                const end = moment(val);
                                                const start = moment(props.form.values.timeFrom);
                                                const calculatedTimeDifference = Math.round(moment.duration(end.diff(start)).add(remainder, 'minutes').asMinutes());
                                                setTimeDifference(calculatedTimeDifference);
                                                props.form.setFieldValue('timeTo', val || '')
                                            }}
                                        />
                                      </InputGroup>
                                    )
                                  }} 
                                  name="timeTo" 
                                />
                                <ErrorMessage name="timeTo" component="div" className="invalid-feedback" />
                              </Col>
                            </FormGroup>

                            

                            <FormGroup row>
                              <Label for="allowed-annual-vacation" sm={3}>
                                Annual vacation allowed
                              </Label>
                              <Col sm={3}>
                                <Field
                                  type="text"
                                  name="allowedAnnualVacationWeeks"
                                  id="allowedAnnualVacationWeeks"
                                  className={'bg-white form-control' + (formikProps.errors.allowedAnnualVacationWeeks && formikProps.touched.allowedAnnualVacationWeeks ? ' is-invalid' : '')}
                                  placeholder="Weeks..."
                                />
                                <ErrorMessage
                                  name="allowedAnnualVacationWeeks"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                              <Label className="col-form-label">
                                Weeks
                              </Label>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="allowed-educational-vacation" sm={3}>
                                Educational vacation allowed
                              </Label>
                              <Col sm={3}>
                                <Field
                                  type="text"
                                  name="allowedEducationalLeaveDays"
                                  id="allowedEducationalLeaveDays"
                                  className={'bg-white form-control' + (formikProps.errors.allowedEducationalLeaveDays && formikProps.touched.allowedEducationalLeaveDays ? ' is-invalid' : '')}
                                  placeholder="Days..."
                                />
                                <ErrorMessage
                                  name="allowedEducationalLeaveDays"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                              <Label className="col-form-label">
                                Days
                              </Label>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="allowed-emergency-vacation" sm={3}>
                                Emergency vacation allowed
                              </Label>
                              <Col sm={3}>
                                <Field
                                  type="text"
                                  name="allowedEmergencyLeaveDays"
                                  id="allowedEmergencyLeaveDays"
                                  className={'bg-white form-control' + (formikProps.errors.allowedEmergencyLeaveDays && formikProps.touched.allowedEmergencyLeaveDays ? ' is-invalid' : '')}
                                  placeholder="Days..."
                                />
                                <ErrorMessage
                                  name="allowedEducationalLeaveDays"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                              <Label className="col-form-label">
                                Days
                              </Label>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="total-block" sm={3}>
                                Total number of training blocks for this program
                              </Label>
                              <Col sm={3}>
                                <Field
                                  type="text"
                                  name="totalBlock"
                                  id="totalBlock"
                                  className={'bg-white form-control' + (formikProps.errors.totalBlock && formikProps.touched.totalBlock ? ' is-invalid' : '')}
                                  placeholder="Block..."
                                />
                                <ErrorMessage
                                  name="totalBlock"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                              <Label className="col-form-label">
                                Block(s)
                              </Label>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="senior-block" sm={3}>
                                Total number of blocks for senior residents
                              </Label>
                              <Col sm={3}>
                                <Field
                                  type="text"
                                  name="totalBlockSenior"
                                  id="totalBlockSenior"
                                  className={'bg-white form-control' + (formikProps.errors.totalBlockSenior && formikProps.touched.totalBlockSenior ? ' is-invalid' : '')}
                                  placeholder="Block..."
                                />
                                <ErrorMessage
                                  name="totalBlockSenior"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="junior-block" sm={3}>
                                Total number of blocks for junior residents
                              </Label>
                              <Col sm={3}>
                                <Field
                                  type="text"
                                  name="totalBlockJunior"
                                  id="totalBlockJunior"
                                  className={'bg-white form-control' + (formikProps.errors.totalBlockJunior && formikProps.touched.totalBlockJunior ? ' is-invalid' : '')}
                                  placeholder="Block..."
                                />
                                <ErrorMessage
                                  name="totalBlockJunior"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="block-type" sm={3}>
                                Block Type
                              </Label>
                              <Col sm={3}>
                                <Field 
                                  component="select" 
                                  name="blockType" 
                                  id="blockType" 
                                  className={'bg-white form-control' + (formikProps.errors.blockType && formikProps.touched.blockType ? ' is-invalid' : '')} 
                                  
                                >
                                    <option value="">Select a block type...</option>
                                    {blockTypes.map(blockType => {
                                        //console.log("Map each at:", at)
                                        return (
                                        <option value={blockType.blockTypeId}>{blockType.blockTypeDescription}</option>
                                        );
                                    })} 
                                </Field> 
                                <ErrorMessage name="blockType" component="div" className="invalid-feedback" />  
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="block-type" sm={3}>
                                Training levels
                              </Label>
                              <Col sm={1}>
                                <Field
                                    type="text"
                                    name="minExperienceLevel"
                                    id="minExperienceLevel"
                                    className={'bg-white form-control' + (formikProps.errors.minExperienceLevel && formikProps.touched.minExperienceLevel ? ' is-invalid' : '')}
                                    placeholder="Min level..."
                                  />
                                <ErrorMessage name="minExperienceLevel" component="div" className="invalid-feedback" /> 
                                </Col>
                                <Label className="col-form-label">
                                  to
                                </Label>
                          
                              <Col sm={1}>
                                <Field
                                    type="text"
                                    name="maxExperienceLevel"
                                    id="maxExperienceLevel"
                                    className={'bg-white form-control' + (formikProps.errors.maxExperienceLevel && formikProps.touched.maxExperienceLevel ? ' is-invalid' : '')}
                                    placeholder="Max level..."
                                  />
                                <ErrorMessage name="maxExperienceLevel" component="div" className="invalid-feedback" /> 
                                            
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Label for="block-type" sm={3}>
                                Residents are considered seniors from year
                              </Label>
                              <Col sm={2}>
                                <Field
                                    type="text"
                                    name="seniorResidentsStartLevel"
                                    id="seniorResidentsStartLevel"
                                    className={'bg-white form-control' + (formikProps.errors.seniorResidentsStartLevel && formikProps.touched.seniorResidentsStartLevel ? ' is-invalid' : '')}
                                    placeholder="Start level..."
                                  />
                                <ErrorMessage name="seniorResidentsStartLevel" component="div" className="invalid-feedback" /> 
                                </Col>
                                <Label className="col-form-label">
                                  {' '} (onwards)
                                </Label>                         
                             
                            </FormGroup>


                            <FormGroup row>
                              <Col sm={3} />
                              <Col sm={9}>
                              <ThemedButton type="submit" disabled={!program} >{"Update"}</ThemedButton>{' '}                              
                                {props.programs && props.programs.length > 1 && <Button type="button" onClick={handleCancelUpdate} color="light">Cancel</Button>}
                              </Col>
                            </FormGroup>

                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
            
                  {/* END Section 2 */}
       
              </React.Fragment>
            );
          }}
        </Formik>
      )}
    </Consumer>
  );
};

export default EditProgram;
