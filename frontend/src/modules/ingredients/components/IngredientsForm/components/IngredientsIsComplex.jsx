import React from 'react'
import _ from 'lodash'

import TextInput from '../../../../../components/shared/TextInput'
import AutocompleteInput from '../../../../../components/shared/AutocompleteInput';
import EditableInput from '../../../../../components/shared/EditableInput'
import SelectInput from '../../../../../components/shared/SelectInput'
import { handleIngredients } from '../helpers'

const IngredientsIsComplex = ({ ingredient, setIngredient, allIngredients, enums }) => <>
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
            onChange={(v) => handleIngredients(v, setIngredient, enums)}
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
    </>

export default IngredientsIsComplex