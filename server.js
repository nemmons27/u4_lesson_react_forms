const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const PORT = process.env.PORT || 3001

const db = require('./db')

const { Issue } = require('./models')

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))


app.get('/issues', async (req, res) => {
    let issues = await Issue.find({})
    res.send(issues)
})

app.post('/issues', async (req, res) => {
    let newIssue = await Issue.create(req.body)
    res.send(newIssue)
})

app.listen(PORT, () => {
    console.log(`Connected to port:`, PORT)
})