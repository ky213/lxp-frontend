import React from 'react';
import { useIntl } from "react-intl";
import moment from "moment";
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  Card,
  CardBody,
  CustomInput,
  Table,
  UncontrolledTooltip
} from "@/components";
import ThemedButton from "@/components/ThemedButton";
import { academicYearService } from "@/services";
import { useAppState } from '@/components/AppState';

const AcademicYearsList = ({ academicYears, handleEdit, handleAddNew, getAcademicYears }) => {
  const intl = useIntl();
  
  const [{selectedInstitute}] = useAppState();
  const [selectedAcademicYears, setSelectedAcademicYears] = React.useState([]);

  const onSelected = (academicYearId, e) => {
    if(e.target.checked) {
      setSelectedAcademicYears([...selectedAcademicYears, academicYearId]);
    }
    else {
      setSelectedAcademicYears(selectedAcademicYears.filter(a => a != academicYearId));
    }
  }

  const onDelete = async () => {
    const message = selectedAcademicYears.length == 1 ? intl.formatMessage({ id: 'AcademicYears.ThisAcademicYear'}) : intl.formatMessage({ id: 'AcademicYears.ThereAcademicYears'});
    if(confirm(intl.formatMessage({ id: 'General.HandleDeleteConfirm'}) + " " + message + "?")) {
        try {
            await academicYearService.deleteAcademicYears(selectedInstitute.instituteId, selectedAcademicYears);
            getAcademicYears();
            setSelectedAcademicYears([]);
        }
        catch(error) {
            alert(intl.formatMessage({ id: 'General.HandleDeleteError'}))
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
                onClick={handleAddNew}
                id="tooltipAddNew"
              >
                <i className="fa fa-fw fa-pencil"></i>
              </ThemedButton>
              <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                Add New Academic Year
              </UncontrolledTooltip>

              {selectedAcademicYears && selectedAcademicYears.length > 0 && (
                <ButtonGroup className="mr-2 pull-right">
                    <Button color="link" onClick={onDelete} className="text-decoration-none align-self-center" id="tooltipDelete">
                        <i className="fa fa-fw fa-trash"></i>
                    </Button>
                    <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                      {intl.formatMessage({ id: 'General.Delete'})}
                    </UncontrolledTooltip>
                </ButtonGroup>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <br />
              </div>
              {academicYears && academicYears.length == 0 && (
                <div>{intl.formatMessage({ id: 'AcademicYears.NoAcademicYears'})}</div>
              )}

              {academicYears && academicYears.length > 0 && (
                <Table className="mb-0" responsive>
                  <thead>
                    <tr>
                      <th className="align-middle bt-0 text-center"></th>
                      <th className="align-middle bt-0 text-center"></th>
                      <th className="align-middle bt-0">{intl.formatMessage({ id: 'General.Name'})}</th>
                      <th className="align-middle bt-0">{intl.formatMessage({ id: 'General.Program'})}</th>
                      <th className="align-middle bt-0 text-center">
                        {intl.formatMessage({ id: 'General.DateFrom'})}
                      </th>
                      <th className="align-middle bt-0 text-center">{intl.formatMessage({ id: 'General.DateFrom'})}</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {academicYears.map(item => {
                      return (
                        <tr key={item.academicYearId}>
                          <td>
                            <CustomInput
                              type="checkbox"
                              onClick={e =>
                                onSelected(item.academicYearId, e)
                              }
                              id={`AcademicYearCheckbox-${item.academicYearId}`}
                            />
                          </td>
                          <td>
                            <a
                              href="#"
                              onClick={e => handleEdit(e, item.academicYearId)}
                            >
                              <i className="fa fa-fw fa-pencil mr-2"></i>
                              {intl.formatMessage({ id: 'General.Edit'})}
                            </a>
                          </td>
                          <td>{item.academicYearName}</td>
                          <td>{item.programName}</td>
                          <td className="text-center">
                            {item.startDate &&
                              moment(item.startDate).format("l")}
                          </td>
                          <td className="text-center">
                            {item.endDate && moment(item.endDate).format("l")}
                          </td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default AcademicYearsList;
