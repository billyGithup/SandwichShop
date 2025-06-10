// Import external packages, modules, and functions. prompt-sync is an external package. You need to execute `npm install prompt-sync@4.2.0` in the terminal to install it.
const prompt = require("prompt-sync")({ sigint: true });
const {
  checkYorN,
  chooseYourBun,
  chooseYourCheese,
  chooseYourMeat,
  chooseYourVegies,
  getTotalCost
} = require("./helpers.js");
const Sandwich = require("./Sandwich.js");

// Define necessary variables for the program.
const shopTitle =
  "==================================" +
  "\n||\t\t\t\t||\n||\t    BOB SANDWICH\t||\n||\t\t\t\t||\n" +
  "==================================";
const welcomeStr = "Welcome to Bob Sandwich shop!\n";

// Print the shop title and welcome message to the console.
console.log(shopTitle);
console.log(welcomeStr);

// Prompt a user for an input.
let userInput = prompt("Would you like to make an order Y or N? ");

// If the user's input is invalid, keep asking until a valid input is provided.
while (!checkYorN(userInput)) {
  userInput = prompt('Please enter letter "Y" or letter "N": ');
}

// Check the user's input to whether or not run the program.
if (userInput.toLowerCase() == "n") {
  console.log("Thank you for coming, bye!");
} else {
  // Get all the necessary data from the user to create a sandwich.
  const bun = chooseYourBun();
  const cheese = chooseYourCheese();
  const meat = chooseYourMeat();
  const vegetables = chooseYourVegies();
  
  // Instantiate a new Sandwich object with the user's choices.
  const orderedSandwich = new Sandwich(bun, meat, vegetables, cheese);

  console.log("Your sandwich is being made. Please wait...");

  // Simulate a delay to mimic the sandwich preparation time.
  setTimeout(() => {
    console.log("Your sandwich is ready!");
    orderedSandwich.showInfo();
    console.log(`\nTotal cost: $${getTotalCost(orderedSandwich)}`);
  }, 3000);
}
