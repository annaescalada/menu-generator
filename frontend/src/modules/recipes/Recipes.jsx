import React, { useState, useContext } from 'react'

import { AuthContext } from '../../contexts/auth';
import { FeedbackContext } from '../../contexts/feedback';

import Loading from '../../components/shared/Loading';
import RecipesForm from './components/RecipesForm/RecipesForm';
import ItemStructure from '../../components/ItemStructure/ItemStructure';
import { defaultRecipe, handleDelete, handleEdit, handleSave } from './helpers';
import { useEnums } from '../../hooks';
import { useIngredients } from '../ingredients/hooks';
import RecipeBookInput from '../../components/shared/RecipeBookInput/RecipeBookInput';
import { useRecipes } from './hooks';

const Recipes = () => {
    const { message, setMessage } = useContext(FeedbackContext)
    const { selectedRecipes, setSelectedRecipes } = useContext(AuthContext)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [recipe, setRecipe] = useState(defaultRecipe)
    const [reload, setReload] = useState(true)

    const [enums, loadingEnums] = useEnums()
    const [allIngredients, loadingAllIngredients] = useIngredients()
    const [allRecipes, loadingRecipes] = useRecipes(reload, setReload)

    const isLoading = loadingAllIngredients || loadingRecipes || loadingEnums

    return isLoading 
    ? <Loading />
    : <>
    <ItemStructure
        name='Recipes'
        item={recipe}
        setItem={setRecipe}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        defaultValue={defaultRecipe}
        allItems={allRecipes}
        handleDelete={() => handleDelete({ recipe, setRecipe, setIsFormOpen, setMessage, setSelectedRecipes, setReload })}
    />
        {isFormOpen && <RecipesForm
            recipe={recipe}
            setRecipe={setRecipe}
            handleClick={() => recipe._id 
                ? handleEdit({ recipe, setRecipe, setIsFormOpen, setMessage, setSelectedRecipes, setReload }) 
                : handleSave({ recipe, setRecipe, setIsFormOpen, setMessage, setSelectedRecipes, setReload })}
            error={message}
            allRecipes={allRecipes}
            allIngredients={allIngredients}
            enums={enums}
        />}
        <RecipeBookInput
            selectedRecipes={selectedRecipes}
            setSelectedRecipes={setSelectedRecipes}
            options={allRecipes}
        />
    </>
}

export default Recipes