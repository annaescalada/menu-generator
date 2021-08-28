import React from 'react'
import { Typography } from '@material-ui/core'
import _ from 'lodash'
import { useStyles } from '../../styles';
import { getIngredientsList } from './helpers';

const IngredientsList = ({ recipe }) => {
    const classes = useStyles()

    return <div className={classes.ingredientContainer}>
        {getIngredientsList(recipe)?.map(ingredient => <Typography>{ingredient.recipePortion}{ingredient.unit} {ingredient.name}</Typography>)}
    </div>
}

export default IngredientsList