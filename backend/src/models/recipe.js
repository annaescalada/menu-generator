const mongoose = require('mongoose')
const { mealEnum, utensilsEnum, seasonEnum , recipeGroups, exclusiveTags, inclusiveTags } = require('../bin/enums') 
const _ = require('lodash')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    meal: {
        type: String,
        enum: mealEnum
    },
    image: {
        type: String,
    },
    season: [{
        type: String,
        enum: seasonEnum,
        required: true,
    }],
    tags: [{
        type: String,
        enum: [...inclusiveTags, ...exclusiveTags]
    }],
    ingredients: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: true
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
