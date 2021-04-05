import React from 'react'
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

const RadioInput = ({ label, value, onChange, options, required }) => <FormControl style={{ margin: '1em' }} required={required} component="fieldset">
    <FormLabel component="legend">{label}</FormLabel>
    <RadioGroup aria-label={label} name={label} value={value} onChange={onChange}>
        {options.map(({ value, label }) => <FormControlLabel value={value} control={<Radio />} label={label} />)}
    </RadioGroup>
</FormControl>

export default RadioInput