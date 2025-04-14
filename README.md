<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Snake Game by Jake</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #121212;
      color: white;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 30px;
    }
    h1 {
      margin-bottom: 20px;
    }
    canvas {
      background-color: #222;
      border: 2px solid #0f0;
    }
    #score {
      margin-top: 10px;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <h1>Snake Game by Jake</h1>
  <canvas id="gameCanvas" width="400" height="400"></canvas>
  <div id="score">Score: 0</div>

  <script>
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const box = 20;
    const canvasSize = 400;
    let score = 0;

    let snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    let food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };

    let direction;

    document.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
      else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
      else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
      else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    });

    function drawGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#0f0" : "#fff";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }

      ctx.fillStyle = "#f00";
      ctx.fillRect(food.x, food.y, box, box);

      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === "LEFT") snakeX -= box;
      if (direction === "UP") snakeY -= box;
      if (direction === "RIGHT") snakeX += box;
      if (direction === "DOWN") snakeY += box;

      if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
          x: Math.floor(Math.random() * (canvasSize / box)) * box,
          y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
      } else {
        snake.pop();
      }

      const newHead = { x: snakeX, y: snakeY };

      // Game over conditions
      if (
        snakeX < 0 || snakeX >= canvasSize ||
        snakeY < 0 || snakeY >= canvasSize ||
        collision(newHead, snake)
      ) {
        clearInterval(game);
        alert("Game Over! Final Score: " + score);
        return;
      }

      snake.unshift(newHead);
      document.getElementById("score").innerText = "Score: " + score;
    }

    function collision(head, array) {
      for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
          return true;
        }
      }
      return false;
    }

    const game = setInterval(drawGame, 100);
  </script>
</body>
</html>
