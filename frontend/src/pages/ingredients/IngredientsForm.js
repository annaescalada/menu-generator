import React, { useState } from 'react'
import { Button, Typography, makeStyles, Checkbox, Paper } from '@material-ui/core'
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
}))

const IngredientsForm = ({ ingredient, setIngredient, error, handleClick, allIngredients, enums }) => {
    const classes = useStyles()

    const handleIsComplex = () => {
        setIngredient(prev => ({
            ...prev,
            isComplex: !prev.isComplex,
            season: !prev.isComplex ? [] : prev.season,
            tags: !prev.isComplex ? [] : prev.tags,
            duration: null,
            ingredients: [],
            preparation: null,
            utensils: []
        }))
    }

    const handleIngredients = async (v) => {
        setIngredient(prev => ({
            ...prev,
            ingredients: v,
            season: _.intersection(...v.map(ingredient => ingredient.season)),
            tags: getTags(v)
        }))
    }

    const getTags = (ingredients) => {
        const ingredientTags = ingredients ?.map(ingredient => ingredient.tags) || []

        const exclusiveTags = _.union(...ingredientTags.map(ingredientTag => ingredientTag.filter(tag => enums.exclusiveTags.includes(tag))))

        const inclusiveTags = ingredientTags.length ? _.intersection(...ingredientTags, enums.inclusiveTags) : []

        return [...exclusiveTags, ...inclusiveTags]
    }

    return <Paper className={classes.container}>
        <TextInput
            label="Name"
            value={ingredient.name}
            onChange={(v) => setIngredient(prev => ({ ...prev, name: v }))}
            required
            error={error && !ingredient.name}
        />
        <TextInput
            label="Image"
            value={ingredient.image}
            onChange={(v) => setIngredient(prev => ({ ...prev, image: v }))}
        />
        <TextInput
            label="Link"
            value={ingredient.link}
            onChange={(v) => setIngredient(prev => ({ ...prev, link: v }))}
        />
        <SelectInput
            label="Season"
            multiple
            value={ingredient.season || []}
            onChange={(v) => setIngredient(prev => ({ ...prev, season: v }))}
            required
            options={enums.seasonEnum}
            disabled={ingredient.isComplex}
            error={error && !ingredient.season}
        />
        <SelectInput
            label="Group"
            value={ingredient.group}
            onChange={(v) => setIngredient(prev => ({ ...prev, group: v }))}
            required
            options={enums.groupEnum}
            error={error && !ingredient.group}
        />
        <TextInput
            label={'Portion'}
            value={ingredient.portion}
            onChange={(v) => setIngredient(prev => ({ ...prev, portion: v }))}
            required
            type='Number'
        />
        <SelectInput
            label="Portion Unit"
            value={ingredient.unit}
            onChange={(v) => setIngredient(prev => ({ ...prev, unit: v }))}
            required
            options={enums.portionEnum}
            error={error && !ingredient.unit}
        />
        <SelectInput
            label="Tags"
            multiple
            value={ingredient.tags || []}
            onChange={(v) => setIngredient(prev => ({ ...prev, tags: v }))}
            required
            options={[...enums.inclusiveTags, ...enums.exclusiveTags]}
            error={error && !ingredient.tags}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Checkbox
                checked={ingredient.isComplex}
                onChange={handleIsComplex}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography>isComplex</Typography>
        </div >
        {ingredient.isComplex && <>
            <TextInput
                label='Portion Amount'
                value={ingredient.portionAmount}
                onChange={(v) => setIngredient(prev => ({ ...prev, portionAmount: v }))}
                required
                type='Number'
            />
            <TextInput
                label='Duration (min)'
                value={ingredient.duration}
                onChange={(v) => setIngredient(prev => ({ ...prev, duration: v }))}
                required
                type='Number'
            />
            <AutocompleteInput
                label="Ingredients"
                value={ingredient.ingredients || []}
                onChange={(v) => handleIngredients(v)}
                required
                getOptionLabel={option => `${option.portion}${option.unit} ${option.name}`}
                multiple
                options={allIngredients}
            />
            <EditableInput
                value={ingredient.preparation}
                onChange={(v) => setIngredient(prev => ({ ...prev, preparation: v }))}
            />
            <SelectInput
                label="Utensils"
                multiple
                value={ingredient.utensils}
                onChange={(v) => setIngredient(prev => ({ ...prev, utensils: v }))}
                required
                options={enums.utensilsEnum}
            />
        </>}
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
    </Paper >

}

export default IngredientsForm