////Created the array_coffee 
var array_coffee = [
    {type:"americano",price:3.00, brand:"Starbucks",size:16,temputure:"195F"},
    {type:"mocha",price:2.75, brand:"DunkinDonuts",size:8,temputure:"175F"},
    {type:"lattee",price:3.75,brand:"Cappuccino",size:12,temputure:"185F"},
    {type:"affogato",price:2.34,brand:"RoyStreetCoffee", size:12,temputure:"190F"},
    {type:"cappuccino",price:5.34,brand:"UptownExpresso", size:24,temputure:"200F"},
];

////nodereturn all types of coffee 
exports.getAll = () => {
    return array_coffee;

};

//check with a console.log(array_coffee); to view the array

exports.get = (type) => {
    return array_coffee.find((item) => {
        return item.type === type;
    });
}; 
exports.delete = (type) => {
    // retain array length for later comparison after array modification
    const oldLength = array_coffee.length;
    array_coffee = array_coffee.filter((item) => {
        return item.type !== type;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== array_coffee.length, total: array_coffee.length };
}
exports.add = (newarray_coffee) => {
    const oldLength = array_coffee.length;
    // use existing get() method to check if book already in our list
    let found = this.get(newarray_coffee.title);
    if (!found) {
        array_coffee.push(newarray_coffee);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== array_coffee.length, total: array_coffee.length };
};
