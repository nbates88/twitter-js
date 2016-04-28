var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser  = require('body-parser');
module.exports = function(io){


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
router.use(express.static('public'));

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  console.log(tweets);
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true} );
});

router.get( '/users/:name', function (req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  console.log(list);
  res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list, showForm: true} );
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

router.get( '/tweets/:id', function (req, res) {
  var id = req.params.id;
  var tweets = tweetBank.list();
  var uniqueId = tweetBank.find(tweets[id]);
  res.render( 'index', { title: 'Twitter.js - Posts by '+ id, tweets: uniqueId, showForm: false} );
});

return router;
}
