import React from 'react'
import { TextField } from '@material-ui/core'

const TextInput = ({ label, value, onChange, required, ...props }) => <div style={{ width: 'auto', margin: '1em' }}>
    <TextField
        style={{ width: '-webkit-fill-available' }}
        id={label}
        label={label}
        value={value}
        onChange={e => onChange(e?.target?.value)}
        required={required}
        {...props}
    />
</div>

export default TextInput