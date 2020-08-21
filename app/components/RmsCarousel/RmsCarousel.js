import React from 'react';
import styles from './RmsCarousel.css';
import RmsCarouselFile from './RmsCarouselFile';
import { announcementService } from '@/services';

/*
  data: {
    announcements
    files
  }
*/
const timeSecond = 10;

const RmsCarousel = ({ data, getAnnouncements }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedItemFiles, setSelectedItemFiles] = React.useState([]);
  const [to, setTo] = React.useState(null);

  React.useEffect(() => {
    setSelectedItem(data.announcements[activeIndex]);
  }, []);

  React.useEffect(() => {
    clearTimeout(to);
    setActiveIndex(0);
    if (activeIndex == 0) {
      setSelectedItem(data.announcements[activeIndex]);
      loopRmsCarousel();
    }
  }, [data]);

  React.useEffect(() => {
    let x = activeIndex % data.announcements.length;
    setSelectedItem(data.announcements[x]);
    loopRmsCarousel();
  }, [activeIndex]);

  const loopRmsCarousel = () => {
    if (to) {
      clearTimeout(to);
    }

    let t = setTimeout(
      function () {
        let x = (activeIndex + 1) % data.announcements.length;
        setActiveIndex(x);
      }.bind(this),
      timeSecond * 1000
    );
    setTo(t);
  };

  React.useEffect(() => {
    if (selectedItem)
      setSelectedItemFiles(
        data.files.filter(
          (f) => f.announcementId == selectedItem.announcementId
        )
      );
  }, [selectedItem]);

  const handleClick = (i) => {
    setActiveIndex(i);
  };

  function createMarkup(html) {
    return { __html: html };
  }

  const markAsRead = () => {
    announcementService
      .markAnnouncementAsRead(selectedItem.announcementId)
      .then((data) => {
        getAnnouncements();
      });
  };

  return (
    selectedItem && (
      <React.Fragment>
        <div className={styles.rmsCarousel}>
          <h6 className={styles.title}>
            {selectedItem.title}
            <span onClick={markAsRead} className={styles.markAsRead}>
              Dismiss
            </span>
          </h6>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={createMarkup(selectedItem.text)}
          />
          <div className={styles.files}></div>

          {selectedItemFiles && selectedItemFiles.length > 0 && (
            <React.Fragment>
              {selectedItemFiles.map((file, i) => (
                <RmsCarouselFile file={file} />
              ))}
            </React.Fragment>
          )}

          <div className={styles.paging}>
            {data.announcements.map((x, i) => {
              if (activeIndex == i)
                return (
                  <div className={[styles.page, styles.active].join(' ')}></div>
                );
              else
                return (
                  <div
                    className={styles.page}
                    onClick={() => handleClick(i)}
                  ></div>
                );
            })}
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default RmsCarousel;
