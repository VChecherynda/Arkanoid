class Game {

  constructor(){
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.x = canvas.width/2;
    this.y = canvas.height-10;
    this.dx = 2;
    this.dy = -2;
    this.ballRadius = 10;
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.paddleX = (this.canvas.width-this.paddleWidth)/2;
    this.rightPressed = false;
    this.leftPressed = false;
    this.bricks = [];
    this.brickRowCount = 3;
    this.brickColumnCount = 5;
    this.brickWidth = 80;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetleft = 30;
    this.bricks = [];
    this.score = 0;
    this.lives = 3;
  }

  briksArrayTemplate() {
    
    for( let c = 0; c < this.brickColumnCount; c++){
        this.bricks[c] = [];
      for(let r = 0; r < this.brickRowCount; r++){
        this.bricks[c][r] = { x: 0, y: 0, status: 1};
      }
    }

  }

  drawScore(){
    this.context.font = "16px Arial";
    this.context.fillStyle = "#218CD4";
    this.context.fillText("Score: " + this.score, 8, 20);
  }

  drawLives(){
    this.context.font = "16px Arial";
    this.context.fillStyle = "#218CD4";
    this.context.fillText("Lives: " + this.lives, this.canvas.width - 65, 20);
  }

  drawPaddle() {
    this.context.beginPath();
    this.context.rect( this.paddleX, this.canvas.height - this.paddleHeight , this.paddleWidth, this.paddleHeight);
    this.context.fillStyle = "#218CD4";
    this.context.fill();
    this.context.closePath();
  }

  drawBricks() {

    for( let c = 0; c < this.brickColumnCount; c++) {
      for( let r = 0; r < this.brickRowCount; r++) {
        if(this.bricks[c][r].status == 1) {
          let brickX = (c*(this.brickWidth + this.brickPadding)) + this.brickOffsetleft;
          let brickY = (r*(this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;

          this.context.beginPath();
          this.context.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.context.fillStyle = "#218CD4";
          this.context.fill();
          this.context.closePath();
        }
      }
    }
  }

  drawBall() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.ballRadius , 0, Math.PI*2);
    this.context.fillStyle = "#218CD4";
    this.context.fill();
    this.context.closePath();
  }

  run() {

    if(this.x + this.dx > this.canvas.height - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }

    if( this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > this.canvas.height - this.ballRadius) {

      if( this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -this.dy;
      } else {
        this.lives--;

        if (!this.lives) {
          alert("GAME OVER");
          document.location.reload();
        } else {
          this.x = this.canvas.width/2;
          this.y = this.canvas.height - 30;
          this.dx = 2;
          this.dy = -2;
          this.paddleX = (this.canvas.width - this.paddleWidth)/2;
        }
      }
    }

  }

  move() {
    if( this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
      this.paddleX += 7;
    } else if( this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 7;
    }
  }

  draw() {

    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.collisionDetection();
    this.run();
    this.move();

    this.x += this.dx;
    this.y += this.dy;
  }


  collisionDetection() {
    for( let c = 0; c < this.brickColumnCount; c++) {
      for( let r = 0; r < this.brickRowCount; r++) {
        let b = this.bricks[c][r];
        if( b.status == 1 ) {
          if( this.x > b.x && this.x < b.x + this.brickWidth && this.y > b.y && this.y < b.y + this.brickHeight  ) {
            this.dy = - this.dy;
            this.bricks[c][r].status = 0;
            this.score++;
            if(this.score == this.brickRowCount * this.brickColumnCount) {
              alert("You win !");
              document.location.reload();
            }
          }
        }  
      }
    }
  }

}

let game  = new Game();

game.briksArrayTemplate();

document.addEventListener("keydown", keyDownHandler , false);
document.addEventListener("keyup", keyUpHandler , false);
document.addEventListener("mousemove", mouseMoveHandler , false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    game.rightPressed = true;
  } else if(e.keyCode == 37) {
    game.leftPressed = true;game
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    game.rightPressed = false;
  } else if(e.keyCode == 37) {
    game.leftPressed = false;
  }
}

function mouseMoveHandler(e) {

  let relativeX = e.clientX - game.canvas.offsetLeft;
  if(relativeX > 0 && relativeX < game.canvas.width) {
    game.paddleX = relativeX - game.paddleWidth/2;
  }
}

setInterval( function(){ game.draw(); }, 10);

    







