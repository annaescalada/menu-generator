const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env'})

// setup mongoose
mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // reconnectTries: Number.MAX_VALUE
})

const Ingredient = require('../models/Ingredient.js')

const seeds = [
    //condimentos
    {
        name: 'Salsa de soja',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Albahaca fresca',
        season: ['verano', 'primavera'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Menta fresca',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Cacao en polvo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Albahaca',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Cúrcuma',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Curry',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Orégano',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Cebolla en polvo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Ajo en polvo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Ajo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Comino',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Canela',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Vainilla',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Pimienta',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 0.5,
        unit: 'cp',
    },
    {
        name: 'Pimentón',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Levadura nutricional',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Jengibre',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cp',
    },
    {
        name: 'Vinagre',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Limón',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 0.5,
        unit: 'U',
    },
    {
        name: 'Perejil',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Cilantro',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Miso',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Mostaza',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Aceitunas',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 0.25,
        unit: 'tz',
    },
    //omega 3
    {
        name: 'Semillas de lino',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'omega 3',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Semillas de chía',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'omega 3',
        portion: 1,
        unit: 'cs',
    },
    //huevos
    {
        name: 'Huevo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'huevos',
        portion: 1,
        unit: 'U',
        tags: ['huevo']
    },
    //pescado
    {
        name: 'Merluza',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'pescados',
        portion: 100,
        unit: 'g',
        tags: ['pescado']
    },
    {
        name: 'Lenguado',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'pescados',
        portion: 100,
        unit: 'g',
        tags: ['pescado']
    },
    {
        name: 'Salmón',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'pescados',
        portion: 100,
        unit: 'g',
        tags: ['pescado']
    },
    {
        name: 'Atún',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'pescados',
        portion: 100,
        unit: 'g',
        tags: ['pescado']
    },
    {
        name: 'Sepia',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'pescados',
        portion: 100,
        unit: 'g',
        tags: ['pescado']
    },
    //carnes
    {
        name: 'Pollo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'carnes',
        portion: 100,
        unit: 'g',
        tags: ['carne']
    },
    {
        name: 'Ternera',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'carnes',
        portion: 100,
        unit: 'g',
        tags: ['carne']
    },
    {
        name: 'Pavo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'carnes',
        portion: 100,
        unit: 'g',
        tags: ['carne']
    },
    {
        name: 'Conejo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'carnes',
        portion: 100,
        unit: 'g',
        tags: ['carne']
    },
    //lácteos
    {
        name: 'Bebida vegetal',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 1,
        unit: 'tz',
        tags: ['genérico']
    },
    {
        name: 'Leche',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 1,
        unit: 'tz',
        tags: ['lácteo']
    },
    {
        name: 'Yogur',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 0.5,
        unit: 'tz',
        tags: ['lácteo']
    },
    {
        name: 'Queso',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 20,
        unit: 'g',
        tags: ['lácteo', 'semiprocesado']
    },
    {
        name: 'Leche vegetal',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Yogur vegetal',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 0.5,
        unit: 'tz',
    },
    //frutos secos y oleaginosos
    {
        name: 'Semillas de sésamo',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Tahini',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 1,
        unit: 'cs',
        tags: ['semiprocesado']
    },
    {
        name: 'Crema de cacahuete',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 1,
        unit: 'cs',
        tags: ['semiprocesado']
    },
    {
        name: 'Aceite de oliva virgen extra',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 1,
        unit: 'cs',
        tags: ['semiprocesado']
    },
    {
        name: 'Crema de coco',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 0.25,
        unit: 'tz',
        tags: ['semiprocesado']
    },
    {
        name: 'Almendra',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 0.25,
        unit: 'tz',
    },
    {
        name: 'Nueces',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 0.25,
        unit: 'tz',
    },
    {
        name: 'Anacardos',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 0.25,
        unit: 'tz',
    },
    {
        name: 'Aguacate',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 0.5,
        unit: 'U',
    },
    {
        name: 'Coco rallado',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Chocolate negro 85%',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos secos y oleaginosos',
        portion: 10,
        unit: 'g',
        tags: ['semiprocesado']
    },
    //legumbres
    {
        name: 'Garbanzos',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: "Garbanzos cocidos",
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1.5,
        unit: 'tz',
        tags: ['cocido'],
        isComplex: true,
        ingredients: ["607602bcd7c219f5deb4a5f7"],
        utensils: ["olla pressión"],
        duration: 50,
        preparation: "Cocinar en la olla a presión con el doble de la cantidad en agua, durante 40 minutos a presión alta.",
        unit: "tz",
        portion: 1.5,
    },
    {
        name: 'Lentejas',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: "Lentejas cocidas",
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1.5,
        unit: 'tz',
        tags: ['cocido'],
        isComplex: true,
        ingredients: ["607602bcd7c219f5deb4a5f7"],
        utensils: ["olla pressión"],
        duration: 15,
        preparation: "Cocinar en la olla a presión con el doble de la cantidad en agua, durante 5 minutos a presión alta.",
        unit: "tz",
        portion: 1.5,
    },
    {
        name: 'Lentejas rojas',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: 'Judía blanca',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: "Judías blancas cocidas",
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1.5,
        unit: 'tz',
        tags: ['cocido'],
        isComplex: true,
        ingredients: ["607602bcd7c219f5deb4a5f7"],
        utensils: ["olla pressión"],
        duration: 50,
        preparation: "Cocinar en la olla a presión con el doble de la cantidad en agua, durante 40 minutos a presión alta.",
        unit: "tz",
        portion: 1.5,
    },
    {
        name: 'Frijoles',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: "Frijoles cocidos",
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1.5,
        unit: 'tz',
        tags: ['cocido'],
        isComplex: true,
        ingredients: ["607602bcd7c219f5deb4a5f7"],
        utensils: ["olla pressión"],
        duration: 50,
        preparation: "Cocinar en la olla a presión con el doble de la cantidad en agua, durante 40 minutos a presión alta.",
        unit: "tz",
        portion: 1.5,
    },
    {
        name: 'Guisantes',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: 'Edamames',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: 'Tofu',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 200,
        unit: 'g',
    },
    {
        name: 'Tempeh',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 100,
        unit: 'g',
    },
    //cereales integrales
    {
        name: 'Avena',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Arroz integral',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: "Arroz integral cocido",
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 1.5,
        unit: 'tz',
        tags: ['cocido', 'eliminación'],
        isComplex: true,
        ingredients: ["607602bcd7c219f5deb4a5f7"],
        utensils: ["olla pressión"],
        duration: 30,
        preparation: "Cocinar en la olla a presión con el doble de la cantidad en agua, durante 20 minutos a presión alta.",
        unit: "tz",
        portion: 1.5,
    },
    {
        name: 'Quinoa',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: "Quinoa cocida",
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 1.5,
        unit: 'tz',
        tags: ['cocido', 'eliminación'],
        isComplex: true,
        ingredients: ["607602bcd7c219f5deb4a5f7"],
        utensils: ["olla pressión"],
        duration: 15,
        preparation: "Cocinar en la olla a presión con el doble de la cantidad en agua, durante 5 minutos a presión alta.",
        unit: "tz",
        portion: 1.5,
    },
    {
        name: 'Trigo sarraceno',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.5,
        unit: 'tz',
        tags: ['crudo']
    },
    {
        name: "Trigo sarraceno cocido",
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 1.5,
        unit: 'tz',
        tags: ['cocido', 'eliminación'],
        isComplex: true,
        ingredients: ["607602bcd7c219f5deb4a5f7"],
        utensils: ["olla pressión"],
        duration: 30,
        preparation: "Cocinar en la olla a presión con el doble de la cantidad en agua, durante 20 minutos a presión alta.",
        unit: "tz",
        portion: 1.5,
    },
    {
        name: 'Mazorcas de maíz',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 2,
        unit: 'U',
    },
    {
        name: 'Maíz dulce',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.25,
        unit: 'tz',
    },
    {
        name: 'Tortitas de maíz',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 2,
        unit: 'U',
        tags: ['semiprocesado']
    },
    {
        name: 'Pan integral',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 50,
        unit: 'g',
        tags: ['semiprocesado', 'gluten']
    },
    {
        name: 'Pasta integral',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 1,
        unit: 'tz',
        tags: ['semiprocesado', 'gluten', 'crudo']
    },
    {
        name: 'Pan integral (sin gluten)',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 50,
        unit: 'g',
        tags: ['semiprocesado']
    },
    {
        name: 'Pasta integral (sin gluten)',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 1,
        unit: 'tz',
        tags: ['semiprocesado', 'crudo']
    },
    {
        name: 'Fideos de arroz',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 1,
        unit: 'tz',
        tags: ['semiprocesado']
    },
    //tubérculos
    {
        name: 'Patata',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'tubérculos',
        portion: 2,
        unit: 'U',
        tags: ['eliminación']
    },
    {
        name: 'Boniato',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'tubérculos',
        portion: 1,
        unit: 'U',
        tags: ['eliminación']
    },
    //crucíferas
    {
        name: 'Brócoli',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'crucíferas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Coliflor',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'crucíferas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Rábano',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'crucíferas',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Col',
        season: ['otoño', 'invierno'],
        group: 'crucíferas',
        portion: 0.5,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Col lombarda',
        season: ['otoño', 'invierno'],
        group: 'crucíferas',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Col de bruselas',
        season: ['otoño', 'invierno'],
        group: 'crucíferas',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Col kale',
        season: ['otoño', 'invierno'],
        group: 'crucíferas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Rúcula',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'crucíferas',
        portion: 1,
        unit: 'tz',
    },
    //hortalizas
    {
        name: 'Espinacas',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'hortalizas',
        portion: 1,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Endivia',
        season: ['otoño', 'invierno'],
        group: 'hortalizas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Escarola',
        season: ['otoño', 'invierno'],
        group: 'hortalizas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Acelga',
        season: ['otoño', 'invierno'],
        group: 'hortalizas',
        portion: 1,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Lechuga',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'hortalizas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Canónigos',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'hortalizas',
        portion: 1,
        unit: 'tz',
    },
    //hortalizas
    {
        name: 'Alcachofa',
        season: ['otoño', 'invierno'],
        group: 'otras verduras',
        portion: 1,
        unit: 'U',
        tags: ['eliminación']
    },
    {
        name: 'Apio',
        season: ['otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Berenjena',
        season: ['verano', 'primavera'],
        group: 'otras verduras',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Calabacín',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 1,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Cebolla',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Espárrago verde',
        season: ['primavera', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Judía verde',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Pepino',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Pimiento',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Puerro',
        season: ['primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Champiñones',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Setas',
        season: ['otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Tomate',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Tomate cherry',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Remolacha',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Zanahoria',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Calabaza',
        season: ['primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 1,
        unit: 'tz',
    },
    //frutas
    {
        name: 'Fruta de temporada',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
        tags: ['genérico']
    },
    {
        name: 'Caqui',
        season: ['otoño'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
    },
    {
        name: 'Kiwi',
        season: ['otoño', 'invierno'],
        group: 'frutas',
        portion: 2,
        unit: 'U',
    },
    {
        name: 'Mandarina',
        season: ['otoño', 'invierno'],
        group: 'frutas',
        portion: 2,
        unit: 'U',
    },
    {
        name: 'Manzana',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
        tags: ['eliminación']
    },
    {
        name: 'Naranja',
        season: ['primavera', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
    },
    {
        name: 'Pera',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
    },
    {
        name: 'Taronja',
        season: ['primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
    },
    {
        name: 'Dátil',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 4,
        unit: 'U',
    },
    {
        name: 'Pasas',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 0.25,
        unit: 'tz',
    },
    {
        name: 'Piña',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Papaya',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Mango',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 0.5,
        unit: 'U',
    },
    {
        name: 'Mango congelado',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Plátano',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
        tags: ['eliminación']
    },
    {
        name: 'Plátano congelado',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Albaricoque',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 2,
        unit: 'U',
    },
    {
        name: 'Ciruela',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 2,
        unit: 'U',
    },
    {
        name: 'Higos',
        season: ['verano'],
        group: 'frutas',
        portion: 2,
        unit: 'U',
    },
    {
        name: 'Melocotón',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
    },
    {
        name: 'Nectarina',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 1,
        unit: 'U',
    },
    {
        name: 'Uvas',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Melón',
        season: ['verano'],
        group: 'frutas',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Sandía',
        season: ['verano'],
        group: 'frutas',
        portion: 1,
        unit: 'tz',
    },
    //frutos rojos
    {
        name: 'Frutos rojos',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos rojos',
        portion: 0.5,
        unit: 'tz',
        tags: ['genérico']
    },
    {
        name: 'Fresa',
        season: ['primavera', 'invierno'],
        group: 'frutos rojos',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Cereza',
        season: ['primavera'],
        group: 'frutos rojos',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Frambuesa',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos rojos',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Arándano',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutos rojos',
        portion: 0.5,
        unit: 'tz',
        tags: ['eliminación']
    },
    {
        name: 'Granada',
        season: ['verano', 'otoño'],
        group: 'frutos rojos',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Mora',
        season: ['verano', 'otoño'],
        group: 'frutos rojos',
        portion: 0.5,
        unit: 'tz',
    },

]

const execSeeds = async () => {
    for (let seed of seeds) {
        let ingredient = await Ingredient.find({ name: seed.name })

        ingredient = ingredient.length && ingredient[0]

        if (ingredient) {
            const updates = Object.keys(seed)

            updates.forEach(update => ingredient[update] = seed[update])

            console.log('updated ingredient==>', ingredient.name)

            await ingredient.save()

        }

        if (!ingredient) {
            await Ingredient.create(seed)

            console.log('new ingredient==>', seed.name)
        }
    }
}

execSeeds()
    .then(() => {
        console.log('seeds done')
        mongoose.connection.close()
    }).catch(error => {
        console.log(error)
    })
