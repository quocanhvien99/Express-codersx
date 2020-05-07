var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    name: String,
    subdoc: [{}] 
  }, { strict: false });
  
  var Test = mongoose.model('Test', testSchema, 'test');  
  

router.get('/', async function(req, res) {    
    //await Test.create({ name: 'gio hang' });
    var testDoc = await Test.findOne({ name: 'gio hang' });
    //testDoc.subdoc.push({ 'sadcsdc343': 1 });
    //var update = await testDoc.save();
    //Test.create({});
    console.log(testDoc.subdoc[0]);
});

module.exports = router;