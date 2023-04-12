const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Snake starting position
let x = 10;
let y = 10;

// Snake speed and direction
let dx = 10;
let dy = 0;

// Apple starting position
let appleX = 50;
let appleY = 50;

// Snake body
const snake = [];

// Initial snake length
let snakeLength = 4;

// Game loop
function gameLoop() {
    // Move the snake
    x += dx;
    y += dy;

    // Check for collision with walls
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
        gameOver();
        return;
    }

    // Check for collision with apple
    if (x === appleX && y === appleY) {
        snakeLength++;
        appleX = Math.floor(Math.random() * canvas.width);
        appleY = Math.floor(Math.random() * canvas.height);
    }

    // Add the new head to the snake
    snake.unshift({ x, y });

    // Remove the tail if the snake is too long
    if (snake.length > snakeLength) {
        snake.pop();
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the apple
    ctx.fillStyle = "red";
    ctx.fillRect(appleX, appleY, 10, 10);

    // Draw the snake
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        const { x, y } = snake[i];
        ctx.fillRect(x, y, 10, 10);
    }

    // Set a timeout and call the game loop again
    setTimeout(gameLoop, 100);
}

// Game over function
function gameOver() {
    alert("Game over!");
    window.location.reload();
}

// Key down event listener to change the snake's direction
document.addEventListener("keydown", (event) => {
    if (event.keyCode === 37) { // Left arrow
        dx = -10;
        dy = 0;
    } else if (event.keyCode === 38) { // Up arrow
        dx = 0;
        dy = -10;
    } else if (event.keyCode === 39) { // Right arrow
        dx = 10;
        dy = 0;
    } else if (event.keyCode === 40) { // Down arrow
        dx = 0;
        dy = 10;
    }
});

// Start the game loop
gameLoop();
