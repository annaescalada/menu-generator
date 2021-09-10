import React from 'react'
import _ from 'lodash'
import { Chip } from '@material-ui/core'
import { useStyles } from '../../styles'
import { useMacros } from './hooks';
import { chipsInfo } from './helpers';

const PlansChips = ({ plan }) => {
    const classes = useStyles()

    const [macros] = useMacros(plan)

    return <div className={classes.chipContainer}>
        {chipsInfo(macros).map(({ label, color }) => <Chip className={classes.chip} label={label} color={color ? color : 'secondary'} />)}
    </div>
}

export default PlansChips

