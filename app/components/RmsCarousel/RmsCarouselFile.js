import React from 'react';
import { announcementService } from "@/services";
import styles from './RmsCarouselFile.css';

var path = require("path");

const RmsCarousel = ({file}) => {
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
    <div className={styles.fileContainer} key={file.name}>
      <div
        className={styles.fileContainerDownload}
        onClick={() => handleDownloadFile(file.announcementFileId)}
      >
        {file.name} ({file.size})
      </div>
    </div>
  );
};

export default RmsCarousel;