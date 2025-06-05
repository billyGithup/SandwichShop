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

const shopTitle =
  "==================================" +
  "\n||\t\t\t\t||\n||\t    BOB SANDWICH\t||\n||\t\t\t\t||\n" +
  "==================================";
const welcomeStr = "Welcome to Bob Sandwich shop!\n";

console.log(shopTitle);
console.log(welcomeStr);

let userInput = prompt("Would you like to make an order Y or N? ");
while (!checkYorN(userInput)) {
  userInput = prompt('Please enter letter "Y" or letter "N": ');
}

if (userInput.toLowerCase() === "n") {
  console.log("Thank you for coming, bye!");
} else {
  const bun = chooseYourBun();
  const cheese = chooseYourCheese();
  const meat = chooseYourMeat();
  const vegetables = chooseYourVegies();
  const orderedSandwich = new Sandwich(bun, meat, vegetables, cheese);

  console.log("Your sandwich is being made. Please wait...");
  setTimeout(() => {
    console.log("Your sandwich is ready!");
    orderedSandwich.showInfo();
    console.log(`\nTotal cost: $${getTotalCost(orderedSandwich)}`);
  }, 1000);
}
