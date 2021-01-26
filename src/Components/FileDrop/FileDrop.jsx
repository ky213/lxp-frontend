import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import './styles.module.css';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileDrop = () => {
  const [files, setFiles] = useState([]);
  console.log(files);
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
