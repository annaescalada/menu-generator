const express = require('express')
const Ingredient = require('../models/ingredient')
const router = new express.Router()
const auth = require('../middlewares/auth')
require('dotenv').config()

router.post('/ingredient', auth, async (req, res) => {
    const ingredient = new Ingredient(req.body)

    try {
        await ingredient.save()

        res.status(200).send({ ingredient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/ingredient/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const ingredient = await Ingredient.findById(req.params.id)

        if (!ingredient) res.status(404).send('Ingredient not found')

        updates.forEach(update => ingredient[update] = req.body[update])

        await ingredient.save()

        res.status(200).send({ ingredient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/ingredient/:id', auth, async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id).populate('ingredients')

        if (!ingredient) res.status(404).send('Ingredient not found')

        res.send.status(200).send({ ingredient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/ingredients', auth, async (req, res) => {
    try {
        const ingredients = await Ingredient.find().populate('ingredients').sort({ 'name': 1 })

        res.status(200).send({ ingredients })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/ingredient/:id', auth, async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id)

        await ingredient.remove()

        res.send(ingredient)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router