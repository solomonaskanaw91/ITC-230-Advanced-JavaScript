//The array for the module is (array_coffee) 
var array_coffee = [
    {type:"americano",price:3.00, brand:"Starbucks",size:16,temputure:"195F"},
    {type: "pepermint mocha",price: "3.75",brand: "Seattle's best", size: "8",temputure: "175F"},
    {type:"mocha",price:2.75, brand:"DunkinDonuts",size:8,temputure:"175F"},
    {type:"affogato",price:2.34,brand:"RoyStreetCoffee", size:12,temputure:"190F"},
    {type:"cappuccino",price:5.34,brand:"UptownExpresso", size:24,temputure:"200F"},
];
/////////////////////////////////////////////////////////////////module.js is touching the (lib/index.js)
////Next we will use the (getAll) method to invoke the the return of the all types of coffee which in this case is the array called array_coffee.
////////////////////////////////////////////////////////////////
exports.getAll = () => {
    return array_coffee;
};
////Next make sure the array is returned to the module.js file.
//check with a console.log(array_coffee); to view the array
///////////////////////////////////////////////////////////////
exports.get = (type) => {
    return array_coffee.find((item) => {
        return item.type === type;
    });
}; 
exports.delete = (type) => {
////// retain array length for later comparison after array modification
    const oldSize = array_coffee.length;
    array_coffee = array_coffee.filter((item) => {
        return item.type !== type;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldSize !== array_coffee.length, total: array_coffee.length };
}
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
exports.add = (new_array_object) => {
    const oldLength = array_coffee.length;
    // use existing get() method to check if book already in our list
    let found = this.get(new_array_object.title);
    if (!found) {
        array_coffee.push(new_array_object);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== array_coffee.length, total: array_coffee.length };
};
////////Add and append the remaining parse of code to the file path.gitnore which will be attached to public



console.log(array_coffee + "/n /n");