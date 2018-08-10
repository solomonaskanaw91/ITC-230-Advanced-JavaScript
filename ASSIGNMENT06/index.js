'use strict';

let express = require("express");
let bodyParser = require("body-parser");
let Book = require("./models/book.js"); 

let app = express();


// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use('/api', require("cors")()); Testing the api().
app.use((err, req, res, next) => {
  console.log(err);
});

///Set the template engine

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

 
// GET ALL DEFAULT TO WEB PAGE
app.get('/', (req,res, next) => {
    Book.find((err,books) => {
        if (err) return next(err);
        res.render('home', {books: JSON.stringify(books)});    
    });
});

// send plain text response
// for the ABOUT PAGE
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});


//api's
app.get('api/v1/book/:title', (req, res, next) =>{
        let title = req.params.title;
        Book.findOne({title: title},(err, results) =>{
            if (err || !result) return next(err);
            res.json( result );
        });
    });
    
app.get('api/v1/books', (req, res, next) =>{
        Book.find((err, results) => {
            if (err || !result) return next(err);
            res.json( result );
        });
    });
app.get('api/v1/delete/:id', (req,res, next) =>{
    Book.remove({"_id":req.params.id }, (err, result) => {
        if(err) return next(err);
        res.json({"deleted ":result.n});
    });
});

// FOR SHOWING DETAILS
app.get('/details', (req,res,next) => {
    Book.findOne({ title:req.query.type}, (err, coffee) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: coffee} ); 
    });
});

app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new 
    if (!req.body._id) { // insert new document
        let book = new Book({title:req.body.type,brand:req.body.price,price:req.body.price});
        book.save((err,newBook) => {
            if (err) return next(err);
            res.json({updated: 0, _id: newBook._id});
        });
    } else { // update existing document
        Book.updateOne({ _id: req.body._id}, {title:req.body.title, brand: req.body.brand, price: req.body.price }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

app.get('/api/v1/add/:title/:brand/:price', (req,res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    Book.update({ title: title}, {title:title, brand: req.params.brand, price: req.params.price }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});
