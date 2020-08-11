class Game {	
	constructor(){
	
	}
	
	getState(){
		var gameStateRef  = database.ref('gameState');
		gameStateRef.on("value",function(data){
		gameState = data.val();
	})
	
	}
	
	update(state){
		database.ref('/').update({
		gameState: state
	});
	}
	
	async start(){
		if(gameState === 0){
			player = new Player();
			var playerCountRef = await database.ref('playerCount').once("value");
			
			if(playerCountRef.exists()){
				playerCount = playerCountRef.val();
				player.getCount();
			}

			form = new Form()
			form.display();
		}	

		for(var i=0;i<displayWidth*4;i+=170){
			var w1 = createSprite(i,437,150,10);
			w1.shapeColor ="white";
		}
	
		for(var i=0;i<displayWidth*4;i+=170){
			var w2 = createSprite(i,637,150,10);
			w2.shapeColor ="white";
		}
	
		for(var i=0;i<displayWidth*4;i+=170){
			var w3 = createSprite(i,837,150,10);
			w3.shapeColor ="white";
		}
	
		for(var i=0;i<displayWidth*4;i+=170){
			var w4 = createSprite(i,1037,150,10);
			w4.shapeColor ="white";
		}

		for(var i=0;i<displayWidth*4;i+=250){
			h1 = createSprite(i,417);
			h1.addImage("hurdleRow1",hurdle);
			h1.scale =0.8;
			h1.setCollider("rectangle",10,0,60,60);
			h1Group.add(h1);
		}
	
		for(var i=0;i<displayWidth*4;i+=250){
			h2 = createSprite(i,617);
			h2.addImage("hurdleRow2",hurdle);
			h2.scale =0.8;
			h2.setCollider("rectangle",10,0,60,60);
			h2Group.add(h2);
		}
	
		for(var i=0;i<displayWidth*4;i+=250){
			h3 = createSprite(i,817);
			h3.addImage("hurdleRow3",hurdle);
			h3.scale =0.8;
			h3.setCollider("rectangle",10,0,60,60);
			h3Group.add(h3);
		}

		for(var i=0;i<displayWidth*4;i+=250){
			h4 = createSprite(i,1017);
			h4.addImage("hurdleRow4",hurdle);
			h4.scale =0.8;
			h4.setCollider("rectangle",10,0,60,60);
			h4Group.add(h4);
		}
	
		car1 = createSprite(10,300,10,10);
		car1.addAnimation("car1",pl1);
		car1.scale = 1;
		car1.setCollider("rectangle",-10,0,40,80);
		
		car2 = createSprite(10,500,10,10);
		car2.addAnimation("car2",pl2);
		car2.scale = 0.2;
		car2.setCollider("rectangle",-20,0,200,340);

		car3 = createSprite(10,700,10,10);
		car3.addAnimation("car3",pl3);
		car3.scale = 0.03;
		car3.setCollider("rectangle",-30,-30,2000,2500);

		car4 = createSprite(10,900,10,10);
		car4.addAnimation("car4",pl4);
		car4.scale = 0.15;
		car4.setCollider("rectangle",0,0,300,500);

		cars = [car1, car2, car3, car4];
	}
	
	play(){
		form.hide();
		
		Player.getPlayerInfo();

		player.getCarsAtEnd();
		
		if(allPlayers !== undefined){
			background("blue");
			image(track,0,300,displayWidth*4.2, 1000);
			
			var index = 0;
			
			var y = 200 ;
			var x = 0;
			
			for(var plr in allPlayers){
			index = index + 1 ;
			
			y = y + 200;

			x = displayHeight - allPlayers[plr].distance;
			cars[index-1].x = x;
			cars[index-1].y = y;
			
			if (index === player.index){
				stroke(10);
				fill("red");
				ellipse(x,y,60,60);
				cars[index - 1].shapeColor = "red";
				if(cars[index - 1].marking === "eliminated"){
					cars[index - 1].remove();
				}
				else{
				}
				camera.position.x = cars[index-1].x+500;
				camera.position.y = displayWidth/2;
				if(keyIsDown(UP_ARROW)){
					cars[index-1].y =y-60;
					player.update();
					stroke("blue");
					fill("blue");
					ellipse(x,y+0,60,60);
					fill("red");
					ellipse(x,y-60,60,60);
				}
			}
		
		}
	
	}
	

	if(keyIsDown(RIGHT_ARROW)){
		player.distance -=10
		player.update();
		console.log(player.index);
	}
	

	if(player.distance === -5000){
		gameState = 2;
		player.rank+= 1;
        Player.updateCarsAtEnd(player.rank);
	}
	
	drawSprites();
	}
	
	end(){
		console.log(player.rank);
		var rankStatus = createElement('h1',"Your Rank:"+player.rank);
		rankStatus.position(displayWidth/2-140,displayHeight/3);
		var done = createElement('h1',"GAME ENDED");
		done.position(displayWidth/2-140,displayHeight/4);
		if(player.rank === 1){
			var congrats = createElement('h1',"Congrats!,You won the Hurdle Race.");
			congrats.position(displayWidth/2-140,displayHeight/2);
		}
		else if(player.rank === 2||player.rank === 3){
			var congrats = createElement('h1',"Well done!,You performed well in the Hurdle Race.");
			congrats.position(displayWidth/2-140,displayHeight/2);
		}
		else if(player.rank === 4){
			var congrats = createElement('h1',"Better luck next time");
			congrats.position(displayWidth/2-140,displayHeight/2);
		}
	}
}
