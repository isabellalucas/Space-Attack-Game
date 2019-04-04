let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let hight = 500;
let width = 800;

// --------------------General controls-----------------------------

function start (){                  //start button
	reset();
    loop();
    addMonster();
}

function reset() {                  //reset button
    // zerar score!! 
    spaceShip.resetSpaceship();
    clearInterval(loopValidation);
    clearInterval(addMonsterValidation);
    resetAllMonsters();
    showSprites();
}

function drawBackground() {                 // draw background
    let bg = new Image(); 
    bg.src = "space.jpg";
        ctx.drawImage(bg, 0, 0, 800, 500);
}

let loopValidation;                 //game loop
let lastLoopRun = 0;
function loop(){
    loopValidation = setInterval( function(){
        if(new Date().getTime()- lastLoopRun >40){
            handleControls();
            showSprites();
            lastLoopRun = new Date().getTime();
        }
    },2); 
}

function showSprites (){            //rendering function
    drawBackground();
    drawMonster();
    spaceShip.drawSpaceship();
    moveMonster();
}

// ---------------------------Monster-------------------------------
let addMonsterValidation;
let monsterArray = [];
function addMonster (){
    // while(true){
       addMonsterValidation= setInterval( function () {
                monsterArray.push (new Monster(Math.floor(Math.random()*800),Math.floor(Math.random()*500)))
            }, 2000);
    // }
};


function Monster(x,y){
    let monster = new Image(); // space monster
    monster.src = "spaceMonster.png";
    this.r = 30;
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.draw = function(){
        if(this.isAlive)
             ctx.drawImage(monster, this.x, this.y, this.r*2, this.r*2);
    }
    this.resetMonster = function(){
        this.x = x;
        this.y = y;
    }
}
function drawMonster(){
    for(let i = 0; i < monsterArray.length; i++){
        monsterArray[i].draw();
    }
}
function resetAllMonsters(){
    monsterArray=[];
}

function moveMonster() {
    for(let i = 0; i < monsterArray.length; i++){
        let current = monsterArray[i];
        let m = (current.y - spaceShip.y) / (current.x - spaceShip.x);
        let b = spaceShip.y - m * spaceShip.x;
        //if this is positive, monster pos is larger
        let xDiff = current.x - spaceShip.x;
        //if this is positive, monster ypos is larger
        let yDiff = current.y - spaceShip.y;
        if (xDiff > 0)
            current.x -= 1;
        else current.x += 1;
        current.y = Math.floor(m * current.x + b);
    }
}
// ---------------------SpaceShip-----------------------

let spaceShip = new Object();
spaceShip.x = 375;
spaceShip.y = 225;
spaceShip.r= 30;
spaceShip.drawSpaceship = function(){
	let spaceShip1 = new Image(); // space ship
	spaceShip1.src = "spaceShip.png";
	    ctx.drawImage(spaceShip1, spaceShip.x, spaceShip.y, spaceShip.r*2, spaceShip.r*2);
    }
spaceShip.resetSpaceship = function  (){
    spaceShip.x = 375;
    spaceShip.y = 225;
}

let shipController = new Object();            // controllers
function toggleKey (key, isPressed){          //!!! fix CapsLock bug - capitalize
    if (event.key == "w")
        shipController.up = isPressed;

    else if (event.key == "d")
        shipController.right = isPressed;
       
    else if (event.key == "a")
        shipController.left = isPressed;
     
    else if (event.key == "s")
        shipController.down = isPressed;

    else if (event.key == "ArrowLeft"){
        shipController.arrLeft == isPressed;
        drawShipFireLeft();
        
    }
    else if (event.key == "ArrowUp"){
        shipController.arrUp == isPressed;
         drawShipFireUp();

    }
    else if (event.key == "ArrowRight"){
        shipController.arrRight == isPressed;
        drawShipFireRight();

    }
    else if (event.key == "ArrowDown"){
        shipController.arrDown == isPressed;
        drawShipFireDown();
    }
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
        if (spaceShip.y > 10){ 
            spaceShip.y += dy;
        }
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
     if(shipController.arrLeft) {
        if (spaceShip.x>10)
            spaceShip.x-=dx;
    }
    if(shipController.arrRight) {
        if (spaceShip.x<720)
            spaceShip.x+=dx;
    }
    if(shipController.arrUp) {
        if (spaceShip.y>10)
            spaceShip.y+=dy;
    }
    if(shipController.arrDown) {
        if (spaceShip.y<435)
            spaceShip.y-=dy;
    }

 }
// ---------------------------SpaceShip Fire Events---------------------------

function drawShipFireRight(){                    //ship fire up
    let shipFire = new Image();
    shipFire.src = "rfire2.png";
    let newX, newY;
    let r = 10;
    newX = spaceShip.x+60;
    newY = spaceShip.y +10;
     let validatefireRightInterval = setInterval(()=>{
        ctx.drawImage(shipFire, newX, newY, r*2, r*2);
        newX += 40;
            if (newX>width){
                clearInterval(validatefireRightInterval);
            }
            for (let i = 0; i<monsterArray.length; i++){
                let current = monsterArray[i];
                let d = dist(newX,newY, current.x, current.y);
                if(d<r +current.r){
                    current.isAlive=false;
                    // clearInterval(validatefireRightInterval);
                }
            }
    },100)
}

function drawShipFireLeft(){                    //ship fire left
    let shipFire = new Image();
    let newX, newY;
    let r = 10;
    shipFire.src = "rfire0.png";
    newX = spaceShip.x-20;
    newY = spaceShip.y +10;
    let validatefireLeftInterval = setInterval(()=>{
        ctx.drawImage(shipFire, newX, newY, r*2, r*2);
        newX -= 40;
            if (newX<0){
                clearInterval(validatefireLeftInterval);
            }
            for (let i = 0; i<monsterArray.length; i++){
                let current = monsterArray[i];
                let d = dist(newX,newY, current.x, current.y);
                if(d<r +current.r){
                    current.isAlive=false;
                    clearInterval(validatefireLeftInterval);
                }
            }
    },100)
}
function drawShipFireUp(){                    //ship fire up
    let shipFire = new Image();
    let r = 10;
    shipFire.src = "rfire1.png";
    newX = spaceShip.x+20;
    newY = spaceShip.y-20;
    let validatefireUpInterval = setInterval(()=>{
        ctx.drawImage(shipFire, newX, newY, r*2, r*2);
        newY -= 40;
            if (newY<0){
                clearInterval(validatefireUpInterval);
            }
            for (let i = 0; i<monsterArray.length; i++){
                let current = monsterArray[i];
                let d = dist(newX,newY, current.x, current.y);
                if(d<r +current.r){
                    current.isAlive=false;
                    clearInterval(validatefireUpInterval);
                }
            }
    },100)
}
function drawShipFireDown(){                    //ship fire down
    let r = 10;
    let shipFire = new Image();
    shipFire.src = "rfire3.png";
    newX = spaceShip.x+20;
    newY = spaceShip.y+40;
    let validatefireDownInterval = setInterval(()=>{
        ctx.drawImage(shipFire, newX, newY, r*2, r*2);
        newY += 40;
            if (newY>height){
                clearInterval(validatefireDownInterval);
            }
            for (let i = 0; i<monsterArray.length; i++){
                let current = monsterArray[i];
                let d = dist(newX,newY, current.x, current.y);
                if(d<r +current.r){
                    current.isAlive=false;
                    clearInterval(validatefireDownInterval);
                }
            }
    },100)
}

function dist (x1, y1, x2, y2){
    let d = Math.sqrt(Math.pow(x2-x1,2)+ Math.pow(y2-y1, 2));
    return d;
}
