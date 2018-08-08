var mongoose = require('mongoose');

// remote db connection settings. 
var connectionString = "mongodb://solomon:asasasas11@ds239911.mlab.com:39911/mongodb_sandbox";
mongoose.connect(connectionString);
 
var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));

var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 price: String, 
 brand: String  

},

{collection: 'coffee' 

}); 

module.exports = mongoose.model('Coffee', mySchema);