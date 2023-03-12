// Constants
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
const cols = canvas.width / cellSize;
const rows = canvas.height / cellSize;
const pieces = [
  {
    // I
    shape: [[1, 1, 1, 1]],
    color: "cyan",
  },
  {
    // J
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "blue",
  },
  {
    // L
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "orange",
  },
  {
    // O
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#222",
  },
  {
    // S
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "lime",
  },
  {
    // T
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "purple",
  },
  {
    // Z
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red",
  },
];
const wall = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
const dropInterval = 1000;
const scoreElement = document.getElementById("score");

// Variables
let piece = getRandomPiece();
let x = 3;
let y = 0;
let score = 0;
let dropTimer = 0;

// Game loop
function loop(timestamp) {
  if (!dropTimer) {
    dropTimer = timestamp;
  }

  const deltaTime = timestamp - dropTimer;

  if (deltaTime >= dropInterval) {
    drop();
    dropTimer = timestamp;
  }

  clearCanvas();
  drawWall();
  drawPiece();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

// Functions
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPiece() {
  ctx.fillStyle = piece.color;
  piece.shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell) {
        ctx.fillRect((j + x) * cellSize, (i + y) * cellSize, cellSize, cellSize);
      }
    });
  });
}

function drawWall() {
  wall.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell) {
        ctx.fillStyle = cell;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
        });
      });
    }
    
    function clearRow(row) {
      for (let i = row; i >= 1; i--) {
        for (let j = 0; j < cols; j++) {
          wall[i][j] = wall[i - 1][j];
        }
      }
    
      for (let j = 0; j < cols; j++) {
        wall[0][j] = null;
      }
    }
    
    function checkRow() {
      for (let i = rows - 1; i >= 0; i--) {
        const row = wall[i];
        if (row.every((cell) => cell !== null)) {
          clearRow(i);
          score += 100;
          scoreElement.innerText = score;
        }
      }
    }
    
    function gameOver() {
      alert(`Game Over! Your score is ${score}`);
      location.reload();
    }
    
    function getRandomPiece() {
      const randomIndex = Math.floor(Math.random() * pieces.length);
      return {
        shape: pieces[randomIndex].shape,
        color: pieces[randomIndex].color,
      };
    }
    
    function drop() {
      y++;
    
      if (collide()) {
        y--;
        piece.shape.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell) {
              wall[i + y][j + x] = piece.color;
            }
          });
        });
        checkRow();
        piece = getRandomPiece();
        x = 3;
        y = 0;
    
        if (collide()) {
          gameOver();
        }
      }
    }
    
    function moveLeft() {
      x--;
      if (collide()) {
        x++;
      }
    }
    
    function moveRight() {
      x++;
      if (collide()) {
        x--;
      }
    }
    
    function rotate() {
      const newShape = [];
    
      for (let j = piece.shape[0].length - 1; j >= 0; j--) {
        const newRow = [];
        for (let i = 0; i < piece.shape.length; i++) {
          newRow.push(piece.shape[i][j]);
        }
        newShape.push(newRow);
      }
    
      piece.shape = newShape;
      if (collide()) {
        for (let j = 0; j < piece.shape[0].length; j++) {
          const newRow = [];
          for (let i = piece.shape.length - 1; i >= 0; i--) {
            newRow.push(piece.shape[i][j]);
          }
          newShape[j] = newRow;
        }
        piece.shape = newShape;
      }
    }
    
    function collide() {
      return piece.shape.some((row, i) =>
        row.some((cell, j) => {
          if (cell) {
            const newX = j + x;
            const newY = i + y;
            return newX < 0 || newX >= cols || newY >= rows || wall[newY][newX] !== null;
          }
          return false;
        })
      );
    }
    
    // Event listeners
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowDown":
          drop();
          break;
        case "ArrowUp":
          rotate();
          break;
      }
    });
    