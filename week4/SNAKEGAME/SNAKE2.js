var bx = 20; //width
var by = 20; // height
var boxSize = 20; // box size
var tickSpeed = 100;
var direction = [0, 0];
var snake = [[10, 10]];
var apple = [5, 5];
var spike = [[3, 3]];
var score = 0;
var gameOver = false;
var hardMode = false;
var highscoren = 0;
var highscoreh = 0;
var sd = 0;
var deathInterval = null;
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
// Handle keyboard input
document.addEventListener("keydown", function (e) {
    switch (e.key.toLowerCase()) {
        case "w":
            if (score == 0 || (score > 0 && !(snake[0][1] - 1 === snake[1][1])))
                direction = [0, -1];
            break;
        case "a":
            if (score == 0 || (score > 0 && !(snake[0][0] - 1 === snake[1][0])))
                direction = [-1, 0];
            break;
        case "s":
            if (score == 0 || (score > 0 && !(snake[0][1] + 1 === snake[1][1])))
                direction = [0, 1];
            break;
        case "d":
            if (score == 0 || (score > 0 && !(snake[0][0] + 1 === snake[1][1])))
                direction = [1, 0];
            break;
        case "p":
            if (gameOver) {
                restart();
                hardMode = false;
            }
            break;
        case "l":
            if (gameOver) {
                restart();
                hardMode = true;
                break;
            }
    }
});
function restart() {
    snake = [[10, 10]];
    apple = [5, 5];
    spike = [[3, 3]];
    direction = [0, 0];
    if (score > highscoreh && hardMode)
        highscoreh = score;
    else if (score > highscoren && !hardMode)
        highscoren = score;
    score = 0;
    gameOver = false;
}
function gameLoop() {
    if (gameOver)
        return;
    if (direction[0] === 0 && direction[1] === 0) {
        render();
        return;
    }
    var _a = snake[0], headx = _a[0], heady = _a[1];
    var dx = direction[0], dy = direction[1];
    var newHead = [headx + dx, heady + dy];
    if (newHead[0] < 0 ||
        newHead[1] < 0 ||
        newHead[0] >= bx ||
        newHead[1] >= by ||
        snake.some(function (_a) {
            var x = _a[0], y = _a[1];
            return x === newHead[0] && y === newHead[1];
        }) ||
        (hardMode && (snake.some(function (_a) {
            var x = _a[0], y = _a[1];
            return spike.some(function (_a) {
                var sx = _a[0], sy = _a[1];
                return sx === x && sy === y;
            });
        })))) {
        gameOver = true;
        render();
        ctx.fillStyle = "black";
        deathInterval = setInterval(snakeDeath, (tickSpeed * 5) / (score + 1));
        sd = 0;
        if (deathInterval === null)
            clearInterval(deathInterval);
    }
    if (!gameOver) {
        snake.unshift(newHead);
        if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
            score++;
            placeApple();
            placeSpike();
        }
        else {
            snake.pop();
        }
        render();
    }
}
function snakeDeath() {
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.fillRect(snake[sd][0] * boxSize, snake[sd][1] * boxSize, boxSize - 2, boxSize - 2);
        if (sd >= score) {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Game Over!", 118, 200);
            ctx.font = "20px Arial";
            ctx.fillText("Press 'P' to Restart in normal mode", 42, 250);
            ctx.fillText("and 'L' to Restart in hard mode", 64, 280);
            return;
        }
        sd++;
        return;
    }
    else {
        clearInterval(deathInterval);
    }
}
function placeApple() {
    var newApple;
    do {
        newApple = [
            Math.floor(Math.random() * bx),
            Math.floor(Math.random() * by),
        ];
    } while ((snake.some(function (_a) {
        var x = _a[0], y = _a[1];
        return x === newApple[0] && y === newApple[1];
    })) ||
        spike.some(function (_a) {
            var x = _a[0], y = _a[1];
            return x === newApple[0] && y === newApple[1];
        }));
    apple = newApple;
}
function placeSpike() {
    var newSpike;
    do {
        newSpike = [Math.floor(Math.random() * bx),
            Math.floor(Math.random() * by)];
    } while (snake.some(function (_a) {
        var x = _a[0], y = _a[1];
        return x === newSpike[0] && y === newSpike[1];
    }) ||
        (apple[0] === newSpike[0] && apple[1] === newSpike[1]));
    spike[score - 1] = newSpike;
}
function render() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw snake
    for (var _i = 0, snake_1 = snake; _i < snake_1.length; _i++) {
        var _a = snake_1[_i], x = _a[0], y = _a[1];
        ctx.fillStyle = "lime";
        ctx.fillRect(x * boxSize, y * boxSize, boxSize - 2, boxSize - 2);
        ctx.fillStyle = 'rgb(29, 117, 0)';
        ctx.fillRect(snake[0][0] * boxSize, snake[0][1] * boxSize, boxSize - 2, boxSize - 2);
    }
    // Draw apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * boxSize, apple[1] * boxSize, boxSize - 2, boxSize - 2);
    // Draw spike
    if (hardMode) {
        ctx.fillStyle = "white";
        ctx.font = "20px Serif";
        for (var i = 0; i < score; i++) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(spike[i][0] * boxSize, spike[i][1] * boxSize, boxSize - 2, boxSize - 2);
            ctx.fillStyle = "black";
            ctx.fillText("X", spike[i][0] * boxSize + 1, (spike[i][1] + 1) * boxSize - 3);
        }
    }
    // Draw score
    ctx.fillStyle = "black";
    ctx.fillRect(0, 398, 400, 440);
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 415);
    if (hardMode)
        ctx.fillText("Hard Mode Highscore: " + highscoreh, 100, 415);
    else
        ctx.fillText("Normal Mode Highscore: " + highscoren, 100, 415);
}
// Start the game loop
setInterval(gameLoop, tickSpeed);
