import React from 'react'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core';

const AutocompleteInput = ({ label, value, onChange, options, getOptionLabel, multiple, variant = "standard", ...props }) => <div style={{ width: 'auto', margin: '1em' }}>
    <Autocomplete
        value={value}
        onChange={(e, v) => onChange(v)}
        options={options}
        multiple={multiple}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => <TextField variant={variant} {...params} label={label} {...props} />}
    />
</div>

export default AutocompleteInput