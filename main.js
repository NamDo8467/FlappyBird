const bird = document.querySelector(".bird");
const gameContainer = document.querySelector(".game-container");
const stopBtn = document.querySelector("button");
const lowestPointToGo = 380;
const lowerPipeMaxHeight = 200,
  upperPipeMaxHeight = 170,
  minHeight = 100;
let score = 0;
let gameOverMessage = "not over";
document.addEventListener("keydown", async (e) => {
  if (e.key == "ArrowUp") {
    if (bird.offsetTop != 0) {
      bird.style.top = `${bird.offsetTop - 15}px`;
      bird.style.transform = "rotateZ(-15deg)";
      await delay(100);
      bird.style.transform = "rotateZ(0deg)";
    }
  } else if (e.key == "ArrowDown") {
    if (bird.offsetTop != 350) {
      bird.style.top = `${bird.offsetTop + 20}px`;
    }
  }
});

document.addEventListener("keyup", () => {
  bird.style.transform = "rotateZ(0deg)";
});

const delay = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};



const generatePipes = () => {
  let lowerPipeHeight = parseInt(Math.floor(Math.random() * (lowerPipeMaxHeight - minHeight) + minHeight) /10) * 10;
  const lowerPipe = document.createElement("div");
  lowerPipe.className = "lower-pipe";
  lowerPipe.style.height = `${lowerPipeHeight}px`;

  //290 and 113 are the ratio to make the lower pipes sit right on top of the ground
  lowerPipe.style.top = `${290 - (lowerPipeHeight - 113)}px`;
  // console.log(290-(lowerPipeHeight-113))
  gameContainer.appendChild(lowerPipe);

  let upperPipeHeight = parseInt(Math.floor(Math.random() * (upperPipeMaxHeight - minHeight) + minHeight) / 10) * 10;
  const upperPipe = document.createElement("div");
  upperPipe.className = "upper-pipe";
  upperPipe.style.height = `${upperPipeHeight}px`;
  gameContainer.appendChild(upperPipe);

  let movingPipes = setInterval(() => {
    const hitUpperPipeHorizontally =
      bird.getBoundingClientRect().right + 5 ==
        Math.floor(upperPipe.getBoundingClientRect().left) &&
      bird.getBoundingClientRect().top <=
        upperPipe.getBoundingClientRect().bottom;

    const hitUpperPipeVertically =
      bird.getBoundingClientRect().top <=
        upperPipe.getBoundingClientRect().bottom &&
      bird.getBoundingClientRect().left >=
        upperPipe.getBoundingClientRect().left;

    const hitLowerPipeHorizontally =
      bird.getBoundingClientRect().right + 5 ==
        Math.floor(lowerPipe.getBoundingClientRect().left) &&
      bird.getBoundingClientRect().bottom >=
        lowerPipe.getBoundingClientRect().top;

    const hitLowerPipeVertically =
      bird.getBoundingClientRect().bottom >=
        lowerPipe.getBoundingClientRect().top &&
      bird.getBoundingClientRect().left >=
        lowerPipe.getBoundingClientRect().left;
    if (
      hitUpperPipeHorizontally ||
      hitUpperPipeVertically ||
      hitLowerPipeHorizontally ||
      hitLowerPipeVertically ||
      gameOverMessage == "game over"
    ) {
      gameOverMessage = "game over";
      clearInterval(birdDown);
      clearInterval(movingPipes);
      console.log(bird.getBoundingClientRect().bottom, lowerPipe.getBoundingClientRect().top);
      console.log(  hitUpperPipeHorizontally,
        hitUpperPipeVertically,
        hitLowerPipeHorizontally,
        hitLowerPipeVertically);
    }
    let lowerLeft = lowerPipe.offsetLeft;
    lowerPipe.style.left = `${lowerLeft - 10}px`;
    lowerPipe.style.transition = "left 0.12s ease";

    let upperLeft = upperPipe.offsetLeft;
    upperPipe.style.left = `${upperLeft - 10}px`;
    upperPipe.style.transition = "left 0.12s ease";

    // clearInterval(movingPipes);
  }, 0);

  stopBtn.addEventListener("click", () => {
    clearInterval(movingPipes);
  });
};

let birdDown = setInterval(() => {
  if (bird.offsetTop >= lowestPointToGo) {
    clearInterval(birdDown);
  } else {
    bird.style.top = `${bird.offsetTop + 15}px`;
  }
}, 350);

generatePipes();

let generateMorePipes = setInterval(() => {
  if (gameOverMessage == "not over") {
    generatePipes();
      // const upperPipes = document.querySelectorAll('.upper-pipe')
      // const lowerPipes = document.querySelectorAll('.lower-pipe')
      // if (upperPipes[0].getBoundingClientRect().right <= 0 || lowerPipes[0].getBoundingClientRect().right <= 0) {
      //   gameContainer.removeChild(upperPipes[0]);
      //   gameContainer.removeChild(lowerPipes[0])
        
      // }
  } else if(gameOverMessage == "game over"){
    clearInterval(generateMorePipes);
    alert("game over")
    // alert(score)
  }
}, 3000);
