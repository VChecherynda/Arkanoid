var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-40;
var dx = 2;
var dy = -2;
var ballRadius = 10;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius , 0, Math.PI*2);
  ctx.fillStyle = "#218CD4";
  ctx.fill();
  ctx.closePath();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = - dx;
  }

  if(y + dy > canvas.width-ballRadius || y + dy < ballRadius) {
    dy = - dy;
  }

}

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
}

setInterval(draw, 10);
