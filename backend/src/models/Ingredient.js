const mongoose = require('mongoose')
const validator =  require('validator')

const Ingredient = mongoose.model('Ingredient', {
    name: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: Number,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error ('Password cannot contain password.')
            }

        }
    }
})