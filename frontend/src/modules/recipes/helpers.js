import recipesService from "./service";

export const defaultRecipe = {
    name: '',
    duration: 0,
    preparation: ''
}

const resetForm = (setRecipe, setIsFormOpen, setReload, setSelectedRecipes) => {
    setRecipe(defaultRecipe)
    setIsFormOpen(false)
    setReload(true)
    setSelectedRecipes([])
}

export const handleSave = async ({ recipe, setRecipe, setIsFormOpen, setMessage, setSelectedRecipes, setReload }) => {
    try {
        await recipesService.create(recipe)
        resetForm(setRecipe, setIsFormOpen, setReload, setSelectedRecipes)

        setMessage('Recipe created')
    } catch (e) {
        console.log(e)
        setMessage('Error creating recipe')
    }
}

export const handleEdit = async ({ recipe, setRecipe, setIsFormOpen, setMessage, setSelectedRecipes, setReload }) => {
    try {
        await recipesService.edit(recipe._id, recipe)
        resetForm(setRecipe, setIsFormOpen, setReload, setSelectedRecipes)


        setMessage('Recipe updated')
    } catch (e) {
        setMessage('Error editing recipe')
    }
}

export const handleDelete = async ({ recipe, setRecipe, setIsFormOpen, setMessage, setSelectedRecipes, setReload }) => {
    try {
        await recipesService.delete(recipe._id)
        resetForm(setRecipe, setIsFormOpen, setReload, setSelectedRecipes)

        setMessage('Recipe deleted')
    } catch (e) {
        setMessage('Error deleting recipe')
    }
}

export const recipeStructure = (meal) => [
    {
        required: (meal === 'desayuno' || meal === 'comida' || meal === 'snack'),
        icon: 'cereales',
        factor: 1,
        group: 'carbs',
        options: ['cereales', 'tubérculos']
    },
    {
        required: (meal === 'comida'),
        icon: 'legumbres',
        group: 'proteins',
        factor: 1,
        options: ['legumbres', 'carnes', 'pescados', 'huevos']
    },
    {
        required: (meal === 'comida'),
        icon: 'hortalizas',
        group: 'greens',
        options: ['hortalizas']
    },
    {
        required: (meal === 'comida'),
        icon: 'otras_verduras',
        group: 'otherVeggies',
        options: ['otras verduras']
    },
    {
        required: (meal === 'comida'),
        icon: 'crucíferas',
        group: 'cruciferous',
        options: ['crucíferas']
    },
    {
        required: meal === 'desayuno' || meal === 'comida' || meal === 'snack',
        icon: 'frutos_secos_y_oleaginosos',
        group: 'fats',
        options: ['frutos secos y oleaginosos']
    },
    {
        required: meal === 'desayuno',
        icon: 'lácteos',
        group: 'dairy',
        options: ['lácteos', 'lácteos vegetales']
    },
    {
        required: meal === 'desayuno',
        icon: 'omega_3',
        group: 'omega3',
        options: ['omega 3']
    },
    {
        required: meal === 'desayuno',
        icon: 'frutas',
        group: 'fruit',
        factor: meal === 'desayuno' ? 2 : 1,
        options: ['frutas']
    },
    {
        required: meal === 'desayuno',
        icon: 'frutos_rojos',
        group: 'berries',
        options: ['frutos rojos']
    },
    {
        icon: 'condimentos',
        group: 'condiments',
        options: ['condimentos']
    },
]
