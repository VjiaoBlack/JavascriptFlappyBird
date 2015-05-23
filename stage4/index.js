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

var pipe3xv = 0;
var pipe2xv = 0;
var pipe1xv = 0;

var pipe1y = 150;
var pipe2y = 200;
var pipe3y = 100;

var pipe1passed = false;
var pipe2passed = false;
var pipe3passed = false;

var points = 0;
var highscore = 0;

var key = new Array();

window.onkeyup = function(e) {
    var keyval = e.keyCode ? e.keyCode : e.which;
    key[String.fromCharCode(keyval)] = false;
}

window.onkeydown = function(e) {
    var keyval = e.keyCode ? e.keyCode : e.which;
    key[String.fromCharCode(keyval)] = true;


    if (key['P'] && !running) {
        console.log("asdfasdf\n");
        reset();
    }
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

function updateScore() {
    document.getElementById("score").innerHTML = points;


    if (points > highscore) {
        highscore = points;
    }


    document.getElementById("hiscore").innerHTML = highscore;

}

function reset() {

    points = 0;

    running = true;

    x = 100;
    y = 100;
    vy = 0;

    pipe3x = 1500;
    pipe2x = 1250;
    pipe1x = 1000;

    pipe1y = 150;
    pipe2y = 200;
    pipe3y = 100;

    pipe1xv = 0;
    pipe2xv = 0;
    pipe3xv = 0;


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

    updateScore();

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
    pipe1x -= pipe1xv;
    pipe2x -= pipe2xv;
    pipe3x -= pipe3xv;

    pipe1xv += .3;
    pipe2xv += .3;
    pipe3xv += .3;



    if (pipe1x < -60) {
        pipe1x = pipe3x + 250;
        pipe1y = Math.random()  * 100 + 100;

        pipe1passed = false;
        pipe1xv = 0;
    }

    if (pipe2x < -60) {
        pipe2x = pipe1x + 250;
        pipe2y = Math.random()  * 100 + 100;

        pipe2xv = 0;
        pipe2passed = false;
    }

    if (pipe3x < -60) {
        pipe3x = pipe2x + 250;
        pipe3y = Math.random()  * 100 + 100;

        pipe3xv = 0;
        pipe3passed = false;
    }


    if (pipe1x + 60 < 100  &&  !pipe1passed) {
        points++;
        pipe1passed = true;
    }

    if (pipe2x + 60 < 100  &&  !pipe2passed) {
        points++;
        pipe2passed = true;
    }

    if (pipe3x + 60 < 100  &&  !pipe3passed) {
        points++;
        pipe3passed = true;
    }

}

function drawPipe(ctx, px, py) {
    ctx.fillStyle = "#000000";

    ctx.fillRect(px,0,60,py);
    ctx.fillRect(px,py + 200,60,500);


}

function pipeCollide(px, py) {

    if (x + 40 >= px && x <= px + 60) {
        if (y <= py || y + 40 >= py + 200) {
            return true;
        }
    }
    return false;
}

function drawPlayer(ctx) {
    ctx.fillStyle = "#028";
    ctx.fillRect(x,y,40,40);

    // var context = document.getElementById('canvas').getContext("2d");

    // var img = new Image();
    // img.onload = function () {
    //     context.drawImage(img, x, y);
    // }
    // img.src = "flappy.png";
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
