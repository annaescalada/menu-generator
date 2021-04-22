const mongoose = require('mongoose')
const { groupEnum, seasonEnum, portionEnum, utensilsEnum, exclusiveTags, inclusiveTags } = require('../bin/enums') 

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    season: [{
        type: String,
        enum: seasonEnum,
        required: true,
    }],
    group: {
        type: String,
        required: true,
        enum: groupEnum
    },
    portion: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        enum: portionEnum
    },
    tags: [{
        type: String,
        enum: [...exclusiveTags, ...inclusiveTags]
    }],
    isComplex: {
        type: Boolean,
        default: false
    },
    portionAmount: Number,
    duration: {
        type: Number,
        reqwuired: true
    },
    ingredients: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ingredient',
        required: function () {
            return this.isComplex
        }
    },
    preparation: {
        type: String,
        required: function () {
            return this.isComplex
        }
    },
    utensils: {
        type: [{
            type: String,
            enum: utensilsEnum
        }],
        required: function () {
            return this.isComplex
        }
    },
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient
