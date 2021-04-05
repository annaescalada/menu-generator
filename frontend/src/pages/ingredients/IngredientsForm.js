import React, { useState } from 'react'
import { Button, Typography, makeStyles, Checkbox } from '@material-ui/core'
import _ from 'lodash'
import TextInput from '../../components/shared/TextInput'
import SelectInput from '../../components/shared/SelectInput'
import AutocompleteInput from '../../components/shared/AutocompleteInput'

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
        margin: '1em'
    }
}))

const Ingredients = ({ ingredient, setIngredient, error, handleClick, allIngredients }) => {
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
            tags: _.union(...v.map(ingredient => ingredient.tags))
        }))
    }

    return <>
        <TextInput
            label="Name"
            value={ingredient.name}
            onChange={(v) => setIngredient(prev => ({ ...prev, name: v }))}
            required={true}
            error={error && !ingredient.name}
        />
        <SelectInput
            label="Season"
            multiple
            value={ingredient.season || []}
            onChange={(v) => setIngredient(prev => ({ ...prev, season: v }))}
            required={true}
            options={['verano', 'invierno', 'otoño', 'primavera']}
            disabled={ingredient.isComplex}
            error={error && !ingredient.season}
        />
        <SelectInput
            label="Group"
            value={ingredient.group || []}
            onChange={(v) => setIngredient(prev => ({ ...prev, group: v }))}
            required={true}
            options={[
                'cereales',
                'legumbres',
                'frutos secos',
                'omega 3',
                'frutas',
                'frutos rojos',
                'grasas saludables',
                'otras verduras',
                'crucíferas',
                'hortalizas',
                'làcteos vegetales',
                'condimentos',
                'salsas'
            ]}
            error={error && !ingredient.group}
        />
        <div style={{ display: 'flex' }}>
            {['S', 'M', 'L'].map(key => <TextInput
                label={key}
                value={ingredient ?.portion ?.[key]}
                onChange={(v) => setIngredient(prev => ({ ...prev, portion: v }))}
                required={true}
                type='Number'
            />)}
        </div>
        <SelectInput
            label="Portion Unit"
            value={ingredient.unit}
            onChange={(v) => setIngredient(prev => ({ ...prev, unit: v }))}
            required={true}
            options={['tz', 'cs', 'cp', 'u']}
            error={error && !ingredient.unit}
        />
        <SelectInput
            label="Tags"
            multiple
            value={ingredient.tags || []}
            onChange={(v) => setIngredient(prev => ({ ...prev, tags: v }))}
            required={true}
            options={['fish', 'meat', 'dairy', 'egg', 'gluten']}
            disabled={ingredient.isComplex}
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
                label='Duration (min)'
                value={ingredient.duration}
                onChange={(v) => setIngredient(prev => ({ ...prev, duration: v }))}
                required={true}
                type='Number'
            />
            <AutocompleteInput
                label="Ingredients"
                value={ingredient.ingredients || []}
                onChange={(v) => handleIngredients(v)}
                required={true}
                getOptionLabel={option => `${option ?.portion ?.M}${option.unit} ${option.name}`}
                multiple
                options={allIngredients}
            />
            <TextInput
                label="Preparation"
                value={ingredient.preparation}
                onChange={(v) => setIngredient(prev => ({ ...prev, preparation: v }))}
                required={true}
                multiline={true}
            />
            <SelectInput
                label="Utensils"
                multiple
                value={ingredient.utensils}
                onChange={(v) => setIngredient(prev => ({ ...prev, utensils: v }))}
                required={true}
                options={['olla pressión', 'trituradora', 'estuche de vapor', 'sartén']}
            />
        </>}
        <Button className={classes.button} onClick={handleClick} color="secondary" variant="contained">Save</Button>
    </>
}

export default Ingredients