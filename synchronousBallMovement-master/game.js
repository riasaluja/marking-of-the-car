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
        car1= createSprite(200,100);
        car1.addImage(car1img);
        car2 =createSprite(400,100);
        car2.addImage(car2img);
        car3 = createSprite(600,100);
        car3.addImage(car3img);
        car4 = createSprite(800,100);
        car4.addImage(car4img);
        cars= [car1,car2,car3,car4]
      }
    play(){

      form.hide();
      textSize(30);
      text("Game Start", 120, 100)
      Player.getPlayerInfo();

      if(allPlayers !== undefined){
         //var display_position = 130;
         background(76,76,76);
         image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
         var index= 0;
         var x=200;
         var y =0;
         for(var plr in allPlayers){
           index++;
           x=x+200;
           y=displayHeight-allPlayers[plr].distance;
           cars[index-1].x=x;
           cars[index-1].y=y;
          if (index===player.index){
           // fill("red");
           // ellipse(x,y,70,70);
            cars[index-1].shapeColor="red"
            camera.position.x=displayWidth/2;
            camera.position.y=cars[index-1].y;
          }
  
         // display_position+=20;
         // textSize(15);
         // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>3850){
      gameState = 2;
    }
    drawSprites();
    }
    end(){
      console.log("Game Ended");
    }

}