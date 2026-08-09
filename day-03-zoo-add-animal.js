
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


function addToZoo(newAnimal) {
  animals.push(newAnimal);

  //ดึง Food Court ออกมาจากท้าย Array ชั่วคราวเพื่อเพิ่มห้องสัตว์ใหม่ไปแทรก
  const foodCourt = zooPath.pop();

  // push สัตว์ตัวใหม่ลงไป
  zooPath.push({
    symbol: newAnimal.symbol,
    name: `${newAnimal.name} enclosure`,
    animal: newAnimal
  });

  //push Food Court กลับเข้าปิดท้าย
  zooPath.push(foodCourt);
}

process.loadEnvFile();
const base_url = "https://api.api-ninjas.com/v1/animals";

async function searchAnimal(searchname) {
    try {
        // 1. กำหนด Query parameter ?name= และนำไปผสม
        // 2. ใช้ base_url เพื่อเป็น URL ตั้งต้น ส่วนของการค้นหาจะใช้ ?name
        // 3. จัดโครงสร้างวงเล็บ fetch() ให้ถูกต้อง
        const response = await fetch(`${base_url}?name=${encodeURIComponent(searchname)}`, {
            headers: {
                'X-Api-Key': process.env.APININJA_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();
        const tableData = rawData;
        return tableData;

    } catch (err) {
        console.error("Something went wrong", err);
    }
}


function askForTableIndex(rl, zoo, displayZoo, askForCommand, resultTable, selectedClassKey) {
    rl.question(
        "\nSelect Animal You Want to Add(Index) or [x] to cancel >> ",
        (selectedanimalindex) => {
            const selectedIdxInput = selectedanimalindex.trim().toLowerCase();

            if (selectedIdxInput === 'x') {
                console.log("Cancelled.");
                displayZoo();
                return askForCommand();
            }

            const index = parseInt(selectedIdxInput, 10);

            if (!isNaN(index) && index >= 0 && index < resultTable.length) {
                const apiData = resultTable[index];
                const AnimalClass = zoo.availableClasses[selectedClassKey];

                const defaultSymbol = new AnimalClass().symbol;

                const newAnimalInstance = new AnimalClass(
                    apiData.name,
                    apiData.taxonomy?.scientific_name || selectedClassKey,
                    defaultSymbol
                );

                console.log("\nAdded to Zoo:");
                console.table([newAnimalInstance]);

                zoo.addToZoo(newAnimalInstance);
                displayZoo();
                askForCommand();
            } else {
                console.log("Index not correct, please try again.");
                askForTableIndex(rl, zoo, displayZoo, askForCommand, resultTable, selectedClassKey);
            }
        }
    );
}

function askForClass(rl, zoo, displayZoo, askForCommand, availableKeys) {
    rl.question(
        "\nSelect Animal Class (Index) or [x] to cancel >> ",
        async (input) => {
            const trimmedInput = input.trim().toLowerCase();

            if (trimmedInput === 'x') {
                console.log("Cancelled.");
                displayZoo();
                return askForCommand();
            }

            let selectedClassKey = "";
            const inputIndex = parseInt(trimmedInput, 10) - 1;

            if (!isNaN(inputIndex) && inputIndex >= 0 && inputIndex < availableKeys.length) {
                selectedClassKey = availableKeys[inputIndex];
            } else if (availableKeys.includes(trimmedInput)) {
                selectedClassKey = trimmedInput;
            } else {
                console.log(`Invalid choice! Choose index (1-${availableKeys.length}) or [x] to cancel`);
                return askForClass(rl, zoo, displayZoo, askForCommand, availableKeys);
            }

            console.log(`\nSearching API for: ${selectedClassKey}...`);
            const resultTable = await searchAnimal(selectedClassKey);

            if (!resultTable || resultTable.length === 0) {
                console.log("Animal Not Found from API");
                displayZoo();
                return askForCommand();
            }

            console.clear();
            console.log(`\nResults for "${selectedClassKey}":`);
            console.table(resultTable);

            askForTableIndex(rl, zoo, displayZoo, askForCommand, resultTable, selectedClassKey);
        }
    );
}


function addAnimalInZoo(rl, zoo, displayZoo, askForCommand) {
    const availableKeys = Object.keys(zoo.availableClasses || {});

    if (availableKeys.length === 0) {
        console.log("No available animal classes found.");
        displayZoo();
        return askForCommand();
    }

    console.log("\n---------------------------------");
    console.log("  Available Animal Classes");
    console.log("---------------------------------");
    availableKeys.forEach((className, idx) => {
        console.log(` [${idx + 1}] ${className.toUpperCase()}`);
    });
    console.log("---------------------------------");

    askForClass(rl, zoo, displayZoo, askForCommand, availableKeys);
}


