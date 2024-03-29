import React from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'


const DateInput = ({ label, value, onChange, required, ...props }) => {
    // console.log(value)
    return <div style={{ width: 'auto', margin: '1em' }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                variant="inline"
                format="dd/MM/yyyy"
                label={label}
                value={value}
                onChange={onChange}
                required={required}
                {...props}
            />
        </MuiPickersUtilsProvider>
    </div>
}
export default DateInput