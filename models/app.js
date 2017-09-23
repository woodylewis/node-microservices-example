const mongoose = require('mongoose');
const Person = mongoose.Schema;

const PersonSchema = new Person({
    firstName: String,
    lastName: String,
    email: String
});

module.exports = mongoose.model('Person', PersonSchema);