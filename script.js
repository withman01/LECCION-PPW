canvas.addEventListener("mousemove", moverPaletaJugador);

function moverPaletaJugador(evt) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;

  const mouseY = evt.clientY - rect.top - root.scrollTop;

  player.y = mouseY - player.height / 2;
}
