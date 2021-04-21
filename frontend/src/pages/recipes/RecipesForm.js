import React, { useEffect } from 'react'
import { Button, makeStyles, Paper, Chip, Grid, Typography } from '@material-ui/core'
import _ from 'lodash'
import TextInput from '../../components/shared/TextInput'
import SelectInput from '../../components/shared/SelectInput'
import AutocompleteInput from '../../components/shared/AutocompleteInput'
import EditableInput from '../../components/shared/EditableInput';

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
    chipContainer: {
        display: 'flex',
        margin: '1em',
        padding: '1em'
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

    const getSeasons = () => {
        const getIngredientSeasons = (ingredients) => {
            const ingredientSeason = ingredients ?.map(ingredient => ingredient.season)
    
            return _.intersection(...ingredientSeason)
        }

        const ingredientsByGroup = enums.recipeGroups ?.map(group => recipe[group]).filter(el => el.length)

        const seasonsByGroup = ingredientsByGroup ?.map(group => getIngredientSeasons(group))

        return _.intersection(...seasonsByGroup)
    }

    const getTags = () => {
        const getIngredientTags = (ingredients, type) => {
            const ingredientTags = ingredients.map(ingredient => ingredient.tags)

            return type === 'exclusive'
                ? _.union(...ingredientTags.map(ingredientTag => ingredientTag.filter(tag => enums.exclusiveTags.includes(tag))))
                :_.intersection(...ingredientTags, enums.inclusiveTags)
        }

        const ingredientsByGroup = enums.recipeGroups.map(group => recipe[group]).filter(el => el.length)

        const inclusiveTagsByGroup = ingredientsByGroup ?.map(group => getIngredientTags(group, 'inclusive'))
        const exclusiveTagsByGroups = ingredientsByGroup ?.map(group => getIngredientTags(group, 'exclusive'))

        return ingredientsByGroup.length && [ ..._.union(...exclusiveTagsByGroups), ..._.intersection(...inclusiveTagsByGroup, enums.inclusiveTags)]
    }

    useEffect(() => {
        setRecipe(prev => ({
            ...prev,
            season: getSeasons(),
            tags: getTags()
        }))
    }, [recipe.carbs, recipe.proteins, recipe.veggies, recipe.fats, recipe.dairy, recipe.omega3, recipe.fruit, recipe.berries, recipe.condiments])

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
            label={`Tags`}
            multiple
            value={recipe.tags || []}
            onChange={(v) => setRecipe(prev => ({ ...prev, tags: v }))}
            options={[...enums.inclusiveTags, ...enums.exclusiveTags]}
        />
        {recipe.meal && <>
            <div className={classes.chipContainer}>
                {recipe.season ?.map(season => <Chip className={classes.chip} label={season} color='primary' />)}
                {/* {recipe.tags ?.map(tag => <Chip className={classes.chip} label={tag} color='secondary' />)} */}
            </div>
            <Grid container justify='center'>
                {[
                    {
                        required: (recipe.meal === 'desayuno' || recipe.meal === 'comida' || recipe.meal === 'snack'),
                        icon: 'cereales',
                        group: 'carbs',
                        options: ['cereales', 'tubérculos']
                    },
                    {
                        required: (recipe.meal === 'comida'),
                        icon: 'legumbres',
                        group: 'proteins',
                        options: ['legumbres', 'carnes', 'pescados', 'huevos']
                    },
                    {
                        required: (recipe.meal === 'comida'),
                        icon: 'hortalizas',
                        group: 'veggies',
                        factor: recipe.meal === 'comida' ? 3 : 1,
                        options: ['otras verduras', 'cruciferas', 'hortalizas']
                    },
                    {
                        required: recipe.meal === 'desayuno' || recipe.meal === 'comida' || recipe.meal === 'snack',
                        icon: 'frutos_secos_y_oleaginosos',
                        group: 'fats',
                        options: ['frutos secos y oleaginosos']
                    },
                    {
                        required: recipe.meal === 'desayuno',
                        icon: 'lácteos',
                        group: 'dairy',
                        options: ['lácteos', 'lácteos vegetales']
                    },
                    {
                        required: recipe.meal === 'desayuno',
                        icon: 'omega_3',
                        group: 'omega3',
                        options: ['omega 3']
                    },
                    {
                        required: recipe.meal === 'desayuno',
                        icon: 'frutas',
                        group: 'fruit',
                        factor: recipe.meal === 'desayuno' ? 2 : 1,
                        options: ['frutas']
                    },
                    {
                        required: recipe.meal === 'desayuno',
                        icon: 'frutos_rojos',
                        group: 'berries',
                        options: ['frutos rojos']
                    },
                    {
                        icon: 'condimentos',
                        group: 'condiments',
                        options: ['condimentos']
                    },
                ].map(({ required = false, icon, group, factor = 1, options = [] }) => <Grid className={required && classes.input} item xs={5}>
                    <AutocompleteInput
                        label={<img className={classes.img} src={`/images/Food-icons/${icon}.png`} alt="icon meal" />}
                        value={recipe[group] || []}
                        onChange={(v) => setRecipe(prev => ({ ...prev, [group]: v }))}
                        required={required}
                        getOptionLabel={option => `${(group === 'condiments' ? option.portion : option.portion * factor / (recipe[group] ?.length || 1)) ?.toFixed(2)}${option.unit} ${option.name}`}
                        multiple
                        options={allIngredients.filter(el => options.includes(el.group))}
                    />
                </Grid>)}
            </Grid>
        </>}
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