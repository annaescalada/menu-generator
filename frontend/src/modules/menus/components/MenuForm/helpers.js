import { useState } from 'react'
import _ from 'lodash'

export const firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

export const updateContent = (v, coordinates, key, setMenu) => {
    setMenu(prev => ({
        ...prev,
        content: {
            ...prev ?.content,
            [coordinates]: {
                ...prev.content ?.[coordinates],
                [key]: v
            }
        }
    }))
}

export const filterRecipeOptions = (menu, coordinates, recipesOptions) => {
    let filteredOptions = _.clone(recipesOptions)

    const menuIngredients = menu.content ?.[coordinates] ?.ingredients ?.map(ingredient => ingredient._id)
    
    if (!menuIngredients ?.length) return filteredOptions

    return filteredOptions.filter(recipe => {
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient._id)
        return menuIngredients ?.length && _.intersection(recipeIngredients, menuIngredients || []).length
    })
}

export const filterOptionsBySeasonAndTags = (menu, allIngredients, allRecipes, setIngredientsOptions, setRecipesOptions) => {
    let filteredIngredientsOptions = _.clone(allIngredients)
    let filteredRecipesOptions = _.clone(allRecipes)

    if (menu ?.season ?.length) {
        filteredIngredientsOptions = filteredIngredientsOptions.filter(recipe => _.intersection(recipe.season, menu.season).length)
        filteredRecipesOptions = filteredRecipesOptions.filter(recipe => _.intersection(recipe.season, menu.season).length)
    }

    if (menu ?.toIncludeTags ?.length) {
        filteredIngredientsOptions = filteredIngredientsOptions.filter(recipe => _.intersection(recipe.tags, menu.toIncludeTags).length)
        filteredRecipesOptions = filteredRecipesOptions.filter(recipe => _.intersection(recipe.tags, menu.toIncludeTags).length)
    }

    if (menu ?.toExcludeTags ?.length) {
        filteredIngredientsOptions = filteredIngredientsOptions.filter(recipe => !_.intersection(recipe.tags, menu.toExcludeTags).length)
        filteredRecipesOptions = filteredRecipesOptions.filter(recipe => !_.intersection(recipe.tags, menu.toExcludeTags).length)
    }

    setIngredientsOptions(filteredIngredientsOptions)
    setRecipesOptions(filteredRecipesOptions)
}

export const setSelectedRecipesOnMenuChange = (menu, setSelectedRecipes) => {
    if (!menu.content) return

    const meals = Object.keys(menu.content)

    if (!meals ?.length) return setSelectedRecipes([])

    let recipes = []

    meals.forEach(meal => {
        if (menu.content[meal].recipe) recipes.push(menu.content[meal].recipe)
    })

    meals.forEach(meal => {
        if (menu.content[meal].ingredients) {
            menu.content[meal].ingredients.forEach(ing => {
                if (ing.isComplex) {
                    recipes.push(ing)
                }
            })
        }
    })

    setSelectedRecipes(_.uniqBy(recipes, e => e._id))
}