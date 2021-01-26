import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './styles.module.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileDrop = ({ title, type, getFiles }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles(files);
  }, [files]);

  return (
    <div className="App">
      <FilePond
        files={files}
        allowReorder={true}
        onupdatefiles={setFiles}
        labelIdle='<span class="filepond--label-action"><img src="/static/media/upload.1e37f923.svg"> Upload image</span> or drag and drop the image here '
      />
    </div>
  );
};

export default FileDrop;

FileDrop.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  getFiles: PropTypes.func,
};
