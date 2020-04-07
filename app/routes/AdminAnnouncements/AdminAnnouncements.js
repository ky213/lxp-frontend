import React from "react";
import { HeaderMain } from "@/routes/components/HeaderMain";
import AnnouncementList from "./AnnouncementList";
import { Container, Button, Alert } from "@/components";
import { announcementService } from "@/services";
import EditAnnouncements from "./EditAnnouncements";
import { Loading } from "@/components";
import { useAppState } from '@/components/AppState';

const AdminAnnouncements = () => {  
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const [announcements, setAnnouncements] = React.useState(null);
  const [announcement, setAnnouncement] = React.useState(null);  
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [editForm, setEditForm] = React.useState(false);
  

  React.useEffect(() => {
    getAllAnnouncements();
  }, []);

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  const hideAlertMessage = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const getAllAnnouncements = () => {
    setAnnouncement(null);
    announcementService.getAll(selectedInstitute.instituteId).then(data => {
      console.log('ann', data);
      setAnnouncements(data);
    });
  }

  const handleCanceled = () => {
    hideAlertMessage();
    setEditForm(false);
    setAnnouncement(null);
  };

  const handleEditAnnouncement = (e, announcementId) => {
    e.preventDefault();
    hideAlertMessage();
    announcementService.getById(announcementId, selectedInstitute.instituteId).then(data => {
      setEditForm(true);
      setAnnouncement(data);
    });
  }

  const editAnnouncement = (announcement) => {
    announcementService
      .update(announcement)
      .then(data => {
        setEditForm(false);
        setAnnouncement(null);
        getAllAnnouncements();
        showAlertMessage({
          title: "Success",
          message: "You have sucessfully updated an announcement",
          type: "success"
        });
      });
  }

  const handleAddNewAnnouncement = () => {
    setEditForm(true);  
    setAnnouncement(null);
  }

  const createAnnouncement = (announcement) => {
    announcementService
      .create(announcement)
      .then(announcementId => {
        setEditForm(false);
        setAnnouncement(null);
        getAllAnnouncements();

        showAlertMessage({
          title: "Success",
          message: "You have sucessfully created announcement",
          type: "success"
        });

        return announcementId;
      });
  }

  // refresh num of files after add/delete on Edit
  const updateAnnouncementInList = (fileNum) => {
    
    let x = announcements.map(a => {
      if (a.announcementId == announcement.announcementId)
        return {
          ...a, 
          fileNum
        }
      else
        return a;
    });
    setAnnouncements(x);
  }

  

  return (
    <React.Fragment>
        <Container>
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

      {editForm && (
        <React.Fragment>
            <HeaderMain title="Announcement administration" />
            <EditAnnouncements
              announcement={announcement}
              onCancel={handleCanceled}
              editAnnouncement={editAnnouncement}
              createAnnouncement={createAnnouncement}đ
              showAlertMessage={showAlertMessage}
              hideAlertMessage={hideAlertMessage}
              updateAnnouncementInList={updateAnnouncementInList}
            />
        </React.Fragment>
      )}

      {!editForm && (
        <React.Fragment>
            <HeaderMain title="Announcement administration" />
            {(announcements && (
              <AnnouncementList
                announcements={announcements}
                handleEditAnnouncement={handleEditAnnouncement}
                addNewClick={handleAddNewAnnouncement}
                getAllAnnouncements={getAllAnnouncements}                
              />
            )) || <Loading />}
        </React.Fragment>
      )}

      </Container>
    </React.Fragment>
  );
};

export default AdminAnnouncements;
