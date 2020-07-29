(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./animal":1}],3:[function(require,module,exports){
// const Animal = require("./animal");
const Dog = require("./dog");

const liesel = new Dog("Liesel");
liesel.bark();
liesel.sayHello();
console.log(liesel.coatColor);
liesel.coatColor = "yellow";
console.log(liesel.coatColor);
const doggy = new Dog("Jon", "brown");
console.log(doggy.coatColor);

},{"./dog":2}]},{},[3]);
