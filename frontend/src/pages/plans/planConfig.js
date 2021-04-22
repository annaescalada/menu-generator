export const config = {
    defaultMeals: {
        breakfast: {
            carbs: 1,
            proteins: 0,
            cruciferous: 0,
            otherVeggies: 0,
            greens: 0,
            fats: 1,
            dairy: 1,
            omega3: 1,
            fruit: 2,
            berries: 1,
        },
        lunch: {
            carbs: 1,
            proteins: 1,
            cruciferous: 1,
            otherVeggies: 1,
            greens: 1,
            fats: 1,
            dairy: 0,
            omega3: 0,
            fruit: 0,
            berries: 0,
        },
        snack: {
            carbs: 1,
            proteins: 0,
            cruciferous: 0,
            otherVeggies: 0,
            greens: 0,
            fats: 1,
            dairy: 0,
            omega3: 0,
            fruit: 1,
            berries: 0,
        },
        miniSnack: {
            carbs: 0,
            proteins: 0,
            cruciferous: 0,
            otherVeggies: 0,
            greens: 0,
            fats: 1,
            dairy: 0,
            omega3: 0,
            fruit: 1,
            berries: 0,
        }
    },
    portionMacros: {
        carbs: {
            carbs: 30,
            proteins: 7,
            fat: 2
        },
        proteins: {
            carbs: 20,
            proteins: 15,
            fat: 2
        },
        fats: {
            carbs: 5,
            proteins: 5,
            fat: 10
        },
        dairy: {
            carbs: 15,
            proteins: 5,
            fat: 5
        },
        omega3: {
            carbs: 5,
            proteins: 5,
            fat: 10
        },
        fruit: {
            carbs: 30,
            proteins: 5,
            fat: 1
        },
        berries: {
            carbs: 20,
            proteins: 2.5,
            fat: 1
        }
    },
    defaultPlan: [
        {
            name: 'Desayuno',
            time: '9:00',
            carbs: 1,
            proteins: 0,
            greens: 0,
            otherVeggies: 0,
            cruciferous: 0,
            fats: 1,
            dairy: 1,
            omega3: 1,
            fruit: 2,
            berries: 1,
            text: ''
        },
        {
            name: 'Comida',
            time: '14:00',
            carbs: 1,
            proteins: 1,
            greens: 1,
            otherVeggies: 1,
            cruciferous: 1,
            fats: 1,
            dairy: 0,
            omega3: 0,
            fruit: 0,
            berries: 0,
            text: ''
        },
        {
            name: 'Cena',
            time: '20:00',
            carbs: 1,
            proteins: 1,
            greens: 1,
            otherVeggies: 1,
            cruciferous: 1,
            fats: 1,
            dairy: 0,
            omega3: 0,
            fruit: 0,
            berries: 0,
            text: ''
        },
    ],
}
