import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const EditableInput = ({ value, onChange }) => {

    return <div style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-s', marginTop: '2em' }}>
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData()
                onChange(data)
            }}
        />
    </div>
}

export default EditableInput