import React from 'react'
import { InputLabel, FormControl, MenuItem, Select, Chip } from '@material-ui/core';

const SelectInput = ({ label, value, onChange, options = [], required, multiple = false, disabled, error, ...props }) => <FormControl
    style={{ margin: '1em' }}
    required={required}
    disabled={disabled}
    error={error}
>
    <InputLabel htmlFor='idid'>{label}</InputLabel>
    <Select
        multiple={multiple}
        value={value}
        onChange={e => onChange(e?.target?.value)}
        inputProps={{
            name: { label },
            id: 'idid',
        }}
        {...props}
        renderValue={selected => multiple ? selected.map(value => <Chip style={{ color: 'white', margin: '0 0.3em 0 0' }} key={value} color="secondary" label={value} />) : selected}
    >
        {options.map(v => <MenuItem value={v}>{v}</MenuItem>)}
    </Select>
</FormControl>

export default SelectInput