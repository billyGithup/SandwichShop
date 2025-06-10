const fs = require("fs");
const bun = require("./ingredients/bun.json");
const vegetables = require("./ingredients/vegetables.json");
const cheese = require("./ingredients/cheese.js");
const prompt = require("prompt-sync")({ sigint: true });

// Function to display the menu and return the menu numbers as a string. This function also serves the concept of DRY (Don't Repeat Yourself) by avoiding code duplication.
const showMenu = (itemList) => {
  let menuNumbers = "";
  console.log();

  // Loop through the itemList and format each item for display.
  for (index = 0; index < itemList.length; index++) {
    const arr = [...itemList[index]];
    arr.splice(1, 0, " - $");
    menuNumbers += (index + 1).toString();
    console.log(`${index + 1}. ${arr.join("")}`);
  }
  console.log();

  // Return the string of menu numbers.
  return menuNumbers;
};

// Function to prompt the user for input and validate it against the menu numbers.
const promptUser = (promptMsgOne, promptMsgTwo, menuNumbers) => {
  let choice = prompt(promptMsgOne);

  // Ensure the choice is a single character and is included in the menu numbers.
  while (!(menuNumbers.includes(choice) && choice.length == 1)) {
    choice = prompt(promptMsgTwo);
  }
  return choice;
};

// Function to check if the input is a valid 'Y' or 'N'.
exports.checkYorN = function (input) {
  return "ynYN".includes(input) && input.length == 1;
};

// Function to choose a bun from the available options.
exports.chooseYourBun = () => {
  // Convert the bun object into an array of entries and display the menu.
  const buns = Object.entries(bun);

  // Show the menu and prompt the user to choose a bun.
  const menuNumbers = showMenu(buns);

  // Prompt the user for their choice, ensuring it matches the menu numbers.
  const bunChoice = promptUser(
    "Please choose your bun: ",
    "Please enter only the numbers on the menu: ",
    menuNumbers
  );

  // If the user chooses a bun from the menu's number, return the selected bun.
  return buns[parseInt(bunChoice) - 1];
};

// Function to choose cheese from the available options.
exports.chooseYourCheese = () => {

  // Convert the cheese object into an array of entries and display the menu.
  const cheeseList = Object.entries(cheese.cheese);

  // Show the menu and prompt the user to choose cheese.
  const menuNumbers = showMenu(cheeseList);

  // Prompt the user for their choice, ensuring it matches the menu numbers.
  const cheeseChoice = promptUser(
    "Please choose your cheese: ",
    "Please enter only the numbers on the menu: ",
    menuNumbers
  );

  // If the user chooses cheese from the menu's number, return the selected cheese.
  return cheeseList[parseInt(cheeseChoice) - 1];
};

// Function to choose meat from the available options.
exports.chooseYourMeat = () => {
  try {
    let menuNumbers = "";

    // Read the meat.txt file and split it into an array of meat options.
    const meatList = fs
      .readFileSync(".\\ingredients\\meat.txt", "utf8", { encoding: "utf8" })
      .split("\r\n")
      .slice(0, -1);

    console.log();
    // Loop through the meatList and format each meat option for display.
    for (index = 0; index < meatList.length; index++) {
      const meatMenu = [
        `${index + 1}. `,
        meatList[index].slice(0, -5),
        " - $",
        meatList[index].slice(-4, meatList[index].length)
      ].join("");
      menuNumbers += (index + 1).toString();
      console.log(meatMenu);
    }
    console.log();

    // Prompt the user to choose meat, ensuring it matches the menu numbers.
    const meatChoice = promptUser(
      "Please choose your meat: ",
      "Please enter only the numbers on the menu: ",
      menuNumbers
    );
  
    // If the user chooses meat from the menu's number, return the selected meat.
    return meatList[parseInt(meatChoice) - 1];

    // If there's an error reading the meat.txt file, log an error message.
  } catch (error) {
    console.log("Error opening meat.txt file!");
  }
};

// Function to choose vegetables from the available options.
exports.chooseYourVegies = () => {
  // Convert the vegetables object into an array of entries.
  const vegies = Object.entries(vegetables);
  let menuNumbers = "";

  console.log();
  // Loop through the vegies array and format each vegetable option for display.
  for (index = 0; index < vegies.length + 1; index++) {
    menuNumbers += (index + 1).toString();
    if (index + 1 == vegies.length + 1) {
      console.log(`${index + 1}. All`);
      break;
    }
    const arr = [...vegies[index]];
    arr.splice(1, 0, " - $");
    console.log(`${index + 1}. ${arr.join("")}`);
  }
  console.log();

  // Prompt the user to choose vegetables, ensuring it matches the menu numbers.
  const vegieChoice = promptUser(
    "Please choose your vegetables: ",
    "Please enter only the numbers on the menu: ",
    menuNumbers
  );

  // If the user chooses "All" (option 5), return all vegetables.
  if (vegieChoice == "5") {
    return vegies;
  } else {
    return vegies[parseInt(vegieChoice) - 1];
  }
};

// Function to calculate the total cost of the ordered sandwich.
exports.getTotalCost = (orderedSandwich) => {
  let vegieTotalCost = 0;

  // Check if the vegetables are an array of objects or a simple array.
  if (
    orderedSandwich.vegetables.length == 2 &&
    orderedSandwich.vegetables[0] != "object"
  ) {
    vegieTotalCost += orderedSandwich.vegetables[1];
  } else {
    // If it's an array of objects, sum the cost of each vegetable.
    for (i = 0; i < orderedSandwich.vegetables.length; i++) {
      vegieTotalCost += orderedSandwich.vegetables[i][1];
    }
  }

  // Calculate the total cost of the sandwich by adding the bun, cheese, meat, and vegetables and return it as a string formatted to two decimal places.
  return (
    orderedSandwich.bun.pop() +
    orderedSandwich.cheese.pop() +
    parseFloat(orderedSandwich.meat.slice(-4)) +
    vegieTotalCost
  ).toFixed(2);
};
