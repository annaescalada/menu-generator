import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import _ from 'lodash'
import { useStyles } from '../../styles'
import { recipeStructure } from '../../../../helpers'
import AutocompleteInput from '../../../../../../components/shared/AutocompleteInput';
import { handleIngredients } from '../../../../../ingredients/components/IngredientsForm/helpers';

const IngredientFilter = ({ recipe, setRecipe, enums, allIngredients }) => {
    const classes = useStyles()

    const [activeFilter, setActiveFilter] = useState('All')
    const [ingredientFilter, setIngredientFilter] = useState([])

    return <>
        <div className={classes.subContainer}>
            <Button
                className={[classes.filter, activeFilter === 'All' && classes.active].join(' ')}
                onClick={() => {
                    setIngredientFilter([])
                    setActiveFilter('All')
                }}
                color='primary'>
                <img
                    className={classes.img}
                    src={`/images/Food-icons/vowl.png`}
                    alt="icon meal"
                />
            </Button>
            {recipeStructure(recipe.meal).map(({ icon, options, required }) => {
                const isActive = activeFilter === icon
                return <>
                    <Button
                        className={[classes.filter, isActive && classes.active, required && classes.required].join(' ')}
                        onClick={() => {
                            setIngredientFilter(options)
                            setActiveFilter(icon)
                        }}
                        color='primary'>
                        <img
                            className={classes.img}
                            src={`/images/Food-icons/${icon}.png`}
                            alt="icon meal"
                        />
                    </Button>
                </>
            }
            )}
        </div>
        <AutocompleteInput
            label='Ingredients'
            value={recipe.ingredients || []}
            onChange={(v) => handleIngredients(v, setRecipe, enums)}
            getOptionLabel={option => option.name}
            multiple
            options={ingredientFilter.length ? allIngredients.filter(el => ingredientFilter.includes(el.group)) : allIngredients}
        />
    </>
}

export default IngredientFilter