import React from 'react'
import { Button, makeStyles, Paper, Chip, Grid } from '@material-ui/core'
import _ from 'lodash'
import TextInput from '../../components/shared/TextInput'
import SelectInput from '../../components/shared/SelectInput'
import AutocompleteInput from '../../components/shared/AutocompleteInput'

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
        margin: '0.5em'
    },
    chip: {
        margin: '0.2em',
        color: 'white',
        padding: '0.5em'
    },
}))

const RecipesForm = ({ recipe, setRecipe, error, handleClick, allIngredients, enums }) => {
    const classes = useStyles()

    const getSeasons = () => _.intersection(...['carbs', 'proteins', 'veggies', 'fats', 'dairy', 'omega3', 'fruit', 'berries', 'condiments']
        .map(key => _.intersection(...recipe[key] ?.map(ingredient => ingredient.season) || [] ))
        .filter(el => el.length))

    const getTags = () => _.union(...['carbs', 'proteins', 'veggies', 'fats', 'dairy', 'omega3', 'fruit', 'berries', 'condiments']
        .map(key => _.union(...recipe[key] ?.map(ingredient => ingredient.tags) || [] ))
        .filter(el => el.length))

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
        <div className={classes.chipContainer}>
            {getSeasons().map(season => <Chip className={classes.chip} label={season} color='primary' />)}
            {getTags().map(tag => <Chip className={classes.chip} label={tag} color='secondary' />)}
        </div>
        <Grid container justify='center'>
            <Grid className={(recipe.meal === 'desayuno' || recipe.meal === 'comida') && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Carbs"
                    value={recipe.carbs || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, carbs: v }))}
                    required={recipe.meal === 'desayuno' || recipe.meal === 'comida'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'cereales' || el.group === 'tubérculos')}
                />
            </Grid>
            <Grid className={recipe.meal === 'comida' && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Proteins"
                    value={recipe.proteins || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, proteins: v }))}
                    required={recipe.meal === 'comida'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'legumbres' || el.group === 'pescados' || el.group === 'huevos' || el.group === 'carnes')}
                />
            </Grid>
        </Grid>
        <Grid container justify='center'>
            <Grid className={recipe.meal === 'comida' && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Veggies"
                    value={recipe.veggies || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, veggies: v }))}
                    required={recipe.meal === 'comida'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name} (${option.group})`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'otras verduras' || el.group === 'crucíferas' || el.group === 'hortalizas')}
                />
            </Grid>
            <Grid className={(recipe.meal === 'desayuno' || recipe.meal === 'comida') && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Fats"
                    value={recipe.fats || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, fats: v }))}
                    required={recipe.meal === 'comida' || recipe.meal === 'desayuno'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'frutos secos y oleaginosos')}
                />
            </Grid>
        </Grid>
        <Grid container justify='center'>
            <Grid className={recipe.meal === 'desayuno' && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Dairy"
                    value={recipe.dairy || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, dairy: v }))}
                    required={recipe.meal === 'desayuno'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'lácteos' || el.group === 'lácteos vegetales')}
                />
            </Grid>
            <Grid className={recipe.meal === 'desayuno' && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Omega 3"
                    value={recipe.omega3 || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, omega3: v }))}
                    required={recipe.meal === 'desayuno'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'omega 3')}
                />
            </Grid>
        </Grid>
        <Grid container justify='center'>
            <Grid className={recipe.meal === 'desayuno' && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Fruit"
                    value={recipe.fruit || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, fruit: v }))}
                    required={recipe.meal === 'desayuno'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'fruta')}
                />
            </Grid>
            <Grid className={recipe.meal === 'desayuno' && classes.input} item xs={5}>
                <AutocompleteInput
                    label="Berries"
                    value={recipe.berries || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, berries: v }))}
                    required={recipe.meal === 'desayuno'}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'frutos rojos')}
                />
            </Grid>
            <Grid item xs={10}>
                <AutocompleteInput
                    label="Condiments"
                    value={recipe.condiments || []}
                    onChange={(v) => setRecipe(prev => ({ ...prev, condiments: v }))}
                    getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                    multiple
                    options={allIngredients.filter(el => el.group === 'condimentos')}
                />
            </Grid>
        </Grid>
        <TextInput
            label='Duration (min)'
            value={recipe.duration}
            onChange={(v) => setRecipe(prev => ({ ...prev, duration: v }))}
            required
            type='Number'
        />
        <TextInput
            label="Preparation"
            value={recipe.preparation}
            onChange={(v) => setRecipe(prev => ({ ...prev, preparation: v }))}
            required
            multiline
        />
        <SelectInput
            label="Utensils"
            multiple
            value={recipe.utensils || []}
            onChange={(v) => setRecipe(prev => ({ ...prev, utensils: v }))}
            required
            options={enums.utensilsEnum}
        />
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
    </Paper >

}

export default RecipesForm