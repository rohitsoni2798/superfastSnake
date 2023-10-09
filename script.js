const gameContainer = document.querySelector(".game-container");
const snake = document.querySelector(".snake");
const food = document.querySelector(".food");
const scoreDisplay = document.getElementById("score"); 
let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let snakeSpeed = 100;
let lastRenderTime = 0;
let direction = "right";
let score = 0;

function getRandomPosition() {
  return Math.floor(Math.random() * 20) * 20;
}

function updateFoodPosition() {
  foodX = getRandomPosition();
  foodY = getRandomPosition();
  food.style.left = `${foodX}px`;
  food.style.top = `${foodY}px`;
}

function updateSnakePosition() {
  if (direction === "right") {
    snakeX += 20;
    if (snakeX >= 400) {
      snakeX = 0;
    }
  } else if (direction === "left") {
    snakeX -= 20;
    if (snakeX < 0) {
      snakeX = 380;
    }
  } else if (direction === "down") {
    snakeY += 20;
    if (snakeY >= 400) {
      snakeY = 0;
    }
  } else if (direction === "up") {
    snakeY -= 20;
    if (snakeY < 0) {
      snakeY = 380;
    }
  }

  snake.style.left = `${snakeX}px`;
  snake.style.top = `${snakeY}px`;
}

function checkCollision() {
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeSpeed -= 5;
    score++; // Increase the score when the snake eats food
    scoreDisplay.textContent = score; // Update the score display
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase(); // Convert to lowercase for consistency
  if (key === "d" && direction !== "left") {
    direction = "right";
  } else if (key === "a" && direction !== "right") {
    direction = "left";
  } else if (key === "s" && direction !== "up") {
    direction = "down";
  } else if (key === "w" && direction !== "down") {
    direction = "up";
  }
});

function gameLoop(currentTime) {
  const deltaTime = currentTime - lastRenderTime;

  if (deltaTime >= snakeSpeed) {
    lastRenderTime = currentTime;

    updateSnakePosition();
    checkCollision();
  }

  requestAnimationFrame(gameLoop);
}

updateFoodPosition();
gameLoop(performance.now());
