import React from "react";
import Loading from "@/components/Loading";
import { announcementService } from "@/services";
import RmsCarousel from "@/components/RmsCarousel";
import styles from './Announcement.css';
import { useAppState, AppStateContext } from '@/components/AppState';
import {useInterval} from '@/helpers';

const Announcement = () => {
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const loggedInUser = currentUser && currentUser.user || null;
  const [announcements, setAnnouncements] = React.useState([]);

  React.useEffect(() => {    
    getAnnouncements();
  }, []);

  useInterval(() => {
    if(loggedInUser) {
      getAnnouncements();
    }
  }, 10000);

  const getAnnouncements = () => {
    if (selectedInstitute) {
      announcementService.getByUser(selectedInstitute.instituteId).then(data => {
        setAnnouncements(data);
      });
    }
  }

  return (
    <React.Fragment>
      {(announcements &&
        announcements.announcements &&
        announcements.announcements.length == 0 && (
          <React.Fragment></React.Fragment>
        )) ||
        (announcements &&
          announcements.announcements &&
          announcements.announcements.length > 0 && (
            
            <div className={styles.announcement}>
              {announcements && announcements.announcements && announcements.announcements.length > 0 && 
                <RmsCarousel data={announcements} getAnnouncements={getAnnouncements} /> 
              || <Loading />}               
            </div>
             
          )) 
        }
    </React.Fragment>
  );
};

export default Announcement;
