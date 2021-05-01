import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Typography, makeStyles, Chip, Button, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
    },
    docButton: {
        color: theme.palette.primary.main,
        margin: '1.5em 0 0 0'
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.primary.main,
    },
}))

const MenuForm = ({ menu, setMenu, handleClick, enums = [], error, allIngredients, allRecipes, setSelectedRecipes }) => {
    const classes = useStyles()

    const [ingredientsOptions, setIngredientsOptions] = useState(allIngredients)
    const [recipesOptions, setRecipesOptions] = useState(allRecipes)

    const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

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

    useEffect(() => {
        setSelectedRecipesOnMenuChange()
    }, [menu.content])

    const setSelectedRecipesOnMenuChange = () => {
        if (!menu.content) return

        const meals = Object.keys(menu.content)

        if (!meals ?.length) return setSelectedRecipes([])

        let recipes = []

        meals.forEach(meal => {
            if (menu.content[meal].recipe) recipes.push(menu.content[meal].recipe)
        })

        meals.forEach(meal => {
            if (menu.content[meal].ingredients) {
                menu.content[meal].ingredients.forEach(ing => {
                    if (ing.isComplex) {
                        recipes.push(ing)
                    }
                })
            }
        })

        setSelectedRecipes(_.uniqBy(recipes, e => e._id))
    }

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

        const getComplex = (ingredients) => {
            if (!ingredients) return
            ingredients.forEach(ingredient => {
                if (ingredient.isComplex) {
                    if (!ingredient.portionAmount
                        || ingredient.portionAmount && !complexIngredients.find(_ingredient => _ingredient._id === ingredient._id)) {
                        getComplex(ingredient.ingredients)
                    }
                    complexIngredients.push(ingredient)
                }
            })
        }

        meals.forEach(meal => {
            getComplex(menu.content[meal] ?.ingredients)
            getComplex(menu.content[meal] ?.recipe ?.ingredients)
        })

        return _.uniqBy(complexIngredients, e => e._id).map(ingredient => {
            const count = _.countBy(complexIngredients, (rec) => rec._id === ingredient._id).true
            const countLabel = ingredient.portionAmount ? ` ${count} / ${ingredient.portionAmount}` : ` ${count}`
            return <Chip className={classes.chip} label={`${ingredient.name}${countLabel}`} color='secondary' />
        })

    }

    const getVeggies = () => {
        if (!menu.content) return

        const meals = Object.keys(menu.content)

        if (!meals ?.length) return

        let veggies = []

        const getComplex = (ingredients) => {
            if (!ingredients) return
            ingredients.forEach(ingredient => {
                if (ingredient.isComplex) {
                    if (!ingredient.portionAmount
                        || ingredient.portionAmount && !veggies.find(_ingredient => _ingredient._id === ingredient._id)) {
                        getComplex(ingredient.ingredients)
                    }
                    veggies.push(ingredient)
                }
            })
        }

        meals.forEach(meal => {
            menu.content[meal] ?.ingredients ?.forEach(ingredient => {
                if (['hortalizas', 'crucíferas', 'otras verduras'].includes(ingredient.group)) {
                    veggies.push(ingredient)
                }
            })

            menu.content[meal] ?.recipe ?.ingredients ?.forEach(ingredient => {
                console.log(ingredient.group)
                if (['hortalizas', 'crucíferas', 'otras verduras'].includes(ingredient.group)) {
                    veggies.push(ingredient)
                }
            })
        })

        return _.uniqBy(veggies, e => e._id).map(ingredient => {
            const count = _.countBy(veggies, (rec) => rec._id === ingredient._id).true
            return <Chip className={classes.chip} label={`${ingredient.name} ${count}`} color='primary' />
        })

    }

    const buildGrid = (content) => enums.daysEnum ?.map(day => <div className={classes.day}>
        <Typography align='center' variant='h6'>{firstUppercase(day)}</Typography>
        {enums.menuMealEnum ?.map(meal => {
            const coordinates = `${day}_${meal}`

            return <div className={classes.meal}>
                <Typography align='center' variant='body1'>{firstUppercase(meal)}</Typography>
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
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link className={classes.link} to={`/menu-grid`}>
                <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Menú</Button>
            </Link>
            <Link className={classes.link} to={`/grocery-list`}>
                <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Lista de la compra</Button>
            </Link>
            <Link className={classes.link} to={`/recipe-book`}>
                <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Recetario</Button>
            </Link>
            {/* <Link className={classes.link} to={`/meal-prep`}>
                <Button className={classes.docButton} onClick={() => { }} color="primary" variant="outlined">Meal prep</Button>
            </Link> */}
        </div>
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
            {getVeggies()}
        </div>
        <div className={classes.menuContainer}>
            {buildGrid()}
        </div>
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>

    </Paper>
}

export default MenuForm

