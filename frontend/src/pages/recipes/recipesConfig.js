export const config = {
    recipeStructure: (recipe) => [
        {
            required: (recipe.meal === 'desayuno' || recipe.meal === 'comida' || recipe.meal === 'snack'),
            icon: 'cereales',
            factor: 1,
            group: 'carbs',
            options: ['cereales', 'tubérculos']
        },
        {
            required: (recipe.meal === 'comida'),
            icon: 'legumbres',
            group: 'proteins',
            factor: 1,
            options: ['legumbres', 'carnes', 'pescados', 'huevos']
        },
        {
            required: (recipe.meal === 'comida'),
            icon: 'hortalizas',
            group: 'greens',
            options: ['hortalizas']
        },
        {
            required: (recipe.meal === 'comida'),
            icon: 'otras_verduras',
            group: 'otherVeggies',
            options: ['otras verduras']
        },
        {
            required: (recipe.meal === 'comida'),
            icon: 'crucíferas',
            group: 'cruciferous',
            options: ['crucíferas']
        },
        {
            required: recipe.meal === 'desayuno' || recipe.meal === 'comida' || recipe.meal === 'snack',
            icon: 'frutos_secos_y_oleaginosos',
            group: 'fats',
            options: ['frutos secos y oleaginosos']
        },
        {
            required: recipe.meal === 'desayuno',
            icon: 'lácteos',
            group: 'dairy',
            options: ['lácteos', 'lácteos vegetales']
        },
        {
            required: recipe.meal === 'desayuno',
            icon: 'omega_3',
            group: 'omega3',
            options: ['omega 3']
        },
        {
            required: recipe.meal === 'desayuno',
            icon: 'frutas',
            group: 'fruit',
            factor: recipe.meal === 'desayuno' ? 2 : 1,
            options: ['frutas']
        },
        {
            required: recipe.meal === 'desayuno',
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
} 