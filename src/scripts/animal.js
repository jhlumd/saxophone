function Animal(name) {
  this.name = name;
}

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   sayHello() {
//     console.log("Hello, my name is " + this.name);
//   }
// }

module.exports = Animal;
