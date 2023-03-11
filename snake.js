// Constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
const cols = canvas.width / cellSize;
const rows = canvas.height / cellSize;

// Variables
let snake = [{ x: 5, y: 5 }];
let direction = "right";
let food = spawnFood();
let score = 0;

// Game loop
setInterval(() => {
  clearCanvas();
  moveSnake();
  drawFood();
  drawSnake();
  checkCollision();
}, 100);

// Functions
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((cell) => {
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Add new head
  snake.unshift(head);

  // Remove tail
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function spawnFood() {
  let food = {};

  do {
    food.x = Math.floor(Math.random() * cols);
    food.y = Math.floor(Math.random() * rows);
  } while (snake.some((cell) => cell.x === food.x && cell.y === food.y));

  return food;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function checkCollision() {
  let head = snake[0];

  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    gameOver();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  alert(`Game over! Score: ${score}`);
  location.reload();
}

// Event listeners
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
      case "ArrowLeft":
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case "ArrowRight":
        if (direction !== "left") {
          direction = "right";
        }
        break;
      }
    })