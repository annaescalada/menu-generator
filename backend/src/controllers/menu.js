const express = require('express')
const Menu = require('../models/menu')
const router = new express.Router()
const auth = require('../middlewares/auth')
require('dotenv').config()

router.post('/menu', auth, async (req, res) => {
    const menu = new Menu(req.body)

    try {
        await menu.save()

        res.status(200).send({ menu })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/menu/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const menu = await Menu.findById(req.params.id)

        if (!menu) res.status(404).send('Menu not found')

        updates.forEach(update => menu[update] = req.body[update])

        await menu.save()

        res.status(200).send({ menu })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/menus', auth, async (req, res) => {
    try {
        const menus = await Menu.find().populate('content.recipe content.basic.ingredients')

        res.status(200).send({ menus })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/menu/:id', auth, async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)

        if (!menu) res.status(404).send('Menu not found')

        res.status(200).send({ menu })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/menu/:id', auth, async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)

        await menu.remove()

        res.send(menu)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router