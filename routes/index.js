var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cars', function(req, res) {
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb+srv://new_user:chirag99@cluster0-qwtph.mongodb.net/?retryWrites=true&w=majority';

  MongoClient.connect(url, function(err, client){
    if(err){
      console.log("Unable to connect to server",err);
    }else{
      console.log("Connection established");

      var db = client.db('cars');
      var collection = db.collection('cars');
      collection.find({}).toArray(function(err, result){
        if(err){
          res.send(err);
        }else if(result.length){
          res.render('carslist',{
            "cars": result
          });
        }else{
          res.send("No documents found");
        }
        client.close();
      });
    }
  });
});

module.exports = router;
