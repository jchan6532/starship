


function preload() {
  starShipTexture = loadImage('./assets/starship.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  
  ambientLight(255, 200, 100);

  CheckKeyPressed();

  // texture(starShipTexture);
  // rectMode(CENTER);
  // rect(position.x, position.y, 100, 100);

  texture(starShipTexture);
  push(); // Save current drawing style
  translate(position.x, position.y); // Move origin to spaceship center

  beginShape();
  vertex(-50, 50, 0, 1); // Bottom left point
  vertex(-200, 50, 0, 1);
  vertex(-50, -25, 0.5, 0.5);
  vertex(-50, -50, 0, 0); // Top left point
  vertex(0, -100, 0.5, 0); // Bottom center point
  vertex(50, -50, 1, 0); // Top right point
  vertex(50, -25, 0.5, 0.5);
  vertex(200, 50, 1, 1);
  vertex(50, 50, 0.5, 1); // Bottom right point
  endShape(CLOSE);

  pop(); // Restore original drawing style

  for(let i = 0;i<lasers.length;i++) {
    fill('yellow');
    rect(lasers[i].x, lasers[i].y, 3, 50);
    lasers[i].y -= 10;
  }


  lasers = lasers.filter((laser) => {
    return laser.y > -windowHeight/2;
  });

  for(let i = 0;i<lasers.length;i++) {
    if (enemy) {
      if (lasers[i].y <= enemy.y+100 && lasers[i].y >= enemy.y-100 && lasers[i].x >= enemy.x-100 && lasers[i].x <= enemy.x+100) {
        lasers.splice(i, 1);
        enemy = null;
      }
    }
  }
  

  if (enemy) {
    //fill(255);
    push();
    ambientMaterial(255, 150, 255);
    rectMode(CENTER)
    rect(enemy.x, enemy.y, 100, 100);
    pop();

    var dx = position.x - enemy.x;
    var dy = position.y - enemy.y;
    
    // Calculate the distance between the enemy and the position
    var distance = Math.sqrt(dx * dx + dy * dy);
    
    // If the enemy is more than half its width away from the position, move it closer
    if (distance > 0) { // assuming the enemy's width is 100
      // Normalize this vector to get a unit vector
      var unitX = dx / distance;
      var unitY = dy / distance;
    
      // Move the enemy along this direction by 10 units
      enemy.x += unitX * 2;
      enemy.y += unitY * 2;



    }
    else {
      alert("you suck");
      enemy = {
        x: 0,
        y: -400
      };
    }
  }
}

function CheckKeyPressed() {
  // Apply translations based on the arrow key pressed
  if (keyIsDown(LEFT_ARROW)) {
    position.x -= 6;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    position.x += 6;
  }
  if (keyIsDown(UP_ARROW)) {
    position.y -= 6;
  }
  if (keyIsDown(DOWN_ARROW)) {
    position.y += 6;
  }
  if (keyIsDown(SPACE)) {
    if (!laserOnCoolDown) {
      laserOnCoolDown = true;
      shootLaser();
      setTimeout(() => {
        laserOnCoolDown = false;
      }, 500);
    }
  }
}

function shootLaser() {
  lasers.push({
    x: position.x,
    y: position.y - 50
  })
}
