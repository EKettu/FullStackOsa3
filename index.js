const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())

morgan.token('info', function getInfo(req) {
    return JSON.stringify(req.body)
})

//app.use(morgan('tiny'))
app.use(morgan(':method :url :info :status :res[content-length] - :response-time ms'))


app.use(express.static('build'))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

app.post('/api/persons', (request, response) => {
    const body = request.body
    const id = Math.floor(Math.random() * 1000)

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'missing name or number' })
    }
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: id
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/build/index.html'));
    //response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const length = persons.length
    const today = new Date()
    response.send('<div>puhelinluettelossa on ' + length + ' henkilön tiedot </div><div>' + today + '</div>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})