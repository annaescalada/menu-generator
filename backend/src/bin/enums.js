module.exports = {
    //for ingredients
    groupEnum: [
        'cereales',
        'legumbres',
        'frutos secos y oleaginosos',
        'carnes',
        'pescados',
        'huevos',
        'tubérculos',
        'omega 3',
        'hortalizas',
        'otras verduras',
        'crucíferas',
        'frutas',
        'frutos rojos',
        'lácteos',
        'condimentos',
    ],
    seasonEnum: ['verano', 'invierno', 'otoño', 'primavera'],
    portionEnum: ['tz', 'cs', 'cp', 'U', 'g'],
    //exclusive means that only one ingredient with the tag is needed to be tagged
    exclusiveTags: ['pescado', 'carne', 'lácteo', 'huevo', 'gluten', 'semiprocesado', 'cocido', 'elaborado', 'genérico', 'crema'],
    //inclusive tag means that all ingredients must have the tag to be tagged
    inclusiveTags: ['crudo', 'eliminación'],
    utensilsEnum: ['olla pressión', 'trituradora', 'estuche de vapor', 'sartén', 'horno'],
    mealEnum: ['desayuno', 'comida', 'snack'],
    genderEnum: ['hombre', 'mujer'],
    daysEnum: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    menuMealEnum: ['desayuno', 'comida', 'cena'],
    recipeGroups: [
        'carbs',
        'proteins',
        'otherVeggies',
        'cruciferous',
        'greens',
        'fats',
        'dairy',
        'omega3',
        'fruit',
        'berries',
        'condiments'
    ],
    keyIconLabel : [{
        icon: 'cereales',
        key: 'carbs',
        label: 'Carbohidratos',
    },
    {
        icon: 'legumbres',
        key: 'proteins',
        label: 'Proteínas',
    },
    {
        icon: 'hortalizas',
        key: 'greens',
        label: 'Vegetales',
    },
    {
        icon: 'otras_verduras',
        key: 'otherVeggies',
        label: 'Otras Verduras',
    },
    {
        icon: 'crucíferas',
        key: 'cruciferous',
        label: 'Cruciferas',
    },
    {
        icon: 'frutos_secos_y_oleaginosos',
        key: 'fats',
        label: 'Grasas saludables',
    },
    {
        icon: 'lácteos',
        key: 'dairy',
        label: 'Lácteos',
    },
    {
        icon: 'omega_3',
        key: 'omega3',
        label: 'Omega 3',
    },
    {
        icon: 'frutas',
        key: 'fruits',
        label: 'Frutas',
    },
    {
        icon: 'frutos_rojos',
        key: 'berries',
        label: 'Frutos rojos',
    },
    {
        icon: 'condimentos',
        key: 'condiments',
        label: 'Condimentos',
    },
]
    
}