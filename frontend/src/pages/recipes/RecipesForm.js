import React, { useEffect, useState } from 'react'
import { Button, makeStyles, Paper, Chip, Grid, Typography } from '@material-ui/core'
import _ from 'lodash'
import TextInput from '../../components/shared/TextInput'
import SelectInput from '../../components/shared/SelectInput'
import AutocompleteInput from '../../components/shared/AutocompleteInput'
import EditableInput from '../../components/shared/EditableInput';
import { config } from './recipesConfig'

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        margin: '1em'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2em',
        padding: '2em'

    },
    subContainer: {
        justifyContent: 'center',
        display: 'flex',
        margin: '1em',
        padding: '1em'
    },
    ingredientContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1em',
        padding: '1em'
    },
    filter: {
        margin: '0.2em',
        height: '3em',
        background: 'none',
        "&:hover": {
            background: theme.palette.primary.extraLight,
        }
    },
    required: {
        background: theme.palette.primary.extraLight,
    },
    input: {
        background: theme.palette.primary.extraLight,
        borderRadius: '20px',
        padding: '0em',
        margin: '0.5em'
    },
    chip: {
        margin: '0.2em',
        color: 'white',
        padding: '0.5em'
    },
    img: {
        height: '3em',
        marginTop: '-2em'
    },
}))

const RecipesForm = ({ recipe, setRecipe, error, handleClick, allIngredients, enums }) => {
    const classes = useStyles()

    const { recipeStructure } = config

    const [ingredientFilter, setIngredientFilter] = useState([])

    const handleIngredients = async (v) => {
        setRecipe(prev => ({
            ...prev,
            ingredients: v,
            season: _.intersection(...v.map(ingredient => ingredient.season)),
            tags: getTags(v)
        }))
    }

    const getTags = (ingredients) => {
        const ingredientTags = ingredients?.map(ingredient => ingredient.tags) || []

        const exclusiveTags =  _.union(...ingredientTags.map(ingredientTag => ingredientTag.filter(tag => enums.exclusiveTags.includes(tag))))

        const inclusiveTags = ingredientTags.length ? _.intersection(...ingredientTags, enums.inclusiveTags) : []

        return [...exclusiveTags, ...inclusiveTags]
    }

    const getIngredientsList = () => recipeStructure(recipe.meal).map(({ options, factor }) => {
        const filteredIngredients = recipe.ingredients ?.filter(ingredient => options.includes(ingredient.group))
       
        const groupLength = filteredIngredients ?.length
       
        return filteredIngredients ?.map(({ name, portion, unit }) => {
            const recipePortion = factor ? portion * factor / groupLength : portion

            return <Typography>{recipePortion}{unit} {name}</Typography>
        })
    })

    return <Paper className={classes.container}>
        <TextInput
            label="Name"
            value={recipe.name}
            onChange={(v) => setRecipe(prev => ({ ...prev, name: v }))}
            required
            error={error && !recipe.name}
        />
        <SelectInput
            label="Meal"
            value={recipe.meal}
            onChange={(v) => setRecipe(prev => ({ ...prev, meal: v }))}
            required
            options={enums.mealEnum}
            error={error && !recipe.meal}
        />
        <TextInput
            label="Image"
            value={recipe.image}
            onChange={(v) => setRecipe(prev => ({ ...prev, image: v }))}
            />
        <SelectInput
            label="Season"
            multiple
            value={recipe.season || []}
            onChange={(v) => setRecipe(prev => ({ ...prev, season: v }))}
            options={enums.seasonEnum}
            />
        <SelectInput
            label='Tags'
            multiple
            value={recipe.tags || []}
            onChange={(v) => setRecipe(prev => ({ ...prev, tags: v }))}
            options={[...enums.inclusiveTags, ...enums.exclusiveTags]}
        />
        <div className={classes.subContainer}>
            <Button className={classes.filter} onClick={() => setIngredientFilter([])} color='primary'>ALL</Button>
            {recipeStructure(recipe).map(({ icon, options, required }) => <Button className={[classes.filter, required && classes.required].join(' ')} onClick={() => setIngredientFilter(options)} color='primary'><img className={classes.img} src={`/images/Food-icons/${icon}.png`} alt="icon meal" /></Button>)}
        </div>
        <AutocompleteInput
            label='Ingredients'
            value={recipe.ingredients || []}
            onChange={(v) => handleIngredients(v)}
            getOptionLabel={option => option.name}
            multiple
            options={ingredientFilter.length ? allIngredients.filter(el => ingredientFilter.includes(el.group)) : allIngredients}
        />
        <div className={classes.ingredientContainer}>
            {recipe.meal && getIngredientsList()}
        </div>
        <TextInput
            label='Duration (min)'
            value={recipe.duration}
            onChange={(v) => setRecipe(prev => ({ ...prev, duration: v }))}
            required
            type='Number'
        />
        <SelectInput
            label="Utensils"
            multiple
            value={recipe.utensils || []}
            onChange={(v) => setRecipe(prev => ({ ...prev, utensils: v }))}
            required
            options={enums.utensilsEnum}
        />
        <Typography align='center' variant='h5' color='primary'>Preparation</Typography>
        <EditableInput
            value={recipe.preparation}
            onChange={(v) => setRecipe(prev => ({ ...prev, preparation: v }))}
        />
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
    </Paper >

}

export default RecipesForm