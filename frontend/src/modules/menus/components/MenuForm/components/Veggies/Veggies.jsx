import React from 'react'
import _ from 'lodash'
import { Chip } from '@material-ui/core'
import { useStyles } from '../../styles'
import { getVeggies } from './helpers';

const Veggies = ({ menu }) => {
    const classes = useStyles()

    return <>
        {getVeggies(menu)?.map(ingredient => <Chip className={classes.chip} label={`${ingredient.name} ${ingredient.count}`} color='primary' />)}
    </>
}

export default Veggies

