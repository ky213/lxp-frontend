import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from 'ckeditor4-react';

export default function TextEditor({ name, data, onChange }) {
  return (
    <div style={{ margin: '15px 0 20px 0' }}>
      <CKEditor
        name={name}
        data={data}
        onChange={onChange}
        config={{
          extraPlugins: 'language,bidi,justify',
          language_list: ['ar:Arabic:rtl', 'en:English'],
          removeButtons: 'About',
        }}
      />
    </div>
  );
}

TextEditor.propTypes = {
  name: PropTypes.string,
  data: PropTypes.string,
  onChange: PropTypes.func,
};
