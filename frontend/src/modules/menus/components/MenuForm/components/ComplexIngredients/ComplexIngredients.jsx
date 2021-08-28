import React from 'react'
import { Chip } from '@material-ui/core'
import { useStyles } from '../../styles'
import { getComplexIngredients } from './helpers';

const ComplexIngredients = ({ menu }) => {
    const classes = useStyles(menu)

    return <>
        {getComplexIngredients(menu) ?.map(ingredient => <Chip className={classes.chip} label={`${ingredient.name}${ingredient.countLabel}`} color='secondary' />)}
    </>
}

export default ComplexIngredients

