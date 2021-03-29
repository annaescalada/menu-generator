const express= require('express')
require('./db/mongoose')
require('dotenv').config();

const userRouter = require('./controllers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})
