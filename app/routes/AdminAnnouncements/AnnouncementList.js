import React from "react";
import { useIntl } from "react-intl";
import moment from "moment";
import {
  ButtonGroup,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CustomInput,
  Table,
  UncontrolledTooltip
} from "@/components";
import ThemedButton from "@/components/ThemedButton";
import { announcementService } from "@/services";

const AnnouncementList = ({
  announcements,
  handleEditAnnouncement,
  addNewClick,
  getAllAnnouncements  
}) => {
  const intl = useIntl();

  const [selectedAnnouncements, setSelectedAnnouncements] = React.useState([]);

  const onSelected = (announcementId, e) => {
    if(e.target.checked) {
      setSelectedAnnouncements([...selectedAnnouncements, announcementId]);
    }
    else {
      setSelectedAnnouncements(selectedAnnouncements.filter(a => a != announcementId));
    }
  }

  const onDelete = async () => {
    const message = selectedAcademicYears.length == 1 ? 
      intl.formatMessage({ id: 'AdminAnnouncements.ThisAnnouncement'}) : intl.formatMessage({ id: 'AdminAnnouncements.TheseAnnouncements'});
    if(confirm(intl.formatMessage({ id: 'General.HandleDeleteConfirm'}) + " " + message + "?")) {
        try {
            await announcementService.deleteAnnouncements(selectedAnnouncements);
            getAllAnnouncements();
            setSelectedAnnouncements([]);
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
                onClick={addNewClick}
                id="tooltipAddNew"
              >
                <i className="fa fa-fw fa-pencil"></i>
              </ThemedButton>
              <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                {intl.formatMessage({ id: 'AdminAnnouncements.AddNew'})}
              </UncontrolledTooltip>
              
              {selectedAnnouncements && selectedAnnouncements.length > 0 && (
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
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col>
              {announcements && announcements.length > 0 && (
                <Table className="mb-0" hover responsive>
                  <thead>
                    <tr>
                      <th className="bt-0"></th>
                      <th className="bt-0"></th>
                      <th className="bt-0">{intl.formatMessage({ id: 'General.Title'})}</th>
                      <th className="bt-0 text-center">{intl.formatMessage({ id: 'General.Status'})}</th>
                      <th className="bt-0 text-center">{intl.formatMessage({ id: 'General.DateFrom'})}</th>
                      <th className="bt-0 text-center">{intl.formatMessage({ id: 'General.DateTo'})}</th>
                      <th className="bt-0 text-center">{intl.formatMessage({ id: 'AdminAnnouncements.FileNum'})}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map(item => {
                      return (
                        <tr key={item.announcementId}>
                          <td>
                            <CustomInput
                              type="checkbox"
                              onClick={e =>
                                onSelected(item.announcementId, e)
                              }
                              id={`AnnouncementCheckbox-${item.announcementId}`}
                            />
                          </td>
                          <td>
                            <a
                              href="#"
                              onClick={e =>
                                handleEditAnnouncement(e, item.announcementId)
                              }
                            >
                              <i className="fa fa-fw fa-pencil mr-2"></i>
                              Edit
                            </a>
                          </td>
                          <td>{item.title}</td>
                          <td className="text-center">
                            {(item.isActive && "Active") || "Inactive"}
                          </td>
                          <td className="text-center">
                            {item.dateFrom && moment(item.dateFrom).format("L")}
                          </td>
                          <td className="text-center">
                            {item.dateTo && moment(item.dateTo).format("L")}
                          </td>
                          <td className="text-center">{item.fileNum}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}

              {!announcements ||
                (announcements.length == 0 && (
                  <React.Fragment>No announcements</React.Fragment>
                ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default AnnouncementList;
