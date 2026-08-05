/**
 * THE BASE CLASS (Encapsulation)
 */
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this.hunger = 50;
  }

  // a method to check status
  getStatus() {
    if (this.hunger <= 0) return "Full";
    if (this.hunger <= 20) return "Satisfied";
    return "Hungry";
  }

  // logic to change internal state
  eat() {
    if (this.hunger <= 0) {
      console.log(`${this.name} is already full!`);
    } else {
      this.hunger = this.hunger - 10;
      console.log(`${this.name} ate. Hunger is now ${this.hunger}.`);
    }
  }

  makeSound() {
    console.log(`${this.name} makes a generic animal sound.`);
  }
}

/**
 * INHERITANCE
 * Bird gets everything from Animal via 'extends'
 */

class Mammal extends Animal {
  constructor(name, species, furColor) {
    super(name, species); // Calls the parent constructor
    this.furColor = furColor;
  }

  groom() {
    console.log(`${this.name} is brushing their ${this.furColor} fur.`);
  }
}

class Bird extends Animal {
  constructor(name, species, wingSpan) {
    super(name, species); // Sends name/species to the Animal constructor
    this.wingSpan = wingSpan;
  }

  // POLYMORPHISM
  // Replacing the generic sound with a bird-specific one
  makeSound() {
    console.log(`${this.name} chirps: Tweet! Tweet!`);
  }

  fly() {
    console.log(`${this.name} spreads wings (${this.wingSpan}) and flies!`);
  }
}


/**
 * THE ZOO MANAGER
 * A class to hold and run our animal objects
 */
class Zoo {
  constructor(zooName) {
    this.zooName = zooName;
    this.animals = [];
  }

  addAnimal(animal) {
    this.animals.push(animal);
    console.log(`Added ${animal.name} to the ${this.zooName}.`);
  }

  showAllAnimals() {
    console.log(`\n--- Welcome to ${this.zooName} ---`);
    this.animals.forEach((animal) => {
      // Accessing properties and calling methods
      // console.log("here ->", animal);
      // console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(animal)));
      console.log(`Animal: ${animal.name} | Status: ${animal.getStatus()}`);
      animal.makeSound();
      animal.eat();
      console.log("-------------------");
    });
  }
}

// --- EXECUTION ---

const myZoo = new Zoo("The Wild JSD 13 Zoo");

// Create instances
const ape = new Animal("Jack", "Monkey");
const tweetty = new Bird("Tweety", "Sparrow", "2 feet");
const coco = new Mammal("Coco", "Bear", "brown");
const john = new Mammal("John", "Tiger", "white");

// Add them to the zoo
myZoo.addAnimal(ape);
myZoo.addAnimal(tweetty);
myZoo.addAnimal(coco);
myZoo.addAnimal(john);

// Run the routine
myZoo.showAllAnimals();

const vikky = new Bird("Vikky", "eagle", "2 metres");

    vikky.makeSound();
    vikky.fly();

const janny = new Mammal("Janny", "boar", "brown");

    janny.groom();
    

