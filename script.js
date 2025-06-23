const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;

const player = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0
};

const computer = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  color: "white",
  score: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 8,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "white"
};

const beep = new Audio("retrohit.wav");
const scoreSound = new Audio("retrocoin.wav");


function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y) {
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(text, x, y);
}

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
  }
}

function render () {
  drawRect(0, 0, canvas.width, canvas.height, "black"); 
  drawNet();
  drawText(player.score, canvas.width / 4, 50);
  drawText(computer.score, 3 * canvas.width / 4, 50);
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function gameLoop() {
  render();
}

setInterval(gameLoop, 1000 / 60);canvas.addEventListener("mousemove", moverPaletaJugador);

function moverPaletaJugador(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  const mouseY = evt.clientY - rect.top - root.scrollTop;

  player.y = mouseY - player.height / 2;
}

function gameLoop() {
  update();
  render();
}

function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
    beep.play();
  }

  computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.05

  let jugador = ball.x < canvas.width / 2 ? player : computer;

  if (colision(ball, jugador)) {
    ball.velocityX = -ball.velocityX;
    beep.play();
    let angulo = (ball.y - (jugador.y + jugador.height / 2)) / (jugador.height / 2);
    ball.velocityY = angulo * ball.speed;
  }

  if (ball.x - ball.radius < 0) {
    computer.score++;
     scoreSound.play();
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    player.score++;
     scoreSound.play();
    resetBall();
  }
}


function colision(b, p) {
  return (
    b.x - b.radius < p.x + p.width &&
    b.x + b.radius > p.x &&
    b.y - b.radius < p.y + p.height &&
    b.y + b.radius > p.y
  );
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.velocityY =  7* (Math.random() > 0.5 ? 1 : -1);
}

