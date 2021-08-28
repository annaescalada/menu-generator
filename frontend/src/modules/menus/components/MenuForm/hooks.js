import { useEffect, useState } from 'react'
import { filterOptionsBySeasonAndTags, setSelectedRecipesOnMenuChange } from './helpers';

export const useMenuChange = (menu, allIngredients, allRecipes, setSelectedRecipes) => {
    const [ingredientsOptions, setIngredientsOptions] = useState(allIngredients)
    const [recipesOptions, setRecipesOptions] = useState(allRecipes)

    useEffect(() => {
        filterOptionsBySeasonAndTags(menu, allIngredients, allRecipes, setIngredientsOptions, setRecipesOptions)
    }, [menu.season, menu.toExcludeTags, menu.toIncludeTags])

    useEffect(() => {
        setSelectedRecipesOnMenuChange(menu, setSelectedRecipes)
    }, [menu.content])

    return [ingredientsOptions, recipesOptions]
}


