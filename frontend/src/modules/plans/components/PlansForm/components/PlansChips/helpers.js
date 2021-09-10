import { portionMacros } from "../../../../helpers";

export const chipsInfo = (macros) => (
    [{
        label: `Total Kcal: ${macros ?.kcal ?.toFixed(1) || 0} kcal`,
        color: 'primary'
    },
    {
        label: `Carbs: ${macros.carbs || 0}g (${((macros.carbs * 4 / macros.kcal) * 100).toFixed(2) || 0}%)`
    },
    {
        label: `Proteins: ${macros.proteins || 0}g (${((macros.proteins * 4 / macros.kcal) * 100).toFixed(2) || 0}%)`
    },
    {
        label: `Fats: ${macros.fats || 0}g (${((macros.fats * 9 / macros.kcal) * 100).toFixed(2) || 0}%)`
    }]
)

export const calculateMacros = (plan) => {
    const totalPortions = plan.distribution ?.reduce((acc, meal) => {
        return {
            carbs: +acc.carbs + +meal.carbs,
            proteins: +acc.proteins + +meal.proteins,
            fats: +acc.fats + +meal.fats,
            dairy: +acc.dairy + +meal.dairy,
            omega3: +acc.omega3 + +meal.omega3,
            fruit: +acc.fruit + +meal.fruit,
            berries: +acc.berries + +meal.berries
        }
    }, {
            carbs: 0,
            proteins: 0,
            fats: 0,
            dairy: 0,
            omega3: 0,
            fruit: 0,
            berries: 0
        })

    const groups = Object.keys(totalPortions || {})

    const total = {
        carbs: groups.reduce((acc, group) => acc + totalPortions[group] * portionMacros[group].carbs, 0),
        proteins: groups.reduce((acc, group) => acc + totalPortions[group] * portionMacros[group].proteins, 0),
        fats: groups.reduce((acc, group) => acc + totalPortions[group] * portionMacros[group].fat, 0)
    }

    return {
        ...total,
        kcal: (total.carbs * 4 + total.proteins * 4 + total.fats * 9)
    }
}