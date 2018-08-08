'use strict';

let movies = require("./lib/book_module.js");

var bookMethods = require("./lib/book_module.js");
var Book = require("./models/book.js"); // use database model


const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").json());
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
//GET THE JSON LIST OUT OF THE DETAILS OF JSON
//API SHOWING ALL TYPES
app.get('/api/books', (req, res, next) => {
  bookMethods.getAll().then((items) => {
    if (!items){
        return res.status(500).send("Error your not allowed in our database.");
    }
    res.json(items);
  }).catch((err) =>{
//CHECK FOR MORE ERRORS
    return res.status(500).send("Error your not allowed in our database.");
  });
}); 

//API DISPLAY ONLY ONE TYPE IN COFFEE SCHEMA
app.get('/api/books/:title', (req,res, next) => {
  Book.findOne({ title:req.params.title }).then((item) => {
    if (!item){
      return res.status(500).send('Error occurred: database error.');
    }
    res.json(item); 
  }).catch((err) =>{
    //return next(err);
    return res.status(500).send('Error occurred: database error.');
  });
});



//API DELETING ONE TYPE ONLY FROM COFFEE SCHEMA
// app.get('api/books/delete/:type', (req.res, next) => {
//     Book.remove({type:req.parma.type }).then((item) => {
//         if(!item){
//             return res.status(500).send('Error your not allowed in our database.');
//         }
//         res.json(item);
//     }).catch((err) => {
//             return res.status(500).send('Error your not allowed in our database.');

//     });
// });
app.get('/api/books/delete/:title', (req,res, next) => {
  Book.remove({ title:req.params.title }).then((item) => {
    if (!item){
      return res.status(500).send('Error occurred: database error.');
    }
    res.json(item); 
  }).catch((err) =>{
    //return next(err);
    return res.status(500).send('Error occurred: database error.');
  });
});




//API SHOWS ALL THE TYPES FROM COFFEE SCHEMA
app.post('/api/books/add', (req,res, next) => {
  Book.update({ 'title': req.body.title }, req.body, { upsert: true }, (err, result) => {
    console.log(err);
    if (err) {
      res.json({'status':'error', 'message': err});
    } else {
      res.json({'status':'success'});
    }
        console.log(result);

  });
});








// FOR SHOWING DETAILS
app.get('/details', (req,res,next) => {
    Book.findOne({ type:req.query.type }, (err, coffee) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: coffee} ); 
    });
});

// FOR SHOWING DETAILS
app.post('/details', (req,res, next) => {
    Book.findOne({ type:req.body.type }, (err, coffee) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: coffee} ); 
    });
});


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


//  404 HANDLER 
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

// 500 handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



app.listen(app.get('port'), function() {
    console.log('Express started Solomon is the man');    
});
