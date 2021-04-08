const mongoose = require('mongoose')
const validator = require('validator')
const { genderEnum, tagEnum, utensilsEnum, daysEnum } = require('../bin/enums')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is incorrect')
            }
        }
    },
    phone: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: genderEnum,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    tags: [{
        type: String,
        enum: tagEnum
    }],
    utensils: {
        type: [{
            type: String,
            enum: utensilsEnum
        }],
    },
    preparationDays: [{
        type: String,
        enum: daysEnum
    }],
    portionDistribution: {

    },
    history: {
        type: String,
    },
}, { timestamps: { createdAt: 'created_at' } })

patientSchema.virtual('checks', {
    ref: 'Check',
    localField: '_id',
    foreignField: 'patient'
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
