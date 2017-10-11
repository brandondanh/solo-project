//model/comments.js

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var TodoSchema = new Schema({
 user: 'string',
 notes: ['string'],
 zip: 'string'
});
//export our module to use in server.js
module.exports = mongoose.model('Todo_Item', TodoSchema);