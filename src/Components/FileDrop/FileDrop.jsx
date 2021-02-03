import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './styles.module.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

const FileDrop = ({ fileTypes, getFiles, defaultImage }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles(files.map(file => file.file));
  }, [files]);

  useEffect(() => {
    if (defaultImage) setFiles([defaultImage]);
    return () => {
      setFiles([]);
    };
  }, []);

  return (
    <div className="App">
      <FilePond
        files={files}
        acceptedFileTypes={fileTypes}
        onupdatefiles={setFiles}
        labelIdle='<span class="filepond--label-action"><img src="/static/media/upload.1e37f923.svg"> Upload file</span> or drag and drop the file here '
      />
    </div>
  );
};

export default FileDrop;

FileDrop.propTypes = {
  title: PropTypes.string,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  defaultImage: PropTypes.string,
  getFiles: PropTypes.func,
};
