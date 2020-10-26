import React from 'react'
import CKEditor from 'ckeditor4-react'

export default function TextEditor({ data, onChange }) {
  return (
    <CKEditor
      data={data}
      config={{
        extraPlugins: 'language,bidi,justify',
        language_list: ['ar:Arabic:rtl', 'en:English'],
        removeButtons: 'About',
      }}
      onChange={onChange}
    />
  )
}
