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
