
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//------------------------------drawing functions------------------

function drawBackground() {
    let bg = new Image(); // background
    bg.src = "space.jpg";
    bg.onload = function() {
        ctx.drawImage(bg, 0, 0, 800, 500);
    };
}

let x = 375;
let y = 225;
function drawSpaceship() {
    let spaceShip = new Image(); // space ship
    spaceShip.src = "spaceShip.png";
    spaceShip.onload = function() {
        ctx.drawImage(spaceShip, x, y, 60, 60);
    }
}

let mx = 0;
let my = 0;
function drawMonster() {
    let monster = new Image(); // space monster
    monster.src = "spaceMonster.png";
    monster.onload = function() {
        ctx.drawImage(monster, mx, my, 60, 60);
    }
}

function drawShipFireLeft(){                    //ship fire left
    let shipFire = new Image();
    shipFire.src = "rfire0.png";
    shipFire.onload = function(){
        ctx.drawImage(shipFire, x-20, y + 10, 20, 20);
    }
}
function drawShipFireUp(){                    //ship fire up
    let shipFire = new Image();
    shipFire.src = "rfire1.png";
    shipFire.onload = function(){
        ctx.drawImage(shipFire, x+20, y - 20, 20, 20);
    }
}
function drawShipFireRight(){                    //ship fire up
    let shipFire = new Image();
    shipFire.src = "rfire2.png";
    shipFire.onload = function(){
        ctx.drawImage(shipFire, x+60, y + 10, 20, 20);
    }   
}
function drawShipFireDown(){                    //ship fire up
    let shipFire = new Image();
    shipFire.src = "rfire3.png";
    shipFire.onload = function(){
        ctx.drawImage(shipFire, x+20, y + 60, 20, 20);
    } 
}
function drawMonsterFireRight(){                     //monster fire
    let monsterFire = new Image();
    monsterFire.src = "bfire2.png";
    monsterFire.onload = function(){
        ctx.drawImage(monsterFire, mx+70, my + 10, 20, 20)
    }
}
// --------------------------movement events------------------------------
let changeMonster;

function start() { //monster movement
    reset();
    drawMonster();
    drawSpaceship();
    drawMonsterFireRight();
    changeMonster = setInterval(function() {
        moveMonster();
    }, 60);
}

function moveMonster() {
    let m = (my - y) / (mx - x);
    let b = y - m * x;
    //if this is positive, monster pos is larger
    let xDiff = mx - x;
    //if this is positive, monster ypos is larger
    let yDiff = my - y;
    if (xDiff > 0)
        mx -= 1;
    else mx += 1;
    my = Math.floor(m * mx + b);
}


let controller = new Object();
function toggleKey (key, isPressed){
    if (event.key == "w")
        controller.up = isPressed;

    else if (event.key == "d")
        controller.right = isPressed;
       
    else if (event.key == "a")
        controller.left = isPressed;
     
    else if (event.key == "s")
        controller.down = isPressed;

    else if (event.key == "ArrowLeft"){
        controller.arrLeft == isPressed;
        drawShipFireLeft();
        
    }
    else if (event.key == "ArrowUp"){
        controller.arrUp == isPressed;
         drawShipFireUp();

    }
    else if (event.key == "ArrowRight"){
        controller.arrRight == isPressed;
        drawShipFireRight();

    }
    else if (event.key == "ArrowDown"){
        controller.arrDown == isPressed;
        drawShipFireDown();
    }
}
document.onkeydown= function(evt){
    toggleKey(event.key, true)
}
document.onkeyup= function(evt){
    toggleKey(event.key, false)
}

function showSprites (){
    drawBackground();
    drawSpaceship();
    drawMonster();
}

let lastLoopRun = 0;
function loop(){
    if(new Date().getTime()- lastLoopRun >40){
        handleControls();
        showSprites();
        
        lastLoopRun = new Date().getTime();
    }
    setTimeout("loop();",2)
}

loop();

let dx = 15;
let dy = -15;

function handleControls() {
    
    if (controller.up){
        if (y > 10)
             y += dy;
    }
    if (controller.down){
        if (y < 435)
            y -= dy;
    }
    if (controller.right){
         if (x < 730)
            x += dx;
    }
    if(controller.left){
         if (x > 10)
            x -= dx;
    }
    if(controller.arrLeft) {
        if (x>10)
            x-=dx;
    }
    if(controller.arrRight) {
        if (x<720)
            x+=dx;
    }
    if(controller.arrUp) {
        if (y>10)
            y+=dy;
    }
    if(controller.arrDown) {
        if (y<435)
            y-=dy;
    }
    
}

//-------------------------------------------------------

function reset() { //stop all movements
    clearInterval(changeMonster);
    // zerar score!! 
    x = 375;
    y = 225;
    mx = 0;
    my = 0

}
