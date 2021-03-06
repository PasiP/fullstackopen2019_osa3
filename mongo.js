const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,

})
const Person = mongoose.model('Person', personSchema)
const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@cluster0-sca9s.mongodb.net/person-app?retryWrites=true`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

if (process.argv.length<3){
  console.log('give password as argument')
  process.exit(1)
}
else if ( process.argv.length<4 ) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name,' ',person.number )
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: 1,
  })

  person.save().then(response => {
    console.log('added', person.name,' ',person.number ,' to phonebook')
    mongoose.connection.close()
  })
}
