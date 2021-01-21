import React, { Component, useRef, useState } from 'react';
import classes from './FileControlls.module.css';
import { FileDrop } from 'react-file-drop';
import { useTranslation } from 'react-i18next';
import ImageFile from './ImageFile/ImageFile';
import uploadicon from 'Assets/Images/upload.svg';

const FieldImageInput = ({ input, meta, ...props }) => {
  const { t, i18n } = useTranslation();
  const hasError = meta?.touched && meta?.error;

  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);

  const onFileInputChange = event => {
    const newFiles = [];
    const newFilesToPush = [...event.target.files];
    newFilesToPush.forEach(item => {
      newFiles.push(item);
      input.onChange(item);
    });
    setFiles(newFiles);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };
  const onDropHandler = (files, event) => {
    const newFilesToPush = [...files];
    const newFiles = [];
    newFilesToPush.forEach(item => {
      newFiles.push(item);
    });
    setFiles(newFiles);
  };

  const handleRemoveFile = index => {
    setFiles([]);
    input.onChange();
  };

  let viewFiles = [];

  viewFiles = files.map((f, index) => {
    return <ImageFile image={f} index={index} handleRemoveFile={handleRemoveFile} />;
  });

  return (
    <div className={classes.file + ' ' + (hasError ? classes.error : '')}>
      {files.length < 1 ? (
        <div className={classes.dragNdrop}>
          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className={classes.hidden}
            accept=".jpg, .png, .jpeg"
          />
          <FileDrop
            onDrop={(files, event) => onDropHandler(files, event)}
            onTargetClick={onTargetClick}
            className={classes.drop}
            draggingOverFrameClassName={classes.onDrag}
            targetClassName={classes.dropInner}
          >
            <div className={classes.uploadBut}>
              <img src={uploadicon} />
              <p>{props.downloadText}</p>
            </div>
            <p className={classes.dragText}>{props.dragText}</p>
          </FileDrop>
        </div>
      ) : (
        <div className={classes.files}>{viewFiles}</div>
      )}
      {hasError && <span>{meta?.error}</span>}
    </div>
  );
};

export default FieldImageInput;
