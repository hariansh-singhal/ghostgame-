var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var PLAY = 1
var END = 2
var gameState = PLAY;
var invisibleClimber, invisibleClimberGroup;

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");

}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 1;

  doorGroup = new Group();

  climberGroup = new Group();

  invisibleClimberGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;


}

function draw() {
  
  if (gameState===PLAY){
     background(0);
  if (tower.y > 400) {
    tower.y = 300;
  }

  ghost.velocityY = ghost.velocityY + 0.3;

  if (keyDown("space")) {
    ghost.velocityY = -5;
  }


  if (keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }


  if (keyDown("left_arrow")) {
    ghost.x = ghost.x - 3;
  }

  if (ghost.y > 600 || ghost.isTouching(climberGroup)) {
    gameState = END;
  }
  
  if(ghost.isTouching(invisibleClimberGroup)){
    ghost.collide(invisibleClimber)
  }

  spawnDoors();

  drawSprites();
  }
  
  if(gameState===END){
    background(0);
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
  }
 
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.addImage(doorImage);
    door.velocityY = 1;
    door.x = Math.round(random(120, 400));
    door.lifetime = 800;
    door.scale = 0.8;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    doorGroup.add(door);

    climber = createSprite(200, 5);
    climber.addImage(climberImage);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.scale = 0.8;
    climber.lifetime = 800;
    climber.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    climberGroup.add(climber);

    invisibleClimber = createSprite(50, 50, 80, 5);
    invisibleClimber.x = climber.x
    invisibleClimber.y = climber.y - 10;
    invisibleClimber.velocityY = 1;
    invisibleClimber.visible=false;
    invisibleClimberGroup.add(invisibleClimber);

  }
}