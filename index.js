require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const PORT = process.env.PORT
const date = new Date()

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const name = request.body.name
	const number = request.body.number

	const person = new Person({
		name: name,
		number: number
	})
	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
		.catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
		.catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if(person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))

})

app.get('/info', (request, response) => {
	response.send(`Phonebook has info for ${persons.length} people  <br/> <br/> ${date}`)
})

const errorHandler = (error, request, response, next) => {
	console.log(error)
	if (error.name === 'ValidationError') {
		return response.status(400).send({error: error.message})
	}
	response.status(500).send({error: 'error, check log for details'})
}

app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`We are running on ${PORT}`)
})