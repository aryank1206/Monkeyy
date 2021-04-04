var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running
var ground, invisibleGround, groundImage;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle2, obstacle1,obstacle3;
var score=0;

var life = 3;

var gameOver, restart;

var coinSound;
localStorage["HighestScore"] = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 200);
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.09;
  
  ground = createSprite(0,190,1200,10);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  

  



  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("blue");
  textSize(15);
  fill(255);
  text("Survival Time: "+ score, 300,40);
//text("life: "+ life , 500,60);
  drawSprites();
  if (gameState===PLAY){
    
   if(bananaGroup.isTouching(monkey)){
     
bananaGroup[0].destroy();
    
   }
    
     if(frameCount % 10 === 0){
       score=score+1
     }
    
    if(score >= 0){
      ground.velocityX = -6;
    }else{
      ground.velocityX = -(6 + 3*score/100);
    }
  
    if(keyDown("space") && monkey.y >= 139) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    
    spawnBanana();
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(monkey)){
     life=life-1;
        gameState = END;
    } 
  }
  
  else if (gameState === END ) {

    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    

    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     textSize(30);
  fill(255);
  text("press 'r' to restart ", 200,100);

if(keyDown("r")){
  obstaclesGroup.destroyEach()
  bananaGroup.destroyEach()
  monkey.destroy()
  setup();
  gameState=PLAY
}

  }
  
  
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,169,5,30); 


          obstacle.setCollider("circle")
  
        
    obstacle.velocityX = -(6 + 3*score/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.09;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  obstacle.addImage(obstacleImg);
    obstacle.debug=true
}
}
function reset(){
  gameState = PLAY;

  
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  mario.changeAnimation("running",mario_running);
  mario.scale =0.5;
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
}

  
