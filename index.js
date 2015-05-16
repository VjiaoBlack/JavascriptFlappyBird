
var running = false;
var FPS = 60;
var msPerFrame = 1000/60;
var gameLoop;

var x = 100;
var y = 100;
var vy = 0;

var pipe3x = 1500;
var pipe2x = 1250;
var pipe1x = 1000;

var pipe1y = 150;
var pipe2y = 200;
var pipe3y = 100;

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
            exit();
            clearInterval(gameLoop);
        }
    }, msPerFrame);

}


function initGame() {

    running = true;

}

function update() {

    // bounds detect
    if (y < 0 || y > 500 - 50) {
        running = false;
    }

    // jump
    if (key[' ']) {
        vy = -6;
        key[' '] = false;

    }
    vy += .3;
    y += vy;

    // collision detect with pipes
    if (pipeCollide(pipe1x, pipe1y) || pipeCollide(pipe2x, pipe2y) || pipeCollide(pipe3x, pipe3y)) {
        running = false;
    }


    // move pipes
    pipe1x -= 4;
    pipe2x -= 4;
    pipe3x -= 4;

    if (pipe1x < -60) {
        pipe1x = pipe3x + 250;
    }

    if (pipe2x < -60) {
        pipe2x = pipe1x + 250;
    }

    if (pipe3x < -60) {
        pipe3x = pipe2x + 250;
    }


}

function drawPipe(ctx, px, py) {
    ctx.fillStyle = "#000000";

    ctx.fillRect(px,0,60,py);
    ctx.fillRect(px,py + 100,60,500);


}

function pipeCollide(px, py) {

    if (x + 40 >= px && x <= px + 60) {
        if (y <= py || y + 40 >= py + 100) {
            return true;
        }
    }
    return false;



}

function drawPlayer(ctx) {
    ctx.fillStyle = "#028";
    ctx.fillRect(x,y,40,40);
}

function draw() {

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");


    ctx.fillStyle = "#CCC";
    ctx.fillRect(0,0,500,500);

    drawPlayer(ctx);

    drawPipe(ctx, pipe1x, pipe1y);
    drawPipe(ctx, pipe2x, pipe2y);
    drawPipe(ctx, pipe3x, pipe3y);
}

function exit() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");


    ctx.fillStyle = "#C66";
    ctx.fillRect(0,0,500,500);

    drawPipe(ctx, pipe1x, pipe1y);
    drawPipe(ctx, pipe2x, pipe2y);
    drawPipe(ctx, pipe3x, pipe3y);


    drawPlayer(ctx);



}
