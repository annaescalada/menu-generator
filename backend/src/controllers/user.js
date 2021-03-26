const express =require('express')
const User = require('../models/User')
const router = new express.Router()

router.post('/users', async (req, res) => {
    console.log('here')
    const { email, password } = req.body

    const user = new User({ email, password })

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach(update => user[update] = req.body[update])

        await user.save()

        if (!user) return res.status(400).send('User not found')

        res.status(200).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router