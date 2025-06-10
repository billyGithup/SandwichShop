// Sandwich class definition
class Sandwich {
  // Private fields to store the properties of the sandwich
  #bun;
  #meat;
  #vegetables;
  #cheese;

  // Constructor to initialize the sandwich with bun, meat, vegetables, and cheese
  constructor(bun, meat, vegetables, cheese) {
    this.#bun = bun;
    this.#meat = meat;
    this.#vegetables = vegetables;
    this.#cheese = cheese;
  }

  // Getters to access the private fields
  get bun() {
    return this.#bun;
  }
  get meat() {
    return this.#meat;
  }
  get vegetables() {
    return this.#vegetables;
  }
  get cheese() {
    return this.#cheese;
  }

  // Method to display the sandwich information
  showInfo() {
    const bun = this.#bun[0];
    const cheese = this.#cheese[0];
    const meat = this.#meat.slice(0, -5);
    let vegies = "";

    // Check if the vegetables are an array of objects or a simple array
    if (this.#vegetables.length == 2 && this.#vegetables[0] != "object") {
      vegies = this.#vegetables[0];
    } else {
      const arr = [];

      // Loop through the vegetables array and format each vegetable for display
      for (index = 0; index < this.#vegetables.length; index++) {
        arr.push(this.#vegetables[index][0]);
      }
      vegies = arr.join(", ");
    }

    // Log the sandwich details to the console
    console.log(
      `\nYour sandwich:\nBun - ${bun}\nCheese - ${cheese}\nMeat - ${meat}\nVegetables - ${vegies}`
    );
  }
}

// Export the Sandwich class so it can be used in other files
module.exports = Sandwich;
