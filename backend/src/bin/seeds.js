const mongoose = require('mongoose');
require('dotenv').config()

// setup mongoose
mongoose.connect('mongodb://127.0.0.1:27017/menu-generator-api', {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
// mongoose.connect(process.env.MONGODB_URL, {
//     keepAlive: true,
//     useNewUrlParser: true,
//     reconnectTries: Number.MAX_VALUE
// });

const Ingredient = require('../models/Ingredient.js')

const seeds = [
    //condimentos
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
        unit: 'u',
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
        unit: 'u',
        tags: 'huevo'
    },
    //pescado
    {
        name: 'Pescado',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'pescados',
        portion: 100,
        unit: 'g',
        tags: 'pescado'
    },
    //carnes
    {
        name: 'Carne',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'carnes',
        portion: 100,
        unit: 'g',
        tags: 'carne'
    },
    //lácteos
    {
        name: 'Leche',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 1,
        unit: 'tz',
        tags: 'lácteo'
    },
    {
        name: 'Yogur',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 0.5,
        unit: 'tz',
        tags: 'lácteo'
    },
    {
        name: 'Queso',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos',
        portion: 20,
        unit: 'g',
        tags: 'lácteo'
    },
    //lácteos vegetales
    {
        name: 'Leche vegetal',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos vegetales',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Yogur vegetal',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'lácteos vegetales',
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
        portion: 0.5,
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
        unit: 'u',
    },
    {
        name: 'Coco rallado',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 1,
        unit: 'cs',
    },
    {
        name: 'Chocolate negro 85%',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'condimentos',
        portion: 10,
        unit: 'g',
    },
    //legumbres
    {
        name: 'Garbanzos',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Lentejas',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Lentejas rojas',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Judía blanca',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Frijoles',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Guisantes',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Edamames',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'legumbres',
        portion: 1,
        unit: 'tz',
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
    },
    {
        name: 'Arroz basmati',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Quinoa',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Trigo sarraceno',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Mazorcas de maíz',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 2,
        unit: 'u',
    },
    {
        name: 'Tortitas de maíz',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 2,
        unit: 'u',
        tags: ['semiprocesado']
    },
    {
        name: 'Pan integral',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'cereales',
        portion: 50,
        unit: 'g',
        tags: ['semiprocesado']
    },
    {
        name: 'Pasta integral',
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
        unit: 'u',
    },
    {
        name: 'Boniato',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'tubérculos',
        portion: 1,
        unit: 'u',
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
        unit: 'u',
    },
    {
        name: 'Apio',
        season: ['otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
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
    },
    {
        name: 'Calabacín+',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 2,
        unit: 'tz',
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
    },
    {
        name: 'Judía verde',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
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
        name: 'Puerro+',
        season: ['primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 2,
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
    },
    {
        name: 'Zanahoria',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Zanahoria+',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 2,
        unit: 'tz',
    },
    {
        name: 'Calabaza',
        season: ['primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 1,
        unit: 'tz',
    },
    {
        name: 'Calabaza+',
        season: ['primavera', 'otoño', 'invierno'],
        group: 'otras verduras',
        portion: 2,
        unit: 'tz',
    },
    //frutas
    {
        name: 'Caqui',
        season: ['otoño'],
        group: 'frutas',
        portion: 1,
        unit: 'u',
    },
    {
        name: 'Kiwi',
        season: ['otoño', 'invierno'],
        group: 'frutas',
        portion: 2,
        unit: 'u',
    },
    {
        name: 'Mandarina',
        season: ['otoño', 'invierno'],
        group: 'frutas',
        portion: 2,
        unit: 'u',
    },
    {
        name: 'Manzana',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'u',
    },
    {
        name: 'Pera',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'u',
    },
    {
        name: 'Taronja',
        season: ['primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 1,
        unit: 'u',
    },
    {
        name: 'Dátil',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 4,
        unit: 'u',
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
        name: 'Mango',
        season: ['verano', 'primavera', 'otoño', 'invierno'],
        group: 'frutas',
        portion: 0.5,
        unit: 'u',
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
        unit: 'u',
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
        unit: 'u',
    },
    {
        name: 'Ciruela',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 2,
        unit: 'u',
    },
    {
        name: 'Higos',
        season: ['verano'],
        group: 'frutas',
        portion: 2,
        unit: 'u',
    },
    {
        name: 'Melocotón',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 1,
        unit: 'u',
    },
    {
        name: 'Nectarina',
        season: ['verano', 'primavera'],
        group: 'frutas',
        portion: 1,
        unit: 'u',
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
    },
    {
        name: 'Granada',
        season: ['verano','otoño'],
        group: 'frutos rojos',
        portion: 0.5,
        unit: 'tz',
    },
    {
        name: 'Mora',
        season: ['verano','otoño'],
        group: 'frutos rojos',
        portion: 0.5,
        unit: 'tz',
    },
]

Ingredient.deleteMany({})
    .then(() => {
        Ingredient.create(seeds).then((ingredient) => {
            console.log('seed ingredient==>', ingredient)
            mongoose.connection.close()
        }).catch((error) => {
            console.log(error)
        })
    })