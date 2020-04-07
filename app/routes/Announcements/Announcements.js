import React from "react";
import { HeaderMain } from "@/routes/components/HeaderMain";
import AnnouncementList from "./AnnouncementList";
import { announcementService } from "@/services";
import { Container, Loading } from "@/components";
import { useAppState } from '@/components/AppState';

const Announcements = () => {
  const [announcements, setAnnouncements] = React.useState(null);  
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const [selectedAnnouncements, setSelectedAnnouncements] = React.useState([]);

  React.useEffect(() => {
    announcementService.getByUserAll(selectedInstitute.instituteId).then(data => {
      setAnnouncements(data);
    });
  }, []);

  const handleSelected = (announcementId, e) => {
    if(e.target.checked) {
      setSelectedAnnouncements([...selectedAnnouncements, announcementId]);
    }
    else {
        setSelectedPrograms(selectedAnnouncements.filter(a => a != announcementId));
    }
  }

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Announcements" />
        {(announcements && (
          <AnnouncementList
            announcements={announcements.announcements}
            files={announcements.files}
            onSelected={handleSelected}
          />
        )) || <Loading />}
      </Container>
    </React.Fragment>
  );
};

export default Announcements;