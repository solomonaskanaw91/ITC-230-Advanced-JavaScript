////Created a array
var array_coffee = [
    {type:"americano",price:3.00, brand:"Starbucks",size:"16oz",temputure:"195F"},
    {type:"mocha",price:2.75, brand:"Dunkin'Donuts",size:"8oz",temputure:"175F"},
    {type:"lattee",price:3.75,brand:"Cappuccino",size:"12oz",temputure:"185F"},
    {type:"affogato",price:2.34,brand:"Roy Street Coffee", size:"12oz",temputure:"190F"},
    {type:"cappuccino",price:5.34,brand:"Uptown Expresso", size:"24oz",temputure:"200F"},
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
exports.delete = (brand) => {
    // retain array length for later comparison after array modification
    const oldLength = brand.length;
    brand = brand.filter((item) => {
        return item.brand !== brand;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== brand.length, total: brand.length };
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
console.log(this.getAll())
console.log()