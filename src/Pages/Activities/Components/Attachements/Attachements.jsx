import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FileDrop } from 'react-file-drop';
import Send from '@material-ui/icons/NearMe';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { TextField, CircularProgress } from 'Components';
import uploadicon from 'Assets/Images/upload.svg';
import classes from './styles.module.css';
import { activities } from 'Store/Reducers';

const Attachements = props => {
  const fileInputRef = useRef(null);
  const [link, setLink] = useState('');

  const onDropHandler = (files, event) => {};
  const onFileInputChange = event => {
    console.log(event.target.files);
  };
  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const handleAddLink = () => {
    console.log(link);
  };

  return (
    <div className={classes.container}>
      <TextField
        onChange={event => setLink(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={handleAddLink}>
                {activities.loading ? <CircularProgress color="primary" size={20} /> : <Send />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        required
      />
      <div>
        <input onChange={onFileInputChange} ref={fileInputRef} type="file" className={classes.hidden} accept=".pdf" />
        <FileDrop
          className={classes.drop}
          draggingOverFrameClassName={classes.onDrag}
          targetClassName={classes.dropInner}
          onDrop={onDropHandler}
          onTargetClick={onTargetClick}
        >
          <div className={classes.uploadBut}>
            <img src={uploadicon} />
            <p>Select file</p>
          </div>
          <p className={classes.dragText}>or grag and drop files here</p>
        </FileDrop>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  activities: state.activities,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Attachements);
