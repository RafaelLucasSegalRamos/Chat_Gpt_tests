// Set up the canvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// Set up the game objects
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 5,
  dy: 5,
  radius: 10,
};

const player1 = {
  x: 50,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  score: 0,
};

const player2 = {
  x: canvas.width - 60,
  y: canvas.height / 2 - 50,
  width: 10,
  height: 100,
  score: 0,
};

// Set up the ball speed
const ballSpeed = 5;

// Set up the direction of the ball
let direction = Math.random() < 0.5 ? -1 : 1;

// Move the paddles
function movePlayer2(event) {
  if (event.key === "ArrowUp" && player2.y > 0) {
    player2.y -= 10;
  } else if (event.key === "ArrowDown" && player2.y < canvas.height - player2.height) {
    player2.y += 10;
  }
}

function movePlayer1(event) {
  if (event.key === "w" && player1.y > 0) {
    player1.y -= 10;
  } else if (event.key === "s" && player1.y < canvas.height - player1.height) {
    player1.y += 10;
  }
}

// Draw the game objects
function draw() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = "#000000";
  context.fill();
  context.closePath();

  // Draw player 1
  context.beginPath();
  context.rect(player1.x, player1.y, player1.width, player1.height);
  context.fillStyle = "#000000";
  context.fill();
  context.closePath();

  // Draw player 2
  context.beginPath();
  context.rect(player2.x, player2.y, player2.width, player2.height);
  context.fillStyle = "#000000";
  context.fill();
  context.closePath();
}

// Update the game objects
function update() {
  // Move the ball
  ball.x += ball.dx * direction;
  ball.y += ball.dy;

  // Check for collisions with the walls
  if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }

  // Check for collisions with the paddles
  if (
    (ball.x - ball.radius < player1.x + player1.width &&
      ball.y + ball.radius > player1.y &&
      ball.y - ball.radius < player1.y + player1.height) ||
    (ball.x + ball.radius > player2.x &&
      ball.y + ball.radius > player2.y &&
      ball.y - ball.radius < player2.y + player2.height)
  ) {
    ball.dx = -ball.dx;
  }

  // Check for out of bounds (player 1)
  if (ball.x - ball.radius < 0) {
    player2.score++;
    resetBall();
    }
    
    // Check for out of bounds (player 2)
    if (ball.x + ball.radius > canvas.width) {
    player1.score++;
    resetBall();
    }
    }
    // Reset the ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ballSpeed;
    ball.dy = ballSpeed;
    direction = Math.random() < 0.5 ? -1 : 1;
    }
    
    // Draw the scores
    function drawScores() {
    context.font = "bold 24px Arial";
    context.fillText(player1.score, canvas.width / 2 - 50, 50);
    context.fillText(player2.score, canvas.width / 2 + 25, 50);
    }
    
    // Draw the game
    function game() {
        draw();
update();
drawScores();
}

// Start the game loop
setInterval(game, 20);

// Add event listeners for the paddles
document.addEventListener("keydown", movePlayer1);
document.addEventListener("keydown", movePlayer2);