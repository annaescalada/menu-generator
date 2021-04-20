const express = require('express')
const Recipe = require('../models/recipe')
const router = new express.Router()
const auth = require('../middlewares/auth')
const { portionDistributionGroups } = require('../bin/enums')
require('dotenv').config();

router.post('/recipe', auth, async (req, res) => {
    const recipe = new Recipe(req.body)

    try {
        await recipe.save()

        res.status(200).send({ recipe })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/recipe/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const recipe = await Recipe.findById(req.params.id)

        if (!recipe) res.status(404).send('Recipe not found')

        updates.forEach(update => recipe[update] = req.body[update])

        await recipe.save()

        res.status(200).send({ recipe })
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/ingredient/:id', auth, async (req, res) => {
//     try {
//         const ingredient = await Ingredient.findById(req.params.id).populate('ingredients')

//         if (!ingredient) res.status(404).send('Ingredient not found')

//         res.send.status(200).send({ ingredient })
//     } catch(e) {
//         res.status(400).send(e)
//     }
// })

router.get('/recipes', auth, async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate([...portionDistributionGroups, 'condiments'].join(' '))

        for (let recipe of recipes) {
            recipe.season = []
            recipe.tags = []
        }

        res.status(200).send({ recipes })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/recipe/:id', auth, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)

        await recipe.remove()

        res.send(recipe)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router