const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;
let direction = "RIGHT";
let game;

let snake = [{ x: 5 * box, y: 5 * box }];
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box
};

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Snake head
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Game over
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    collision(head, snake)
  ) {
    clearInterval(game);
    alert("Game Over!");
    return;
  }

  // Food eaten
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

function restartGame() {
  clearInterval(game);
  direction = "RIGHT";
  score = 0;
  snake = [{ x: 5 * box, y: 5 * box }];
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
  document.getElementById("score").innerText = "Score: 0";
  game = setInterval(draw, 100);
}

// Start the game
game = setInterval(draw, 100);
function restartGame() {
  location.reload();
}
