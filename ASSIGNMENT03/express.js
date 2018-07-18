"Use strict"

let array_coffee = require("../lib/coffee.js"); 
const express = require("express");
const app = express();

console.log(__dirname);

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

app.get('/', (req,res) => {
    res.render('home', {array_coffee: array_coffee.getAll()}); 
});

// send plain text response
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

// handle GET 
app.get('/delete', function(req,res){
    let result = array_coffee.delete(req.query.type); // delete array_coffee object
    res.render('delete', {type: req.query.type, result: result});
});

app.get('/detail', function(req,res){
    console.log(req.query)
    var found = array_coffee.get(req.query.type);
    res.render("details", {
        type: req.query.type, 
        result: found
        }
    );
});

// handle POST
app.post('/detail', function(req,res){
    console.log(req.body)
    var found = array_coffee.get(req.body.type);
    res.render("details", {type: req.body.type, result: found, array_coffees: array_coffee.getAll()});
});

// define 404 handler
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});