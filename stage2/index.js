
var running = false;
var FPS = 60;
var msPerFrame = 1000/60;
var gameLoop;

var x = 100;
var y = 100;
var vy = 0;

var points;

var key = new Array();

window.onkeyup = function(e) {
   var keyval = e.keyCode ? e.keyCode : e.which;
   key[String.fromCharCode(keyval)] = false;
}

window.onkeydown = function(e) {
   var keyval = e.keyCode ? e.keyCode : e.which;
   key[String.fromCharCode(keyval)] = true;
}

window.onload = function() {
    initGame();

    gameLoop = setInterval(function() {
        update();
        draw();
        if (!running) {
            console.log("WHAT\n\n\n\n\n\n\n");
            exit();
            clearInterval(gameLoop);
        }
    }, msPerFrame);

}


function initGame() {

    running = true;

}

function update() {
    console.log(" x: " + x + " | y: " + y);


    // bounds detect
    if (y < 0 || y > 500 - 50) {
        running = false;
    }




    // jump
    if (key[' ']) {
        vy = -5;
        key[' '] = false;

    }
    vy += .2;
    y += vy;


}

function draw() {

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");


    ctx.fillStyle = "#CCC";
    ctx.fillRect(0,0,500,500);

    ctx.fillStyle = "#000000";
    ctx.fillRect(x,y,50,50);
}

function exit() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");


    ctx.fillStyle = "#C66";
    ctx.fillRect(0,0,500,500);
    ctx.fillStyle = "#000000";
    ctx.fillRect(x,y,50,50);


}
