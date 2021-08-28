import _ from 'lodash'

const getComplex = (ingredients, complexIngredients) => {
    if (!ingredients) return
    ingredients.forEach(ingredient => {
        if (ingredient.isComplex) {
            if (!ingredient.portionAmount
                || ingredient.portionAmount && !complexIngredients.find(_ingredient => _ingredient._id === ingredient._id)) {
                getComplex(ingredient.ingredients, complexIngredients)
            }
            complexIngredients.push(ingredient)
        }
    })
}

export const getComplexIngredients = (menu) => {
    if (!menu.content) return

    const meals = Object.keys(menu.content)

    if (!meals ?.length) return

    let complexIngredients = []

    meals.forEach(meal => {
        getComplex(menu.content[meal] ?.ingredients, complexIngredients)
        getComplex(menu.content[meal] ?.recipe ?.ingredients, complexIngredients)
    })

    return _.uniqBy(complexIngredients, e => e._id).map(ingredient => {
        const count = _.countBy(complexIngredients, (rec) => rec._id === ingredient._id).true
        const countLabel = ingredient.portionAmount ? ` ${count} / ${ingredient.portionAmount}` : ` ${count}`
        return { name: ingredient.name, countLabel }
    })
}