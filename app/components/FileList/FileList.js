import React from 'react';
import styles from './FileList.css';
import { InputGroup, InputGroupAddon, Input, ThemedButton } from '@/components';

var path = require('path');

export const FileList = ({
  files,
  setFiles,
  urls,
  setUrls,
  onUploadFile,
  onDownloadFile,
  onRemoveFile,
  onAddLink,
  onRemoveLink,
  showAlertMessage,
  updateAnnouncementInList,
  ...otherProps
}) => {
  const [
    isFileDragAndDropEnabled,
    setIsFileDragAndDropEnabled,
  ] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    setIsFileDragAndDropEnabled(!!window.FileReader);
  }, []);

  const inputFile = React.useRef(null);
  const handleImportFileClick = (event) => {
    inputFile.current.click();
  };

  const showFile = async (e) => {
    let x = e.target.files[0];
    handleUploadFile(x);
    e.target.value = '';
  };

  const handleKeyDown = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      ev.stopPropagation();

      handleAddLink(message);
    }
  };

  const handleUploadFile = (x) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      if (!files) return;
      let fileExists = files.filter((z) => z.name == x.name).length > 0;
      if (fileExists) return;

      const text = e.target.result;

      var file = {
        name: x.name,
        size: x.size,
        extension: path.extname(x.name),
        lastModifiedDate: x.lastModifiedDate,
        file: text,
        type: x.type,
        status: 'uploaded',
      };

      await onUploadFile(file);
      setFiles((z) => [...z, file]);
    };

    reader.readAsDataURL(x);
  };

  const handleAddLink = (url) => {
    let link = onAddLink(url);
    setUrls((z) => [...z, link]);
    setMessage('');
  };

  const dropHandler = (ev) => {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var x = ev.dataTransfer.items[i].getAsFile();
          handleUploadFile(x);
        }
      }
    }

    ev.target.value = '';
  };

  const downloadFile = (file) => {
    var block = file.file.split(';');
    var contentType = block[0].split(':')[1];
    var realData = block[1].split(',')[1];
    var blob = b64toBlob(realData, contentType);
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = file.name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
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

  return (
    <React.Fragment>
      <div className="mb-3">
        <InputGroup>
          <Input
            type="text"
            placeholder="Add link..."
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <InputGroupAddon addonType="append">
            <ThemedButton
              color="primary"
              title="Add your feedback/comment"
              onClick={() => handleAddLink(message)}
            >
              <i className="fa fa fa-send"></i>
            </ThemedButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      {isFileDragAndDropEnabled && (
        <React.Fragment>
          <div
            className={styles.browseFilesContainer}
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => allowDrop(e)}
            onClick={handleImportFileClick}
          >
            Browse or drag&drop the file
          </div>
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={showFile}
            style={{ display: 'none' }}
            accept={otherProps.accept || '.pdf'}
          />
        </React.Fragment>
      )}

      {urls &&
        urls.length > 0 &&
        urls.map((link) => {
          if (link && link.url && link.url.trim()) {
            let deleteFileClass = 'pull-right ' + styles.fileContainerDelete;
            let downloadFileClass = 'pull-left ' + styles.fileContainerDownload;

            return (
              <div className={styles.fileContainer} key={Math.random()}>
                <div className={downloadFileClass}>
                  <a href={link.url}>{link.url}</a>
                </div>

                <React.Fragment>
                  <div
                    className={deleteFileClass}
                    onClick={() => onRemoveLink(link)}
                  >
                    <i className="fa fa-fw fa-times"></i>
                  </div>
                  <div className="clearfix" />
                </React.Fragment>
              </div>
            );
          }
        })}

      {files &&
        files.length > 0 &&
        files.map((file) => {
          let deleteFileClass = 'pull-right ' + styles.fileContainerDelete;
          let downloadFileClass = 'pull-left ' + styles.fileContainerDownload;

          return (
            <div className={styles.fileContainer} key={file.name}>
              <div
                className={downloadFileClass}
                onClick={async () => downloadFile(await onDownloadFile(file))}
              >
                {file.name} ({file.size})
              </div>

              {(file.status == 'readyForUpload' && (
                <React.Fragment>
                  <div className={deleteFileClass}>Uploading....</div>
                  <div className="clearfix" />
                </React.Fragment>
              )) ||
                (file.status == 'error' && (
                  <React.Fragment>
                    <div
                      className={deleteFileClass}
                      onClick={() => {
                        onUploadFile(file);
                      }}
                    >
                      Try again
                    </div>
                    <div className="clearfix" />
                  </React.Fragment>
                )) || (
                  <React.Fragment>
                    <div
                      className={deleteFileClass}
                      onClick={
                        () => onRemoveFile(file)
                        //handleRemoveFile(file.announcementFileId, file.name)
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
