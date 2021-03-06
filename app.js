var express = require('express');
var http = require('http');
var swig = require('swig');
var app = express(); // creates an instance of an express application

var routes = require('./routes/');
var socketio = require('socket.io');
// ...

app.use('/', routes(io));


var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
    console.log(output);
});

app.engine('html', swig.renderFile);

app.set('view engine', 'html');

app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

app.use(function (req, res, next) {
	// do your logging here
	console.log(req.method, req.url, res.statusCode);
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    next();
});

app.use('/special/*', function(req, res, next){
	console.log('you have reached the special area');
});

var server = app.listen(3000);
var io = socketio.listen(server);


//this is a comment from nichole 
//new comment