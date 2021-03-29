// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         required: true,
//     },
//     season: [{
//         type: String,
//         enum: ['verano', 'invierno', 'otoño', 'primavera'],
//         required: true,
//     }],
//     group: {
//         type: String,
//         enum: [
//             'cereales', 
//             'legumbres', 
//             'frutos secos', 
//             'omega 3', 
//             'frutas', 
//             'frutos rojos', 
//             'grasas saludables', 
//             'otras verduras', 
//             'crucíferas', 
//             'hortalizas', 
//             'làcteos vegetales',
//             'condimento',
//             'salsa'
//         ]
//     },
//     portion: {
//         XS: Number,
//         S:Number,
//         M: Number,
//         L: Number,
//         XL: Number
//     },
//     units: {
//         type: String,
//         enum: ['tz', 'cs', 'cp', 'u']
//     },
//     ingredients: {
//         type: [mongoose.Schema.Types.ObjectId],
//         ref: 'Ingredient',
//         required: function () {
//             return this.isComplex
//         }
//     },
//     preparation: {
//         type: [{
//             step: Number,
//             text: String
//         }],
//         required: function () {
//             return this.isComplex
//         }
//     },
//     duration: Number,
//     isComplex: Boolean
// })

// const Ingredient = mongoose.model('Ingredient', userSchema)

// module.exports = Ingredient
