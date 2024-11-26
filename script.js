// Configuration
const gameData = [
  ["color1", "color2", "color3", "color4"],
  ["color1", "color2", "color3", "color4"],
  [],
];

// Create bottles dynamically
const gameContainer = document.getElementById("game-container");
const bottles = [];

gameData.forEach((bottleData, index) => {
  const bottle = document.createElement("div");
  bottle.classList.add("bottle");
  bottle.dataset.index = index;

  bottleData.forEach(color => {
    const liquid = document.createElement("div");
    liquid.classList.add("liquid", color);
    bottle.appendChild(liquid);
  });

  gameContainer.appendChild(bottle);
  bottles.push(bottle);
});

// Game logic
let selectedBottle = null;

bottles.forEach(bottle => {
  bottle.addEventListener("click", () => {
    const bottleIndex = parseInt(bottle.dataset.index, 10);

    if (selectedBottle === null) {
      // Select the bottle
      selectedBottle = bottleIndex;
      bottle.style.border = "3px solid red";
    } else {
      // Transfer liquid
      transferLiquid(selectedBottle, bottleIndex);
      bottles[selectedBottle].style.border = "2px solid #444";
      selectedBottle = null;
    }
  });
});

function transferLiquid(fromIndex, toIndex) {
  if (fromIndex === toIndex) return;

  const fromBottle = gameData[fromIndex];
  const toBottle = gameData[toIndex];

  if (fromBottle.length === 0 || toBottle.length === 4) return;

  const liquidToMove = fromBottle[fromBottle.length - 1];

  if (toBottle.length === 0 || toBottle[toBottle.length - 1] === liquidToMove) {
    fromBottle.pop();
    toBottle.push(liquidToMove);
    updateGameUI();
  }
}

function updateGameUI() {
  bottles.forEach((bottle, index) => {
    bottle.innerHTML = "";
    gameData[index].forEach(color => {
      const liquid = document.createElement("div");
      liquid.classList.add("liquid", color);
      bottle.appendChild(liquid);
    });
  });
}
