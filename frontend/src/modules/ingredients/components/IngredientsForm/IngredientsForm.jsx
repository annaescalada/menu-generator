import React from 'react'
import _ from 'lodash'
import { Typography, Checkbox, Paper, Button } from '@material-ui/core'

import TextInput from '../../../../components/shared/TextInput'
import SelectInput from '../../../../components/shared/SelectInput'
import IngredientsIsComplex from './components/IngredientsIsComplex'
import { useStyles } from './styles'
import { handleIsComplex } from './helpers'


const IngredientsForm = ({ ingredient, setIngredient, error, handleClick, allIngredients, enums }) => {
    const classes = useStyles()

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
        <div className={classes.isComplex}>
            <Checkbox
                checked={ingredient.isComplex}
                onChange={() => handleIsComplex(setIngredient)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Typography>isComplex</Typography>
        </div >
        {ingredient.isComplex && <IngredientsIsComplex
            ingredient={ingredient}
            setIngredient={setIngredient}
            allIngredients={allIngredients}
            enums={enums}
        />}
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
    </Paper >

}

export default IngredientsForm