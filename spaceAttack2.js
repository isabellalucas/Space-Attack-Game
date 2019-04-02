let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

function drawBackground() {
    let bg = new Image(); // background
    bg.src = "space.jpg";
    bg.onload = function() {
        ctx.drawImage(bg, 0, 0, 800, 500);
    };
}

drawBackground();

let spaceShip = new Object();
spaceShip.x = 375;
spaceShip.y = 225;
spaceShip.drawSpaceship = function(){
			let spaceShip1 = new Image(); // space ship
    		spaceShip1.src = "spaceShip.png";
    		spaceShip1.onload = function() {
        	ctx.drawImage(spaceShip1, spaceShip.x, spaceShip.y, 60, 60);
		}
}

let monster = new Object();
monster.mx = 0;
monster.my = 0;
monster.drawMonster = function() {
    let monster1 = new Image(); // space monster
    monster1.src = "spaceMonster.png";
    monster1.onload = function() {
        ctx.drawImage(monster1, monster.mx, monster.my, 60, 60);
    }
}
let changeMonster;
monster.moveMonster = function() {
	changeMonster = setInterval (function (){
    let m = (monster.my - spaceShip.y) / (monster.mx - spaceShip.x);
    let b = spaceShip.y - m * spaceShip.x;
    //if this is positive, monster pos is larger
    let xDiff = monster.mx - spaceShip.x;
    //if this is positive, monster ypos is larger
    let yDiff = monster.my - spaceShip.y;
    if (xDiff > 0)
        monster.mx -= 1;
    else monster.mx += 1;
    monster.my = Math.floor(m * monster.mx + b);
	},60);
}


function start (){
	reset();
    loop();
	spaceShip.drawSpaceship();
	monster.drawMonster();
	monster.moveMonster();
}


let lastLoopRun = 0;
function loop(){
    if(new Date().getTime()- lastLoopRun >40){
        handleControls();
        
        
        lastLoopRun = new Date().getTime();
    }
    setTimeout("loop();",2)
}

let shipController = new Object();
function toggleKey (key, isPressed){
    if (event.key == "w")
        shipController.up = isPressed;

    else if (event.key == "d")
        shipController.right = isPressed;
       
    else if (event.key == "a")
        shipController.left = isPressed;
     
    else if (event.key == "s")
        shipController.down = isPressed;
  }

document.onkeydown= function(evt){
    toggleKey(event.key, true)
}
document.onkeyup= function(evt){
    toggleKey(event.key, false)
}
let dx = 15;
let dy = -15;

function handleControls() {
    
    if (shipController.up){
        if (spaceShip.y > 10)
             spaceShip.y += dy;
    }
    if (shipController.down){
        if (spaceShip.y < 435)
            spaceShip.y -= dy;
    }
    if (shipController.right){
         if (spaceShip.x < 730)
            spaceShip.x += dx;
    }
    if(shipController.left){
         if (spaceShip.x > 10)
            spaceShip.x -= dx;
    }
 }

function reset() { //stop all movements
    clearInterval(changeMonster);
    // zerar score!! 
    spaceShip.x = 375;
    spaceShip.y = 225;
    monster.mx = 0;
    monster.my = 0

}