const express = require('express')
const Plan = require('../models/plan')
const router = new express.Router()
const auth = require('../middlewares/auth')
require('dotenv').config()

router.post('/plan', auth, async (req, res) => {
    const plan = new Plan(req.body)

    try {
        await plan.save()

        res.status(200).send({ plan })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/plan/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const plan = await Plan.findById(req.params.id)

        if (!plan) res.status(404).send('Plan not found')

        updates.forEach(update => plan[update] = req.body[update])

        await plan.save()

        res.status(200).send({ plan })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/plans', auth, async (req, res) => {
    try {
        const plans = await Plan.find()

        res.status(200).send({ plans })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/plan/:id', auth, async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id)
        if (!plan) res.status(404).send('Plan not found')

        res.status(200).send({ plan })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/plan/:id', auth, async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id)

        await plan.remove()

        res.send(plan)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router