canvas.addEventListener("mousemove", moverPaletaJugador);

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
  }
}
