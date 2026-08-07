import {createInterface} from "node:readline";
import { inspect } from "node:util";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
})

//console.log(rl);

class Animal{}

class Lion extends Animal {}

class Elephant extends Animal {}
class Bird extends Animal {}
class Bear extends Animal {}
class Visitor {}

const animals =[
    new Lion("Simba"), 
    new Elephant("Ela"), 
    new Bird("Zazu"), 
    new Bear("Baloo"),
];

const zooPath = [
  {
    symbol: ":door:",
    name: "Entrance",
    description:
      "The main entrance to the zoo. The morning visitors are arriving.",
  },
  {
    symbol: animals[0].symbol,
    name: "Lion enclosure",
    animal: animals[0],
  },
  {
    symbol: "🌳",
    name: "Garden",
    description: "A quiet garden with large trees and shaded benches.",
  },
  {
    symbol: animals[1].symbol,
    name: "Elephant enclosure",
    animal: animals[1],
  },
  {
    symbol: animals[2].symbol,
    name: "Aviary",
    animal: animals[2],
  },
  {
    symbol: animals[3].symbol,
    name: "Bear habitat",
    animal: animals[3],
  },
  {
    symbol: ":fork_knife_plate:",
    name: "Food court",
    description: "The food court smells like popcorn and fresh fruit.",
  },
];
const zooName = "JS Terminal Zoo"
const visitor = new Visitor("Fon")

function askForCommand(){
rl.question(
    "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n>",
    (answer)=>{
        const command = answer.trim().toLowerCase();

      if (command === "q") {
        console.log("\nThank you for visiting the JS Terminal Zoo.");
        rl.close();
        return;
      }

      handleCommand(command);
      displayZoo();
      askForCommand();

    },
);

}

function handleCommand(command){
if(command === "l"){
    console.log(visitor.moveLeft());

} else if (command === "r"){
    console.log(visitor.moveRight(zooPath.length -1));
} else if (command === "i"){
    inspectLocation();
}else if (command === "d"){
    showZooDirectory();
}else {
    console.log("Please enter l, r, i, d, or q")
}
}




function showZooDirectory(){
console.log("\nZoo directory");
 console.table(
   animals.map((animal) => ({
     name: animal.name,
     species: animal.species,
     symbol: animal.symbol,
   })),
 );

}
function displayZoo(){
 const bannerRow = [`=== ${zooName} ===`];
 const placesRow = zooPath.map((location) => location.symbol);
 const pathwayRow = zooPath.map(() => ":white_square_button:");

 pathwayRow[visitor.position] = "👩";

 console.log("");
 console.log(bannerRow.join(""));
 console.log(placesRow.join(" — "));
 console.log(pathwayRow.join(" — "));

}
function inspectLocation(){
const location = zooPath[visitor.position];

 console.log(`\nYou are at: ${location.name}`);

 if (location.animal) {
   console.log(location.animal.describe());
   console.log(location.animal.makeSound());
 } else {
   console.log(location.description);
 }

}
function prepareAnimalFood(){
setTimeout(() => console.log("The animal feed is ready."), 2000);

}

function askForCommand(){rl.question(
        "\n[l] Left | [r] Right | [i] Inspect | [d] Directory | [q] Quit\n> ",
        (answer) => {
            const command = answer.trim().toLowerCase();

            if (command === "q") {
                console.log("\nThank you for visiting the JS Terminal Zoo.");
                rl.close();
                return;
            }

            handleCommand(command);
            displayZoo();
            askForCommand();
        },
    );}

console.log(`Welcome to the ${zooName} Explorer.`);
showZooDirectory();
displayZoo();
inspectLocation();
prepareAnimalFood();
askForCommand();
