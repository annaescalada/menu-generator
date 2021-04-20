module.exports = {
    //for ingredients
    groupEnum: [
        'cereales',
        'tubérculos',
        'legumbres',
        'carnes',
        'pescados',
        'huevos',
        'omega 3',
        'frutos secos y oleaginosos',
        'crucíferas',
        'hortalizas',
        'otras verduras',
        'frutas',
        'frutos rojos',
        'lácteos',
        'condimentos',
    ],
    seasonEnum: ['verano', 'invierno', 'otoño', 'primavera'],
    portionEnum: ['tz', 'cs', 'cp', 'U', 'g'],
    //exclusive means that only one ingredient with the tag is needed to be tagged
    exclusiveTags: ['pescado', 'carne', 'lácteo', 'huevo', 'gluten', 'semiprocesado', 'cocido', 'elaborado'],
    //inclusive tag means that all ingredients must have the tag to be tagged
    inclusiveTags: ['crudo', 'eliminación'],
    utensilsEnum: ['olla pressión', 'trituradora', 'estuche de vapor', 'sartén', 'horno'],
    mealEnum: ['desayuno', 'comida', 'snack'],
    genderEnum: ['hombre', 'mujer'],
    daysEnum: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    recipeGroups: [
        'carbs',
        'proteins',
        'veggies',
        'fats',
        'dairy',
        'omega3',
        'fruit',
        'berries',
        'condiment'
    ],
    portionDistributionGroups: [
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
    ]
}