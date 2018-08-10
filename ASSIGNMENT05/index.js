'use strict';

//let movies = require("./lib/book_module.js");

var bookMethods = require("./lib/book_module.js");
var Book = require("./models/book.js"); // use database model


const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

 
// GET ALL DEFAULT TO WEB PAGE
app.get('/', (req, res, next) => {
  bookMethods.getAll().then((items) => {
      res.render('home', {coffee: items });
  }).catch((err) =>{
    return next(err);
  });
});

app.get('')

// FOR SHOWING DETAILS
app.get('/details', (req,res,next) => {
    Book.findOne({ title:req.query.title }, (err, coffee) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: coffee} ); 
    });
});

// FOR SHOWING DETAILS
app.post('/details', (req,res, next) => {
    Book.findOne({ title:req.body.title }, (err, coffee) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: coffee} ); 
    });
});


// // FOR deleting  route
// app.get('/delete', (req,res, next) => { 
//     Book.remove({ title:req.query.title }, (err, total) => { 
//         if (err) return next(err);
//         let deleted = result.n !== 0; 
//      //   Book.count({},  (err, total) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ) => {
//              res.type('text/html');
//              res.render('delete', {title: req.query.title, deleted:deleted , total:total } );    
//         }); 
//     });  

app.get('/delete', (req,res, next) =>{
    Book.remove({title:req.query.title}, (err, result) => {
        if(err) return next(err);
        let deleted = result.n !==0; 
        Book.count({}, (err,total) => {
            res.type('text/html');
            res.render('delete', {title: req.query.title, deleted:deleted, total:total} );
        });
    });
});






// send plain text response
// for the ABOUT PAGE
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});



// app.get('/get', function(req,res){
//     res.type('text/html');
//     var found = Book.get(req.query.title);
//     res.render('details', {result: found} );    
// });

// app.post('/get', function(req,res){
//     res.type('text/html');
//     var found = Book.get(req.body.title);
//     res.render('details', {result: found} );    
// });
// define 404 handler
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});


app.listen(app.get('port'), function() {
    console.log('Express started Solomon is the man');    
});
