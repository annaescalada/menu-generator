const mongoose = require('mongoose')
const { seasonEnum, exclusiveTags, inclusiveTags, utensilsEnum, daysEnum, menuMealEnum } = require('../bin/enums')

const contentKeys = () => {
    let keys = {}
    daysEnum.forEach(day => {
        menuMealEnum.forEach(meal => {
            keys[`${day}_${meal}`] = {
                name: String,
                recipe: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Recipe',
                },
                ingredients: {
                    type: [mongoose.Schema.Types.ObjectId],
                    ref: 'Ingredient',
                },
            }
        })
    })
    return keys
}


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
    toExcludeTags: [{
        type: String,
        enum: [...inclusiveTags, ...exclusiveTags]
    }],
    toIncludeTags: [{
        type: String,
        enum: [...inclusiveTags, ...exclusiveTags]
    }],
    utensils: {
        type: [{
            type: String,
            enum: utensilsEnum,
            required: true,
        }],
    },
    content: {
        ...contentKeys()
    }
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu
