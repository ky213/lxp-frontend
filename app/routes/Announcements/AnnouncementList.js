import React from 'react';
import moment from 'moment';
import { Row, Col, Card, CardBody, Table } from '@/components';
import AnnouncementDetailsModal from './AnnouncementDetailsModal';
import styles from './Announcements.css';

const AnnouncementList = ({ announcements, files }) => {
  const [announcement, setAnnouncement] = React.useState(null);
  const [announcementFiles, setAnnouncementFiles] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (announcement) setIsOpen(true);
    else setIsOpen(false);
  }, announcement);

  const showAnnouncementDetails = (announcementId) => {
    let x = announcements.find((a) => a.announcementId == announcementId);
    let f = files.filter((b) => b.announcementId == announcementId);
    setAnnouncement(x);
    setAnnouncementFiles(f);
  };

  const closeAnnouncementDetails = () => {
    setAnnouncement(null);
  };

  return (
    <React.Fragment>
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              {announcements && announcements.length > 0 && (
                <Table className="mb-0" hover responsive>
                  <thead>
                    <tr>
                      <th className="bt-0">Title</th>
                      <th className="bt-0 text-center">Date from</th>
                      <th className="bt-0 text-center">Date to</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map((item) => {
                      return (
                        <tr
                          className={styles.announcementTr}
                          key={item.announcementId}
                          onClick={() =>
                            showAnnouncementDetails(item.announcementId)
                          }
                        >
                          <td>{item.title}</td>
                          <td className="text-center">
                            {item.dateFrom && moment(item.dateFrom).format('L')}
                          </td>
                          <td className="text-center">
                            {item.dateTo && moment(item.dateTo).format('L')}
                          </td>
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

      <AnnouncementDetailsModal
        isOpen={isOpen}
        announcement={announcement}
        files={announcementFiles}
        closeAnnouncementDetails={closeAnnouncementDetails}
      />
    </React.Fragment>
  );
};

export default AnnouncementList;
