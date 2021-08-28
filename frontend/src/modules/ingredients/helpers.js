import ingredientsService from "./service";

export const defaultIngredient = {
  name: '',
  portion: 0,
  preparation: '',
  duration: 0
}

const resetForm = (setIngredient, setIsFormOpen, setReload, setSelectedRecipes) => {
  setIngredient(defaultIngredient)
  setIsFormOpen(false)
  setReload(true)
  setSelectedRecipes([])
}

export const handleSave = async ({ ingredient, setIngredient, setIsFormOpen, setMessage, setSelectedRecipes, setReload }) => {
  try {
    await ingredientsService.create(ingredient)
    resetForm(setIngredient, setIsFormOpen, setReload, setSelectedRecipes)

    setMessage('Ingredient created')
  } catch (e) {
    setMessage('Error creating ingredient')
  }
}

export const handleEdit = async ({ ingredient, setIngredient, setIsFormOpen, setMessage, setSelectedRecipes, setReload }) => async () => {
  try {
    await ingredientsService.edit(ingredient._id, ingredient)
    resetForm(setIngredient, setIsFormOpen, setReload, setSelectedRecipes)

    setMessage('Ingredient updated')
  } catch (e) {
    setMessage('Error editing ingredient')
  }
}

export const handleDelete = async ({ ingredient, setIngredient, setIsFormOpen, setMessage, setSelectedRecipes, setReload }) => {
  try {
    await ingredientsService.delete(ingredient._id)
    resetForm(setIngredient, setIsFormOpen, setReload, setSelectedRecipes)

    setMessage('Ingredient deleted')
  } catch (e) {
    setMessage('Error deleting ingredient')
  }
}