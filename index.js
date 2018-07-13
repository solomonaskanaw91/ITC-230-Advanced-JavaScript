var qs = require("querystring");
var http = require("http"), fs = require('fs');
var coffee = require('./lib/module.js');

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
  let url = req.url.split("?");  
  let query = qs.parse(url[1]); // convert query string to object

             console.log( JSON.stringify(query) + "\n");
  let path = url[0].toLowerCase();
  
  switch(path) {
    
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
      
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About:  \nWeb application \Node.js web application. ');
      break;
 
      case '/getall':                 
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let found4 = coffee.getAll();         
      let results4 = (found4) ? JSON.stringify(found4) : "Not found";
      res.write(results4 + "\n");
      res.end("\n");
      break;
      
    
    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});

      coffee.delete(query.type); 
      let found5   = coffee.getAll();
      let results5 = (found5) ? JSON.stringify(found5) : "Not found";
      res.end(results5 + "\n \n"); 
      break;
      
    case '/add':
      res.writeHead(200, {'Content-Type': 'text/plain'});

      coffee.add(query); 
        
      let found6   = coffee.getAll();
      let results6 = (found6) ? JSON.stringify(found6) : "Not found";
      res.end(results6 + "\n \n"); 
      break;

    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404: ERROR   Page not found.  ');
  }
  
}).listen(process.env.PORT || 3000);
console.log('after createServer');