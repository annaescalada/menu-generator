import React, { useState, useContext } from 'react'

import { FeedbackContext } from '../../contexts/feedback'
import { AuthContext } from '../../contexts/auth'
import Loading from '../../components/shared/Loading'
import IngredientsForm from './components/IngredientsForm/IngredientsForm'
import RecipeBookInput from '../../components/shared/RecipeBookInput/RecipeBookInput'
import ItemStructure from '../../components/ItemStructure/ItemStructure';
import { defaultIngredient, handleDelete, handleEdit, handleSave } from './helpers'
import { useIngredients } from './hooks'
import { useEnums } from '../../hooks'

const Ingredients = () => {
  const { message, setMessage } = useContext(FeedbackContext)
  const { selectedRecipes, setSelectedRecipes } = useContext(AuthContext)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [ingredient, setIngredient] = useState(defaultIngredient)
  const [reload, setReload] = useState(true)

  const [enums, loadingEnums] = useEnums()
  const [allIngredients, loadingAllIngredients] = useIngredients(reload, setReload)

  const isLoading = loadingAllIngredients || loadingEnums

  return isLoading
    ? <Loading />
    : <>
      <ItemStructure
        name='Ingrediente'
        item={ingredient}
        setItem={setIngredient}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        defaultValue={defaultIngredient}
        allItems={allIngredients}
        handleDelete={() => handleDelete({ ingredient, setIngredient, setIsFormOpen, setMessage, setSelectedRecipes, setReload })}
      />
      {isFormOpen && <IngredientsForm
        ingredient={ingredient}
        setIngredient={setIngredient}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        handleClick={() => ingredient._id
          ? handleEdit({ ingredient, setIngredient, setIsFormOpen, setMessage, setSelectedRecipes, setReload })
          : handleSave({ ingredient, setIngredient, setIsFormOpen, setMessage, setSelectedRecipes, setReload })}
        error={message}
        allIngredients={allIngredients}
        enums={enums}
      />}
      <RecipeBookInput
        selectedRecipes={selectedRecipes}
        setSelectedRecipes={setSelectedRecipes}
        options={allIngredients.filter(ingredient => ingredient.isComplex)}
      />
    </>
}

export default Ingredients