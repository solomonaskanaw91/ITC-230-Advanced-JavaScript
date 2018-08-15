var Book = require("../models/book.js");

exports.getAll = () => {
  return Book.find({}, (err, result) => {
    if (err) {
      return err;
    }
    
    console.log(result.length);
    
    return result;
  });
};

