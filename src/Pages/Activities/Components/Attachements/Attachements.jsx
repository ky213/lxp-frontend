import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FileDrop } from 'react-file-drop';
import Send from '@material-ui/icons/NearMe';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import { TextField, CircularProgress } from 'Components';
import { addActivityLink, addActivityFile } from 'Store/Reducers/activities';
import uploadicon from 'Assets/Images/upload.svg';
import classes from './styles.module.css';

const Attachements = props => {
  const linkInputRef = useRef('');
  const fileInputRef = useRef(null);
  const [link, setLink] = useState('');

  const { activities, profile } = props;

  useEffect(() => {
    if (!activities.loading) linkInputRef.current.children[0].value = '';
  }, [activities.loading]);

  const onDropHandler = (files, event) => {};
  const onFileInputChange = event => {
    const form = new FormData();
    const file = event.target.files[0];
    if (file) {
      form.append('file', file.name);
      form.append('name', file.name);
      form.append('extension', file.extension);
      form.append('lastModifiedDate', file.lastModified);
      form.append('size', file.size);
      form.append('type', file.type);
      form.append('status', 'uploaded');
      form.append('activityId', activities.currentActivity?.activityId);

      props.addActivityFile(profile.organizationId, form, file);
    }
  };
  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const handleAddLink = () => {
    if (link) props.addActivityLink(profile.organizationId, activities.currentActivity.activityId, link);
  };

  return (
    <div className={classes.container}>
      <TextField
        onChange={event => setLink(event.target.value)}
        InputProps={{
          ref: linkInputRef,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={handleAddLink}>
                {activities.loading && link ? <CircularProgress color="primary" size={20} /> : <Send />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        disabled={!activities.currentActivity}
        fullWidth
        required
      />
      <div>
        <input
          onChange={onFileInputChange}
          ref={fileInputRef}
          type="file"
          className={classes.hidden}
          accept=".pdf"
          disabled={!activities.currentActivity}
        />
        <FileDrop
          className={classes.drop}
          draggingOverFrameClassName={classes.onDrag}
          targetClassName={classes.dropInner}
          onDrop={onDropHandler}
          onTargetClick={onTargetClick}
        >
          <div className={classes.uploadBut}>
            {activities.loading && fileInputRef.current.files[0] ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              <img src={uploadicon} />
            )}
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
  profile: state.authentication.profile,
});

const mapDispatchToProps = {
  addActivityLink,
  addActivityFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Attachements);
