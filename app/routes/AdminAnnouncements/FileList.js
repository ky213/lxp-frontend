import React from "react";
import { useIntl } from "react-intl";
import { announcementService } from "@/services";
import styles from "./FileList.css";
var path = require("path");

const FileList = ({
  announcement,
  files,
  setFiles,
  uploadFile,
  showAlertMessage,
  updateAnnouncementInList
}) => {
  
  const intl = useIntl();

  const [
    isFileDragAndDropEnabled,
    setIsFileDragAndDropEnabled
  ] = React.useState(false);

  React.useEffect(() => {
    setIsFileDragAndDropEnabled(!!window.FileReader);
  }, []);

  const inputFile = React.useRef(null);
  const handleImportFileClick = event => {
    inputFile.current.click();
  };

  const showFile = async e => {
    let x = e.target.files[0];
    handleUploadFile(x);
    e.target.value = "";
  };

  const handleRemoveFile = (announcementFileId, fileName) => {
    if (announcementFileId) {
      announcementService.deleteFile(announcementFileId).then(data => {
        updateAnnouncementInList(files.length - 1);
        setFiles(z =>
          z.filter(file => file.announcementFileId != announcementFileId)
        );

        showAlertMessage({
          title: intl.formatMessage({ id: 'General.Success'}),
          message: intl.formatMessage({ id: 'File.FileDeleteSuccess'}),
          type: "success"
        });
      });
    } else if (fileName) {
      setFiles(z => z.filter(file => file.name != fileName));
    }
  };

  const handleUploadFile = (x) => {
    const reader = new FileReader();
    
    reader.onload = async e => {
      let fileExists = files.filter(z => z.name == x.name).length > 0;
      if (fileExists) return;

      const text = e.target.result;

      var file = {
        name: x.name,
        size: x.size,
        extension: path.extname(x.name),
        lastModifiedDate: x.lastModifiedDate,
        file: text,
        type: x.type,
        status: "uploaded"
      };

      if (announcement) {
        file = {
          ...file,
          announcementId: announcement.announcementId,
          status: "readyForUpload"
        };
        uploadFile(file);
      }
      
      setFiles(z => [...z, file]);
    };

    reader.readAsDataURL(x);    
  }

  const dropHandler = ev => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          var x = ev.dataTransfer.items[i].getAsFile();
          handleUploadFile(x);
        }
      }
    }

    ev.target.value = "";
  };

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

  const allowDrop = e => {
    e.preventDefault();
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

  const handleDownloadFile = (announcementFileId, fileName) => {
    if (announcementFileId) {
      announcementService
        .downloadFile(announcementFileId)
        .then(data => {
          downloadFile(data);
        })
        .catch(err => console.log("error", err));
    } else if (fileName) {
      let x = files.find(z => z.name == fileName);

      if (x) {
        downloadFile(x);
      }
    }
  };

  return (
    <React.Fragment>
      {isFileDragAndDropEnabled && (
        <React.Fragment>
          <div
            className={styles.browseFilesContainer}
            onDrop={e => dropHandler(e)}
            onDragOver={e => allowDrop(e)}
            onClick={handleImportFileClick}
          >            
            {intl.formatMessage({ id: 'File.BrowseOrDragAndDrop'})}
          </div>
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={showFile}
            style={{ display: "none" }}
          />
        </React.Fragment>
      )}

      {files &&
        files.length > 0 &&
        files.map(file => {
          let deleteFileClass = "pull-right " + styles.fileContainerDelete;
          let downloadFileClass = "pull-left " + styles.fileContainerDownload;

          return (
            <div className={styles.fileContainer} key={file.name}>
              <div
                className={downloadFileClass}
                onClick={() =>
                  handleDownloadFile(file.announcementFileId, file.name)
                }
              >
                {file.name} ({file.size})
              </div>

              {file.status == "readyForUpload" && (
                <React.Fragment>
                  <div
                    className={deleteFileClass}                    
                  >
                    {intl.formatMessage({ id: 'File.Uploading'})}
                  </div>
                  <div className="clearfix" />
                </React.Fragment>
              )
              || 
              file.status == "error" && (
                <React.Fragment>
                  <div
                    className={deleteFileClass}
                  >
                    {intl.formatMessage({ id: 'File.TryAgain'})}
                  </div>
                  <div className="clearfix" />
                </React.Fragment>
              ) 
              || (
                <React.Fragment>
                  <div
                    className={deleteFileClass}
                    onClick={() =>
                      handleRemoveFile(file.announcementFileId, file.name)
                    }
                  >
                    <i className="fa fa-fw fa-times"></i>
                  </div>
                  <div className="clearfix" />
                </React.Fragment>
              )}
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default FileList;
