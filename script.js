// Configuration: 8 Bottles with random colors
const gameData = [
  ["color1", "color2", "color3", "color4"],
  ["color4", "color3", "color2", "color1"],
  ["color5", "color6", "color7", "color8"],
  ["color8", "color7", "color6", "color5"],
  ["color2", "color3", "color1", "color4"],
  ["color7", "color8", "color5", "color6"],
  [],
  []
];

// Game Initialization
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

// Game Logic
let selectedBottle = null;

bottles.forEach(bottle => {
  bottle.addEventListener("click", () => {
    const bottleIndex = parseInt(bottle.dataset.index, 10);

    if (selectedBottle === null) {
      // Select the bottle
      selectedBottle = bottleIndex;
      bottle.style.border = "3px solid red";
    } else {
      // Attempt to transfer liquid
      transferLiquid(selectedBottle, bottleIndex);
      bottles[selectedBottle].style.border = "2px solid #fff";
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
    const movingLiquid = document.createElement("div");
    movingLiquid.classList.add("liquid", liquidToMove);
    movingLiquid.style.position = "absolute";
    movingLiquid.style.transition = "transform 0.5s ease";

    // Simulate transfer animation
    const sourceBottle = bottles[fromIndex];
    const targetBottle = bottles[toIndex];

    const sourceRect = sourceBottle.getBoundingClientRect();
    const targetRect = targetBottle.getBoundingClientRect();

    document.body.appendChild(movingLiquid);
    const xOffset = targetRect.left - sourceRect.left;
    const yOffset = targetRect.top - sourceRect.top;

    movingLiquid.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

    setTimeout(() => {
      document.body.removeChild(movingLiquid);

      fromBottle.pop();
      toBottle.push(liquidToMove);
      updateGameUI();
    }, 500);
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
