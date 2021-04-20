const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    recommendations: String,
    distribution: {
        type: [{
            name: String,
            time: String,
            carbs: Number,
            proteins: Number,
            cruciferous: Number,
            otherVeggies: Number,
            greens: Number,
            fats: Number,
            dairy: Number,
            omega3: Number,
            fruit: Number,
            berries: Number,
            text: String
        }],
        default: [
            {
                name: 'Desayuno',
                time: '9:00',
                carbs: 1,
                proteins: 0,
                veggies: 0,
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
                veggies: 1,
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
                veggies: 1,
                fats: 1,
                dairy: 0,
                omega3: 0,
                fruit: 0,
                berries: 0,
                text: ''
            },
        ]
    }
}, { timestamps: { createdAt: 'created_at' } })

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan