//Add new animals to the zoo
import { createInterface } from "node:readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Animal {
    constructor(name, species, symbol) {
        this.name = name;
        this.species = species;
        this.symbol = symbol;
    }
}

class Lion extends Animal {
    constructor(name) {
        super(name, "lion", "🦁");
    }
    makeSound() {
        return `${this.name} roars!`;
    }
}

class Elephant extends Animal {
    constructor(name) {
        super(name, "elephant", "🐘");
    }
    makeSound() {
        return `${this.name} trumpets!`;
    }
}

class Bird extends Animal {
    constructor(name) {
        super(name, "hornbill", "🐦");
    }
    makeSound() {
        return `${this.name} squawks!`;
    }
}

class Bear extends Animal {
    constructor(name) {
        super(name, "bear", "🐻");
    }
    makeSound() {
        return `${this.name} growls!`;
    }
}

class Visitor {
    constructor(name) {
        this.name = name;
        this.locationIndex = 0; // เริ่มต้นอยู่ที่ Entrance (ช่องแรกสุด Index 0)
        this.symbol = "👱";
    }
    // [0, 1, 2, 3, 4]
    // ย้ายตำแหน่งไปทางซ้าย
    moveLeft() {
        if (this.locationIndex === 0) {
            return `${this.name} is already at the entrance.`;
        }
        this.locationIndex--;
        return `${this.name} walks to the left.`;
    }

    // ย้ายตำแหน่งไปทางขวา
    moveRight() {
        if (this.locationIndex === zooPath.length - 1) {
            return `is already at the end of the zoo.`;
        }
        this.locationIndex++;
        return `${this.name} walks to the right.`;
    }
}

const animals = [
    new Lion("Simbar"),
    new Elephant("Ella"),
    new Bird("Zazu"),
    new Bear("Baloo"),
];

const zooPath = [
    {
        symbol: "🚪",
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
        symbol: "🍽️",
        name: "Food court",
        description: "The food court smells like popcorn and fresh fruit.",
    },
];

const zooName = "JS Terminal Zoo";
const visitor = new Visitor("Fon");



function handleCommand(command) {
    switch (command) {
        case "l":
            console.log(visitor.moveLeft());
            break;
        case "r":
            console.log(visitor.moveRight());
            break;
        case "i":
            inspectLocation();
            break;
        case "d":
            showZooDirectory();
            break;
        default:
            console.log("Please enter l, r, i, d, or q");
            break;
    }
    // if (command === "l") {
    //     console.log(visitor.moveLeft());
    // } else if (command === "r") {
    //     console.log(visitor.moveRight());
    // } else if (command === "i") {
    //     inspectLocation();
    // } else if (command === "d") {
    //     showZooDirectory();
    // } else {
    //     console.log("Please enter l, r, i, d, or q");
    // }
}

function showZooDirectory() {
    console.log("Zoo directory");
    console.table(animals);
    console.log("\n");
}

function displayZoo() {
    const bannerRow = [`=== ${zooName} ===`];
    // const placesRow = zooPath.map(function(location) {
    //     return location.symbol
    // });
    // ก่อนเป็น
    const placesRow = zooPath.map((location) => location.symbol).join(" — ");
    // const pathwayRow = zooPath.map(() => "⬜");
    // pathwayRow[visitor.locationIndex] = visitor.symbol;
    // console.log(pathwayRow.join(" — "));

    const pathwayRow = zooPath
        .map((_, index) =>
            index === visitor.locationIndex ? visitor.symbol : "⬜",
        )
        .join(" — ");
    console.log(bannerRow);
    console.log(placesRow);
    console.log(pathwayRow);
}

function inspectLocation() {
    // step 1 ดึงสถานที่
    const location = zooPath[visitor.locationIndex];

    // step 2 print ชื่อสถานที่
    console.log(`You are at: ${location.name}`);
    // step 3 เช็ค description
    if (location.description) {
        console.log(location.description);
    }
    // step 4 เช็กว่ามีสัตว์ในช่องนี้ไหม?
    if (location.animal) {
        console.log(`${location.animal.name} is a ${location.animal.species}`);
        console.log(location.animal.makeSound());
    }
}

function prepareAnimalFood() {
    console.log("The zookeeper is preparing the animal feed. ..")
    setTimeout(() => console.log("The animal feed is ready."), 2000);
}

console.log(`Welcome to the ${zooName} Explorer.`);
showZooDirectory();
displayZoo();
inspectLocation();
prepareAnimalFood();
askForCommand();

function askForCommand() {
    rl.question(
        "\nPlease fill your animals\n> ",
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

getAnimal(answer);
           
        },
    );
}

async function getAnimal(animal) {
    const url = `https://api.api-ninjas.com/v1/animals?name=${animal}`;
    try{
        const respond = await fetch(url, {
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        });
        const data = await respond.json();
        console.log(data[0]);
    } catch (error) {
        console.error("Something went wrong!!!", error);    
    }
}
askForCommand();
