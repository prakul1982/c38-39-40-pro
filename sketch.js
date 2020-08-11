var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var h1,h2,h3,h4;

var h1Group,h2Group,h3Group,h4Group;

var marking = "notEliminated";

function preload(){
  track = loadImage("images/track6.jpg");
  bg = loadImage("images/bg.jpg");
  pl1 = loadAnimation("images/A1.png","images/A2.png","images/A3.png");
  pl2 = loadAnimation("images/o1.png","images/o2.png","images/o3.png");
  pl3 = loadAnimation("images/p1.png","images/p2.png","images/p3.png");
  pl4 = loadAnimation("images/1one.png","images/2two.png","images/3three.png");
  hurdle = loadImage("images/hurdle.png");
  eliminateTag = loadImage("images/eliminate.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  h1Group = new Group();
  h2Group = new Group();
  h3Group = new Group();
  h4Group = new Group();

  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  background(bg);

  
  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play(); 
    if(car1.collide(h1Group)){
      car1.destroy();
      car1.marking = "eliminated";
      for(var i=0;i<displayWidth*4;i+=250){
        var el1 = createSprite(i,410);
        el1.addImage("eliminate",eliminateTag);
        el1.scale =0.45;
      }
    }

    if(car2.collide(h2Group)){
      car2.destroy();
      car2.marking = "eliminated";
      for(var i=0;i<displayWidth*4;i+=250){
        var el2 = createSprite(i,610);
        el2.addImage("eliminate",eliminateTag);
        el2.scale =0.45;
      }
    }

    if(car3.collide(h3Group)){
      car3.destroy();
      car3.marking = "eliminated";
      for(var i=0;i<displayWidth*4;i+=250){
        var el3 = createSprite(i,810);
        el3.addImage("eliminate",eliminateTag);
        el3.scale =0.45;
      }
    }

    if(car4.collide(h4Group)){
      car4.destroy();
      car4.marking = "eliminated";
      for(var i=0;i<displayWidth*4;i+=250){
        var el4 = createSprite(i,1010);
        el4.addImage("eliminate",eliminateTag);
        el4.scale =0.45;
      }
    }
  }

  if(gameState === 2){
    game.end();
  }
  
}
