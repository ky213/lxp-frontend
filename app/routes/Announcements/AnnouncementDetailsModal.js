import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InvalidFeedback
} from "@/components";
import ThemedButton from "@/components/ThemedButton";
import { announcementService } from "@/services";
import styles from './Announcements.css';

const AnnouncementDetailsModal = ({
  announcement,
  files,
  isOpen,
  closeAnnouncementDetails
}) => {
  function createMarkup(html) {
    return { __html: html };
  }

  const handleDownloadFile = (announcementFileId) => {
    if (announcementFileId) {
      announcementService
        .downloadFile(announcementFileId)
        .then(data => {
          downloadFile(data);
        })
        .catch(err => console.log("error", err));
    }
  };

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  const downloadFile = file => {
    var block = file.file.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    var blob = b64toBlob(realData, contentType);
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    announcement && (
      <Modal size="lg" isOpen={isOpen} className="modal-outline-primary">
        <React.Fragment>
          <ModalHeader tag="h6">{announcement.title}</ModalHeader>
          <ModalBody>
            <Row>
              <Col lg={12}>
                <div
                  // className={styles.text}
                  dangerouslySetInnerHTML={createMarkup(announcement.text)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {files && files.length > 0 && (
                  <React.Fragment>
                    {files.map((file, i) => (
                      <div className={styles.fileContainer} key={file.name}>
                      <div
                        className={styles.fileContainerDownload}
                        onClick={() => handleDownloadFile(file.announcementFileId)}
                      >
                        {file.name} ({file.size})
                      </div>
                    </div>
                    ))}
                  </React.Fragment>
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <ThemedButton onClick={closeAnnouncementDetails}>
              Close
            </ThemedButton>
          </ModalFooter>
        </React.Fragment>
      </Modal>
    )
  );
};

export default AnnouncementDetailsModal;
