const mongoose = require('mongoose')
const { groupEnum, seasonEnum, portionEnum, exclusiveTags, inclusiveTags, utensilsEnum } = require('../bin/enums') 

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    season: [{
        type: String,
        enum: seasonEnum,
        required: true,
    }],
    tags: [{
        type: String,
        enum: [...exclusiveTags, ...inclusiveTags],
        required: true,
    }],
    utensils: {
        type: [{
            type: String,
            enum: utensilsEnum,
            required: true,
        }],
    },
    content: {
        type: Object
    }
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu
