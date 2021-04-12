const mongoose = require('mongoose')
const validator = require('validator')
const { genderEnum, tagEnum, utensilsEnum, daysEnum } = require('../bin/enums')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
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
    },
    gender: {
        type: String,
        enum: genderEnum,
    },
    height: {
        type: Number,
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
        type: [{
            name: String,
            time: String,
            carbs: Number,
            proteins: Number,
            veggies: Number,
            fats: Number,
            dairy: Number,
            omega3: Number,
            fruit: Number,
            berries: Number,
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
            },
        ]
    },
    history: {
        type: String,
        default: '<h2>Motivo de la consulta</h2><h2>&nbsp;</h2><h2>Evaluación clínica y fisiológica</h2><h3>Antecedentes personales y familiares</h3><h3>Alteraciones en la analítica&nbsp;</h3><h3>Medicación</h3><h3>Historia del peso</h3><h3>Otros (deposiciones, ciclo menstrual, alergias o intolerancias)</h3><p>&nbsp;</p><h2>Hábitos alimentarios y de salud</h2><h3>Recuento 3 días</h3><h3>Plan de ejercicio</h3><h3>Otros (alimentos excluidos, suplementación)</h3><p>&nbsp;</p><h2>Organización y planificación de las comidas</h2><h3>Ocupación</h3><p><strong>Preparación y compra</strong></p><p>&nbsp;</p><p>&nbsp;</p>'
    },
}, { timestamps: { createdAt: 'created_at' } })

patientSchema.virtual('checks', {
    ref: 'Check',
    localField: '_id',
    foreignField: 'patient'
})

patientSchema.methods.toJSON = function () {
    return this.toObject({ virtuals: true })
}

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
