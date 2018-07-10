var http = require("http"), fs = require('fs');
var coffee = require('./lib/coffee.js');
function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  console.log(__dirname + path);
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer(function(req,res){
  console.log('createServer got request');
  var path = req.url.toLowerCase();
  switch(path) {
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About: Working in progress');
      break;
     case '/getall':
       let found = coffee.getAll();
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = JSON.stringify(found);
      res.end(results);
      break;
      case '/delete':
      let deleted = coffee.delete(brand);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let delected = (deleted) ? JSON.stringify(deleted): "Not found";
      case '/add':
      let added = coffee.add(type.FlateWhite);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(results);
      break;
   
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3000);
 