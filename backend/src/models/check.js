const mongoose = require('mongoose')

const checkSchema = new mongoose.Schema({
    patient: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Patient',
        required: true
    },
    weight: { 
        type: Number,
        required: true
    },
    PA: Number,
    PC: Number,
    FA: {
        type: Number,
        required: true,
    },
}, { timestamps: { createdAt: 'created_at' } })

const Check = mongoose.model('Check', checkSchema)

module.exports = Check
