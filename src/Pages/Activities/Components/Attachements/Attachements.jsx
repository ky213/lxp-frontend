import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FileDrop } from 'react-file-drop';
import Send from '@material-ui/icons/NearMe';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { TextField } from 'Components';
import uploadicon from 'Assets/Images/upload.svg';
import classes from './styles.module.css';

const Attachements = props => {
  const fileInputRef = useRef(null);

  const onDropHandler = (files, event) => {};
  const onFileInputChange = event => {
    console.log(event.target.files);
  };
  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={classes.container}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary">
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <input onChange={onFileInputChange} ref={fileInputRef} type="file" className={classes.hidden} />
      <FileDrop
        onDrop={(files, event) => onDropHandler(files, event)}
        onTargetClick={onTargetClick}
        className={classes.drop}
        draggingOverFrameClassName={classes.onDrag}
        targetClassName={classes.dropInner}
      >
        <div className={classes.uploadBut}>
          <img src={uploadicon} />
          <p>Select file</p>
        </div>
        <p className={classes.dragText}>or grag and drop files here</p>
      </FileDrop>
    </div>
  );
};

export default Attachements;

Attachements.propType = {
  activity: PropTypes.object.isRequired,
};
