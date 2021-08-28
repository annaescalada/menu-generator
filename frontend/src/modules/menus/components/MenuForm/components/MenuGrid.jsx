import React from 'react'
import _ from 'lodash'
import { Typography } from '@material-ui/core'

import AutocompleteInput from '../../../../../components/shared/AutocompleteInput';
import TextInput from '../../../../../components/shared/TextInput';
import { useStyles } from '../styles'
import { firstUppercase, updateContent, filterRecipeOptions } from '../helpers';

const MenuGrid = ({ menu, setMenu, enums, ingredientsOptions, recipesOptions }) => {
    const classes = useStyles()

    const { daysEnum: days, menuMealEnum: meals } = enums
    return <div className={classes.menuContainer}>
        {days.map(day => <>
            <div className={classes.day}>
                <Typography align='center' variant='h6'>{firstUppercase(day)}</Typography>
                {meals.map(meal => {
                    const coordinates = `${day}_${meal}`

                    return <>
                        <div className={classes.meal}>
                            <Typography align='center' variant='body1'>{firstUppercase(meal)}</Typography>
                            <TextInput
                                label="Name"
                                value={menu.content ?.[coordinates] ?.name || []}
                                onChange={(v) => updateContent(v, coordinates, 'name', setMenu)}
                            />
                            <AutocompleteInput
                                label='Ingredientes'
                                value={menu.content ?.[coordinates] ?.ingredients || []}
                                onChange={(v) => updateContent(v, coordinates, 'ingredients', setMenu)}
                                getOptionLabel={option => `${option.name}`}
                                options={ingredientsOptions}
                                multiple
                            />
                            <AutocompleteInput
                                label='Receta'
                                value={menu.content ?.[coordinates] ?.recipe || ''}
                                onChange={(v) => updateContent(v, coordinates, 'recipe', setMenu)}
                                getOptionLabel={option => `${option.name}`}
                                options={filterRecipeOptions(menu, coordinates, recipesOptions)}
                            />
                        </div>
                    </>
                })}
            </div>
        </>)}
    </div>
}

export default MenuGrid

