import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Card,
  CardFooter,
  Row,
  Table
} from "@/components";
import { HeaderMain } from "@/routes/components/HeaderMain";
import ListNotifications from "./ListNotifications";
import {
  notificationService,
  authenticationService
} from "@/services";
import {ShowNotification}  from "./ShowNotification";
import { Loading } from "@/components";
import { useAppState } from '@/components/AppState';

const Notifications = () => {
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const recordsPerPage = 15;
  const [showNotification, setShowNotification] = React.useState(false);
  const [searchText, setSearchText] = React.useState(null);
  const [selectedNotification, setSelectedNotification] = React.useState(null);
  const [notifications, setNotifications] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);

  React.useEffect(() => {
    getNotifications(searchText);
  }, [searchText, pageId]);


  const handleSearch = e => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
  };

  const getNotifications = filter => {
    notificationService
      .getAll(pageId, recordsPerPage, filter, selectedInstitute && selectedInstitute.instituteId)
      .then(data => {
        console.log('data', data, data.notifications, data.totalNumberOfRecords);
        setNotifications(data.notifications);
        setTotalNumberOfRecords(data.totalNumberOfRecords);
      })
      .catch(err => console.log("getAll", err));
  };

  const toggleShowNotification = () => {
    setShowNotification(!showNotification);
  }

  const handleShowNotification = notification => {
    setSelectedNotification(notification);
    toggleShowNotification();
  };

  const handleEditedNotification = () => {
    getNotifications();
  }

  const handleChangeIsRead = async (notificationId, checked) => {
    try {
      await notificationService.setRead({notificationId:notificationId, isRead: checked});
      getNotifications();
    }
    catch(error) {
        console.log("Error while updating read status of the notification:", error)
    }
  }

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Notifications" />

        <ShowNotification 
          toggle={toggleShowNotification} 
          selectedNotification={selectedNotification}
          isOpen={showNotification}
          onSuccess={handleEditedNotification}
        />

        {notifications && (
          <ListNotifications
            notifications={notifications}
            onShowNotification={handleShowNotification}
            pageId={pageId}
            setPageId={setPageId}
            onSearch={handleSearch}
            recordsPerPage={recordsPerPage}
            totalNumberOfRecords={totalNumberOfRecords}
            searchText={searchText}
            onChangeIsRead={handleChangeIsRead}
          />
        ) || <Loading/>}


      </Container>
    </React.Fragment>
  );
};

export default Notifications;
