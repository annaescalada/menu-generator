const express = require('express')
const router = new express.Router()
const auth = require('../middlewares/auth')
const enums = require('../bin/enums')
require('dotenv').config()

router.get('/enums', auth, (req, res) => {
    res.status(200).send({ enums })
})

module.exports = router