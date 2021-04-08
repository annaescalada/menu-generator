const express = require('express')
const Patient = require('../models/patient')
const Check = require('../models/check')
const router = new express.Router()
const auth = require('../middlewares/auth')
require('dotenv').config()

router.post('/patient', auth, async (req, res) => {
    const patient = new Patient(req.body)

    try {
        await patient.save()

        res.status(200).send({ patient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/patient/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const patient = await Patient.findById(req.params.id)

        if (!patient) res.status(404).send('Patient not found')
        
        updates.forEach(update => patient[update] = req.body[update])

        await patient.save()

        res.status(200).send({ patient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/patients', auth, async (req, res) => {
    try {
        const patients = await Patient.find().select('name')

        res.status(200).send({ patients })
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/patient/:id', auth, async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('checks')

        if (!patient) res.status(404).send('Patient not found')

        res.status(200).send({ patient })
    } catch(e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.delete('/patient/:id', auth, async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id)

        await patient.remove()

        res.send(patient)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/patient/check', auth, async (req, res) => {
    const check = new Check(req.body)

    try {
        await check.save()

        res.status(200).send({ check })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/patient/check/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const check = await Check.findById(req.params.id)

        if (!check) res.status(404).send('Check not found')
        
        updates.forEach(update => check[update] = req.body[update])

        await check.save()

        res.status(200).send({ check })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/patient/check/:id', auth, async (req, res) => {
    try {
        const check = await Check.findById(req.params.id)

        await check.remove()

        res.send(check)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router