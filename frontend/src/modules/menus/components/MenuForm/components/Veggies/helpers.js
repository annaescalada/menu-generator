import _ from 'lodash'

export const getVeggies = (menu) => {
    if (!menu.content) return

    const meals = Object.keys(menu.content)

    if (!meals ?.length) return

    let veggies = []

    meals.forEach(meal => {
        menu.content[meal] ?.ingredients ?.forEach(ingredient => {
            if (['hortalizas', 'crucíferas', 'otras verduras'].includes(ingredient.group)) {
                veggies.push(ingredient)
            }
        })

        menu.content[meal] ?.recipe ?.ingredients ?.forEach(ingredient => {
            if (['hortalizas', 'crucíferas', 'otras verduras'].includes(ingredient.group)) {
                veggies.push(ingredient)
            }
        })
    })

    return _.uniqBy(veggies, e => e._id).map(ingredient => {
        const count = _.countBy(veggies, (rec) => rec._id === ingredient._id).true
        return { name: ingredient.name, count }
    })
    
}
