const Animal = require("./animal");

function Dog(name, coatColor) {
  Animal.call(this, name);
  this.coatColor = coatColor;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log("Bark!");
};

// class Dog extends Animal {
//   constructor(name, coatColor) {
//     super(name);
//     this.coatColor = coatColor;
//   }

//   bark() {
//     console.log("Bark!!!!!#!#");
//   }
// }

module.exports = Dog;
