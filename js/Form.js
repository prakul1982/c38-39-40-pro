class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h1');
    this.title = createElement('h1');
    this.rules = createElement('h1');
    this.rule1 = createElement('h2');
    this.rule2 = createElement('h2');
    this.rule3 = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
    this.rules.hide();
    this.rule1.hide();
    this.rule2.hide();
    this.rule3.hide();
  }

  display(){
    this.title.html("HURDLES GAME");
    this.title.position(displayWidth/2-140, -10);
    this.title.style('color',"white");

    this.rules.html("Rules of the game");
    this.rules.position(displayWidth/2-400, 70);

    this.rule1.html("*Use the right arrow key to move forward");
    this.rule1.position(displayWidth/2-400, 110);

    this.rule2.html("*Jump over the hurdles (Use the up arrow key to jump)");
    this.rule2.position(displayWidth/2-400, 150);

    this.rule3.html("*If you don't jump over the hurdles, you will get eliminated");
    this.rule3.position(displayWidth/2-400, 190);

    this.input.position(displayWidth/2 - 90 , displayHeight/2 - 80);
    this.input.size(150,30);
    this.input.style('background-color',"yellow");
    this.input.style('color',"purple");

    this.button.position(displayWidth/2 - 50, displayHeight/2);
    this.button.size(80,30);
    this.button.style('background-color',"purple");
    this.button.style('color',"white");

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 85, displayHeight/3);
      this.greeting.style("color","yellow");
    });

    this.reset.position(displayWidth-100,20);
    
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      Player.deletePlayers();

    });

  }
}
