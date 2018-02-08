const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(bodyParser.json())
app.use(cors())

morgan.token('info', getInfo = (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :info :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'missing name or number' })
    }
    Person.findOne({ name: body.name })
        .then(person => {
            if (person) {
                return response.status(400).json({ error: 'name must be unique' }).end()
            }
            const newPerson = new Person(
                {
                    name: body.name,
                    number: body.number
                })

            newPerson
                .save()
                .then(savedPerson => {
                    response.json(Person.format(savedPerson))
                })
                .catch(error => {
                    console.log(error)
                })
        }
        )
})

app.get('/api/persons', (request, response) => {
    Person
        .find({}, { __v: 0 })
        .then(persons => {
            response.json(persons.map(Person.format))
        })
        .catch(error => {
            console.log(error)

        })
})

app.get('/info', (request, response) => {
    Person
        .find({}, { __v: 0 })
        .then(persons => {
            const length = persons.length
            const today = new Date()
            response.send('<div>puhelinluettelossa on ' + length + ' henkilön tiedot </div><div>' + today + '</div>')
        })
        .catch(error => {
            console.log(error)
        })

})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            response.json(Person.format(person))
        })
        .catch(error => {
            console.log(error)
        })
})

app.put('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndUpdate(request.params.id, request.body)
        .then(() => {
            response.status(200).end()
        })
        .catch(error => {
            console.log(error)
        })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(200).end()
        })
        .catch(error => {
            console.log(error)
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})