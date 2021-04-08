const mongoose = require('mongoose')
const { mealEnum, utensilsEnum } = require('../bin/enums') 

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    meal: {
        type: String,
        enum: mealEnum
    },
    carbs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'desayuno' || this.meal === 'comida'
        }
    },
    proteins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'comida'
        }
    },
    veggies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'comida'
        }
    },
    fats: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'desayuno' || this.meal === 'comida'
        }
    },
    dairy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'desayuno'
        }
    },
    omega3: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'desayuno'
        }
    },
    fruit: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'desayuno'
        }
    },
    berries: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.meal === 'desayuno'
        }
    },
    condiments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
    },
    duration: {
        type: Number,
        required: true
    },
    preparation: {
        type: String,
        required: true
    },
    utensils: {
        type: [{
            type: String,
            enum: utensilsEnum
        }],
        required: true
    },
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
