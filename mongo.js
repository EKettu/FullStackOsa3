// const mongoose = require('mongoose')

// const url = 'mongodb://henkilo:MursutLaskettelevat@ds125288.mlab.com:25288/fullstack-persons'

// mongoose.connect(url)

// const Person = mongoose.model('Person', {
//     name: String,
//     number: String
// })

// if (process.argv.length < 3) {
//     console.log('puhelinluettelo:')
//     Person
//         .find({})
//         .then(result => {
//             result.forEach(person => {
//                 console.log(person.name, person.number)
//             })
//             mongoose.connection.close()
//         })
// }

// else {

//     const person = new Person({
//         name: process.argv[2],
//         number: process.argv[3]
//     })

//     person
//         .save()
//         .then(response => {
//             console.log('lisätty henkilö ' + person.name + ' numero ' + person.number + ' luetteloon')
//             mongoose.connection.close()
//         })

// }