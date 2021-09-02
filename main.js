const bird = document.querySelector(".bird");
const gameContainer = document.querySelector(".game-container");
const stopBtn = document.querySelector("button");
const lowestPointToGo = 380;
const lowerPipeMaxHeight = 200,
  upperPipeMaxHeight = 170,
  minHeight = 100;
let score = 0;
let gameOverMessage = "not over";

const birdUp = async (e) => {
  if (e.key == "ArrowUp") {
    if (bird.offsetTop != 0) {
      bird.style.top = `${bird.offsetTop - 15}px`;
      bird.style.transform = "rotateZ(-15deg)";
      await delay(100);
      bird.style.transform = "rotateZ(0deg)";
    }
  }
};
document.addEventListener("keydown", birdUp);

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

const checkScore = (upperPipe, lowerPipe) => {
  if (
    bird.getBoundingClientRect().left >
      upperPipe.getBoundingClientRect().right &&
    bird.getBoundingClientRect().left > lowerPipe.getBoundingClientRect().right
  ) {
    console.log("passed");
    score += 1;
  }
};

const generatePipes = () => {
  let lowerPipeHeight =
    parseInt(
      Math.floor(Math.random() * (lowerPipeMaxHeight - minHeight) + minHeight) /
        10
    ) * 10;
  const lowerPipe = document.createElement("div");
  lowerPipe.className = "lower-pipe";
  lowerPipe.style.height = `${lowerPipeHeight}px`;

  //290 and 113 are the ratio to make the lower pipes sit right on top of the ground
  lowerPipe.style.top = `${290 - (lowerPipeHeight - 113)}px`;
  gameContainer.appendChild(lowerPipe);

  let upperPipeHeight =
    parseInt(
      Math.floor(Math.random() * (upperPipeMaxHeight - minHeight) + minHeight) /
        10
    ) * 10;
  const upperPipe = document.createElement("div");
  upperPipe.className = "upper-pipe";
  upperPipe.style.height = `${upperPipeHeight}px`;
  gameContainer.appendChild(upperPipe);

  let movingPipes = setInterval(() => {
    // console.log(bird.getBoundingClientRect().bottom, lowerPipe.getBoundingClientRect().top);
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
      // console.log(bird.getBoundingClientRect().bottom, lowerPipe.getBoundingClientRect().top);
      // console.log(  hitUpperPipeHorizontally,
      //   hitUpperPipeVertically,
      //   hitLowerPipeHorizontally,
      //   hitLowerPipeVertically);
    }
    let lowerLeft = lowerPipe.offsetLeft;
    lowerPipe.style.left = `${lowerLeft - 10}px`;
    lowerPipe.style.transition = "left 0.12s ease";

    let upperLeft = upperPipe.offsetLeft;
    upperPipe.style.left = `${upperLeft - 10}px`;
    upperPipe.style.transition = "left 0.12s ease";
    if (
      upperPipe.getBoundingClientRect().right <= 0 ||
      lowerPipe.getBoundingClientRect().right <= 0
    ) {
      gameContainer.removeChild(upperPipe);
      gameContainer.removeChild(lowerPipe);
      score += 1;
      clearInterval(movingPipes);
    }
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
  } else if (gameOverMessage == "game over") {
    clearInterval(generateMorePipes);
    document.removeEventListener("keydown", birdUp);
    // console.log(score);
    alert(`Game over
Score: ${score}`);
    // alert(score)
  }
}, 3000);
