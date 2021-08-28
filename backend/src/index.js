const express= require('express')
const cors = require("cors");
require('./db/mongoose')
require('dotenv').config({ path: '../.env'})

const userRouter = require('./controllers/user')
const ingredientRouter = require('./controllers/ingredient')
const recipesRouter = require('./controllers/recipe')
const patientRouter = require('./controllers/patient')
const planRouter = require('./controllers/plan')
const menuRouter = require('./controllers/menu')
const sharedRouter = require('./controllers/shared')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(cors());

app.use(userRouter)
app.use(ingredientRouter)
app.use(recipesRouter)
app.use(patientRouter)
app.use(planRouter)
app.use(menuRouter)
app.use(sharedRouter)

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})

//initialize mongo: /Users/annaescalada/code/mongoDB/bin/mongod --dbpath=/Users/annaescalada/code/mongoDB-data
