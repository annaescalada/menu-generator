import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Typography, makeStyles, Chip, Button, Paper } from '@material-ui/core'

import TextInput from '../../components/shared/TextInput.js';
import AutocompleteInput from '../../components/shared/AutocompleteInput.js';
import SelectInput from '../../components/shared/SelectInput.js';


const useStyles = makeStyles((theme) => ({
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '1em',
        padding: '1em'
    },
    chip: {
        margin: '0.5em',
        color: 'white',
        padding: '0.5em',
        maxWidth: 'fit-content'
    },
    button: {
        color: 'white',
        margin: '3em 1em 1em 1em',
        display: 'block',
        width: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '2em',
        padding: '2em'
    },
    menuContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    day: {
        background: theme.palette.primary.extraLight,
        padding: '1em',
        margin: '1em',
        borderRadius: '15px',
        minWidth: '20%',
        maxWidth: '29%'
    },
    meal: {
        padding: '1em',
        margin: '1em',
        borderRadius: '15px',
        background: theme.palette.secondary.extraLight
    }
}))

const MenuForm = ({ menu, setMenu, handleClick, enums = [], error, allIngredients, allRecipes }) => {
    const classes = useStyles()

    const [ingredientsOptions, setIngredientsOptions] = useState(allIngredients)
    const [recipesOptions, setRecipesOptions] = useState(allRecipes)

    const updateContent = (v, coordinates, key) => {
        setMenu(prev => ({
            ...prev,
            content: {
                ...prev ?.content,
                [coordinates]: {
                    ...prev.content ?.[coordinates],
                    [key]: v
                }
            }
        }))
    }

    const filterOptionsBySeasonAndTags = () => {
        let filteredIngredientsOptions = _.clone(allIngredients)
        let filteredRecipesOptions = _.clone(allRecipes)

        if (menu ?.season ?.length) {
            filteredIngredientsOptions = filteredIngredientsOptions.filter(recipe => _.intersection(recipe.season, menu.season).length)
            filteredRecipesOptions = filteredRecipesOptions.filter(recipe => _.intersection(recipe.season, menu.season).length)
        }

        if (menu ?.toIncludeTags ?.length) {
            filteredIngredientsOptions = filteredIngredientsOptions.filter(recipe => _.intersection(recipe.tags, menu.toIncludeTags).length)
            filteredRecipesOptions = filteredRecipesOptions.filter(recipe => _.intersection(recipe.tags, menu.toIncludeTags).length)
        }

        if (menu ?.toExcludeTags ?.length) {
            filteredIngredientsOptions = filteredIngredientsOptions.filter(recipe => !_.intersection(recipe.tags, menu.toExcludeTags).length)
            filteredRecipesOptions = filteredRecipesOptions.filter(recipe => !_.intersection(recipe.tags, menu.toExcludeTags).length)
        }

        setIngredientsOptions(filteredIngredientsOptions)
        setRecipesOptions(filteredRecipesOptions)
    }

    useEffect(() => {
        filterOptionsBySeasonAndTags()
    }, [menu.season, menu.toExcludeTags, menu.toIncludeTags])

    const filterRecipeOptions = (coordinates) => {
        let filteredOptions = _.clone(recipesOptions)

        const menuIngredients = menu.content ?.[coordinates] ?.ingredients ?.map(ingredient => ingredient._id)
        
        if (!menuIngredients ?.length) return filteredOptions

        return filteredOptions.filter(recipe => {
            const recipeIngredients = recipe.ingredients.map(ingredient => ingredient._id)
            return menuIngredients ?.length && _.intersection(recipeIngredients, menuIngredients || []).length
        })
    }

    const getComplexIngredients = () => {
        if (!menu.content) return

        const meals = Object.keys(menu.content)

        if (!meals ?.length) return

        let complexIngredients = []

        meals.forEach(meal => {
            menu.content[meal] ?.ingredients ?.forEach(ingredient => {
                if (ingredient.isComplex) complexIngredients.push(ingredient)
            })
            menu.content[meal] ?.recipe ?.ingredients ?.forEach(ingredient => {
                if (ingredient.isComplex) complexIngredients.push(ingredient)
            })
        })

        return _.uniqBy(complexIngredients, e => e._id).map(ingredient => {
            const count = _.countBy(complexIngredients, (rec) => rec._id === ingredient._id).true
            const countLabel = ingredient.portionAmount ? ` ${count} / ${ingredient.portionAmount}` : ` ${count}`
            return <Chip className={classes.chip} label={`${ingredient.name}${countLabel}`} color='secondary' />
        })

    }

    const buildGrid = () => enums.daysEnum ?.map(day => <div className={classes.day}>
        <Typography variant='h6'>{day}</Typography>
        {enums.menuMealEnum ?.map(meal => {
            const coordinates = `${day}_${meal}`

            return <div className={classes.meal}>
                <Typography variant='body1'>{meal}</Typography>
                <TextInput
                    label="Name"
                    value={menu.content ?.[coordinates] ?.name || []}
                    onChange={(v) => updateContent(v, coordinates, 'name')}
                />
                <AutocompleteInput
                    label='Ingredientes'
                    value={menu.content ?.[coordinates] ?.ingredients || []}
                    onChange={(v) => updateContent(v, coordinates, 'ingredients')}
                    getOptionLabel={option => `${option.name}`}
                    options={ingredientsOptions}
                    multiple
                />
                <AutocompleteInput
                    label='Receta'
                    value={menu.content ?.[coordinates] ?.recipe || ''}
                    onChange={(v) => updateContent(v, coordinates, 'recipe')}
                    getOptionLabel={option => `${option.name}`}
                    options={filterRecipeOptions(coordinates)}
                />
            </div>
        })}

    </div>)
    
    return <Paper className={classes.container}>
        <TextInput
            label="Name"
            value={menu.name}
            onChange={(v) => setMenu(prev => ({ ...prev, name: v }))}
            required
            error={error && !menu.name}
        />
        <SelectInput
            label="Season"
            multiple
            value={menu.season || []}
            onChange={(v) => setMenu(prev => ({ ...prev, season: v }))}
            required
            options={enums.seasonEnum}
        />
        <SelectInput
            label="Tags to include"
            multiple
            value={menu.toIncludeTags || []}
            onChange={(v) => setMenu(prev => ({ ...prev, toIncludeTags: v }))}
            options={enums.inclusiveTags}
        />
        <SelectInput
            label="Tags to exclude"
            multiple
            value={menu.toExcludeTags || []}
            onChange={(v) => setMenu(prev => ({ ...prev, toExcludeTags: v }))}
            options={enums.exclusiveTags}
        />
        <div className={classes.chipContainer}>
            {getComplexIngredients()}
        </div>
        <div className={classes.menuContainer}>
            {buildGrid()}
        </div>
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>

    </Paper>
}

export default MenuForm
