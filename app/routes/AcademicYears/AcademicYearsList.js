import React from "react";
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
    const message = selectedAcademicYears.length == 1 ? "this academic year" : "these academic years";
    if(confirm(`Are you sure you want to delete ${message}?`)) {
        try {
            await academicYearService.deleteAcademicYears(selectedInstitute.instituteId, selectedAcademicYears);
            getAcademicYears();
            setSelectedAcademicYears([]);
        }
        catch(error) {
            console.log("Error while deleting academic years:", error);
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
                        Delete
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
                <div>There are no academic years</div>
              )}

              {academicYears && academicYears.length > 0 && (
                <Table className="mb-0" responsive>
                  <thead>
                    <tr>
                      <th className="align-middle bt-0 text-center"></th>
                      <th className="align-middle bt-0 text-center"></th>
                      <th className="align-middle bt-0">Name</th>
                      <th className="align-middle bt-0">Program</th>
                      <th className="align-middle bt-0 text-center">
                        Date from
                      </th>
                      <th className="align-middle bt-0 text-center">Date to</th>                      
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
                              Edit
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
