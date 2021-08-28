import { recipeStructure } from "../../../../helpers";

export const getIngredientsList = (recipe) => recipeStructure(recipe.meal).reduce((acc, { options, factor }) => {
    const filteredIngredients = recipe.ingredients ?.filter(ingredient => options.includes(ingredient.group)) || []
   
    const groupLength = filteredIngredients ?.length
   
    return [...acc, ...filteredIngredients.map(({ name, portion, unit }) => {
        const recipePortion = factor ? portion * factor / groupLength : portion

        return { name, recipePortion, unit }
    })]
},[])