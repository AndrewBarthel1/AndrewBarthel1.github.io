
type Cord = [number, number];

let bx = 20; //width
let by = 20; // height
let boxSize = 20; // box size
let tickSpeed = 100;
let direction: Cord = [0, 0];
let snake: Cord[] = [[10, 10]];
let apple: Cord = [5, 5];
let spike: Cord[] = [[3,3]];
let score = 0;
let gameOver = false;
let hardMode = false;
let highscoren = 0;
let highscoreh = 0;
let sd = 0;
let deathInterval: ReturnType<typeof setInterval> | null = null;

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Handle keyboard input
document.addEventListener("keydown", (e: KeyboardEvent) => {
  switch (e.key.toLowerCase()) {
    case "w":
      if (score ==0 || (score > 0 && !(snake[0][1]-1 === snake[1][1]))) direction = [0, -1];
      break;
    case "a":
      if (score ==0 || (score > 0 && !(snake[0][0]-1 === snake[1][0]))) direction = [-1, 0];
      break;
    case "s":
      if (score ==0 || (score > 0 && !(snake[0][1]+1 === snake[1][1]))) direction = [0, 1];
      break;
    case "d":
      if (score ==0 || (score > 0 && !(snake[0][0]+1 === snake[1][1]))) direction = [1, 0];
      break;
      case"p":
      if(gameOver)
      {
        restart();
        hardMode = false;
}
      break;
      case "l":
      if(gameOver)
      {
        restart();
        hardMode = true;
        break;
      }
  }
});

function restart() {
  snake = [[10, 10]];
  apple = [5, 5];
  spike = [[3,3]];
  direction = [0, 0];
  if(score > highscoreh && hardMode)
    highscoreh = score;
else if(score > highscoren && !hardMode)
    highscoren = score;
  score = 0;
  gameOver = false;
}

function gameLoop() {
  if (gameOver) return;
  if (direction[0] === 0 && direction[1] === 0) {
    render();
    return;
  }
  let [headx, heady] = snake[0];
  let [dx, dy] = direction;
  let newHead: Cord = [headx + dx, heady + dy];

  if (
    newHead[0] < 0 ||
    newHead[1] < 0 ||
    newHead[0] >= bx ||
    newHead[1] >= by ||
    snake.some(([x, y]) => x === newHead[0] && y === newHead[1] )||
    (hardMode && (snake.some(([x, y]) => spike.some(([sx, sy]) => sx === x && sy === y)
      )))
  ) {
    gameOver = true;
    render();
    ctx.fillStyle = "black"
    deathInterval = setInterval(snakeDeath, (tickSpeed * 5)/(score+1));
    sd = 0;
    if(deathInterval === null)
    clearInterval(deathInterval);
  }

  if(!gameOver)
  {
  snake.unshift(newHead);

  if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
    score++;
    placeApple();
    placeSpike();
  } else {
    snake.pop();
  }

  render();
}
}

function snakeDeath(){
    if(gameOver){

    ctx.fillStyle = "black"
        ctx.fillRect(snake[sd][0] * boxSize, snake[sd][1] * boxSize, boxSize - 2, boxSize - 2)
        if(sd >= score)
        {
            ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", 118, 200);
    ctx.font = "20px Arial";
    ctx.fillText("Press 'P' to Restart in normal mode", 42, 250);
    ctx.fillText("and 'L' to Restart in hard mode", 64, 280)
    return;
        }
        sd++;
    return;
    }
    else
    {
        clearInterval(deathInterval);
    }
}
function placeApple() {
  let newApple: Cord;
  do {
    newApple = [
      Math.floor(Math.random() * bx),
      Math.floor(Math.random() * by),
    ];
  } while ((snake.some(([x, y]) => x === newApple[0] && y === newApple[1])) || 
  spike.some(([x, y]) => x === newApple[0] && y === newApple[1]))
  apple = newApple;
}

function placeSpike(){
    let newSpike: Cord;
    do{
        newSpike = [Math.floor(Math.random() * bx),
            Math.floor(Math.random() * by)];
    }while (snake.some(([x, y]) => x === newSpike[0] && y === newSpike[1]) ||
            (apple[0] === newSpike[0] && apple[1] === newSpike[1]));
    spike[score-1] = newSpike;
}

function render() {
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  for (let [x, y] of snake) {
    ctx.fillStyle = "lime";
    ctx.fillRect(x * boxSize, y * boxSize, boxSize - 2, boxSize - 2);
    ctx.fillStyle = 'rgb(29, 117, 0)'
    ctx.fillRect(snake[0][0] * boxSize, snake[0][1] * boxSize, boxSize -2, boxSize -2)
  }

  // Draw apple
  ctx.fillStyle = "red";
  ctx.fillRect(apple[0] * boxSize, apple[1] * boxSize, boxSize - 2, boxSize - 2);

  // Draw spike
  if(hardMode)
  {
  ctx.fillStyle = "white";
  ctx.font = "20px Serif";
  for(let i = 0; i < score; i++){
    ctx.fillStyle = "yellow";
    ctx.fillRect(spike[i][0] * boxSize, spike[i][1] * boxSize, boxSize - 2, boxSize - 2);
    ctx.fillStyle = "black";
  ctx.fillText("X", spike[i][0] * boxSize + 1, (spike[i][1] + 1) * boxSize - 3);}
  }

  // Draw score
  ctx.fillStyle = "black";
  ctx.fillRect(0,398,400,440);
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 415);
  if(hardMode)
  ctx.fillText("Hard Mode Highscore: " + highscoreh, 100, 415);
else
ctx.fillText("Normal Mode Highscore: " + highscoren, 100, 415);
  

}

// Start the game loop
setInterval(gameLoop, tickSpeed);
