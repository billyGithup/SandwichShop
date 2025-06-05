const fs = require("fs");
const bun = require("./ingredients/bun.json");
const vegetables = require("./ingredients/vegetables.json");
const cheese = require("./ingredients/cheese.js");
const prompt = require("prompt-sync")({ sigint: true });

const showMenu = (itemList) => {
  let menuNumbers = "";
  console.log();
  for (index = 0; index < itemList.length; index++) {
    const arr = [...itemList[index]];
    arr.splice(1, 0, " - $");
    menuNumbers += (index + 1).toString();
    console.log(`${index + 1}. ${arr.join("")}`);
  }
  console.log();
  return menuNumbers;
};

const promptUser = (promptMsgOne, promptMsgTwo, menuNumbers) => {
  let choice = prompt(promptMsgOne);
  while (!(menuNumbers.includes(choice) && choice.length == 1)) {
    choice = prompt(promptMsgTwo);
  }
  return choice;
};

exports.checkYorN = function (input) {
  return "ynYN".includes(input) && input.length == 1;
};

exports.chooseYourBun = () => {
  const buns = Object.entries(bun);
  const menuNumbers = showMenu(buns);
  const bunChoice = promptUser(
    "Please choose your bun: ",
    "Please enter only the numbers on the menu: ",
    menuNumbers
  );

  return buns[parseInt(bunChoice) - 1];
};

exports.chooseYourCheese = () => {
  const cheeseList = Object.entries(cheese.cheese);
  const menuNumbers = showMenu(cheeseList);
  const cheeseChoice = promptUser(
    "Please choose your cheese: ",
    "Please enter only the numbers on the menu: ",
    menuNumbers
  );

  return cheeseList[parseInt(cheeseChoice) - 1];
};

exports.chooseYourMeat = () => {
  try {
    let menuNumbers = "";
    const meatList = fs
      .readFileSync(".\\ingredients\\meat.txt", "utf8", { encoding: "utf8" })
      .split("\r\n")
      .slice(0, -1);

    console.log();
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

    const meatChoice = promptUser(
      "Please choose your meat: ",
      "Please enter only the numbers on the menu: ",
      menuNumbers
    );
  
    return meatList[parseInt(meatChoice) - 1];
  } catch (error) {
    console.log("Error opening meat.txt file!");
  }
};

exports.chooseYourVegies = () => {
  const vegies = Object.entries(vegetables);
  let menuNumbers = "";

  console.log();
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

  const vegieChoice = promptUser(
    "Please choose your vegetables: ",
    "Please enter only the numbers on the menu: ",
    menuNumbers
  );

  if (vegieChoice == "5") {
    return vegies;
  } else {
    return vegies[parseInt(vegieChoice) - 1];
  }
};

exports.getTotalCost = (orderedSandwich) => {
  let vegieTotalCost = 0;

  if (
    orderedSandwich.vegetables.length == 2 &&
    orderedSandwich.vegetables[0] != "object"
  ) {
    vegieTotalCost += orderedSandwich.vegetables[1];
  } else {
    for (i = 0; i < orderedSandwich.vegetables.length; i++) {
      vegieTotalCost += orderedSandwich.vegetables[i][1];
    }
  }

  return (
    orderedSandwich.bun.pop() +
    orderedSandwich.cheese.pop() +
    parseFloat(orderedSandwich.meat.slice(-4)) +
    vegieTotalCost
  ).toFixed(2);
};
