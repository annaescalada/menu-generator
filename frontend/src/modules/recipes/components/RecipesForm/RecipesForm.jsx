import React from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import _ from 'lodash'
import TextInput from '../../../../components/shared/TextInput'
import SelectInput from '../../../../components/shared/SelectInput'
import EditableInput from '../../../../components/shared/EditableInput';
import { useStyles } from './styles';
import IngredientFilter from './components/IngredientFilter/IngredientFilter';
import IngredientsList from './components/IngredientsList/IngredientsList';

const RecipesForm = ({ recipe, setRecipe, error, handleClick, allIngredients, enums }) => {
    const classes = useStyles()
    
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
        <div className={classes.filterContainer}>
            <IngredientFilter
                recipe={recipe}
                setRecipe={setRecipe}
                enums={enums}
                allIngredients={allIngredients}
            />
            {recipe.ingredients ?.length > 0 && <IngredientsList recipe={recipe} />}
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