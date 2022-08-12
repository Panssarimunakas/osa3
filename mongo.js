const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url =  `mongodb+srv://taikamuki:${password}@puhelinluettelo.npy9vgz.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

//const generateId = () => Math.floor(Math.random() * 1000)

const person = new Person({
    name: personName,
    number: personNumber
})

if(!personName) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    person.save().then(result => {
        console.log(`added ${personName} with number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}