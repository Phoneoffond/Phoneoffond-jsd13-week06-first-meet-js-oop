console.log(`Once upon a time, in the new Zoo on a secret island. There were a lot of animals living together. They have a magical power, so they can speak like a human.`);

class Animal {

 constructor(name, species, feeling, food, frequency){

    this.name = name;
    this.species = species;
    this.feeling = feeling;
    this.food = food;
    this.frequency = frequency;
 }   
    talk(){
        console.log(`${this.name} is talking to his friend that he is ${this.feeling} because he is a ${this.species}.`);
    }
    activity(){
        console.log(`${this.name} always eats ${this.food} when he feels hungry ${this.frequency}.`);
    }
}
const leo = new Animal("Leo", "lion","powerful","meat","everyday");

leo.talk();
leo.activity();

class Bird extends Animal {

constructor( name, species, feeling, frequency, featherColor, feet){
    super(name, species, feeling, frequency);
   
this.featherColor = featherColor;
this.feet = feet;
}

feather(){
console.log(`${this.name} who is a ${this.name} can fly up high. He can find ${this.food} further from the main land ${this.frequency} to make its ${this.featherColor} feather shine without using its ${this.feet}`);

}
}

const tweetty = new Bird("Tweetty", "sparrow","free","worm","every week","brown","2 feet");



tweetty.feather();