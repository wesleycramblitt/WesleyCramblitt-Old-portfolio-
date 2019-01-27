//////Global variables/////////////////////////////////////////
var canvas = window.document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var vx = 220; // vegeta's x position
var vy = 220; // vegeta's y position
var velocity = 0; //Velocity of background
var start = false; //start game
var background = null
var teleport = null;
var powerup = null;
var flying = null;
var powerlevel = 200;
var score = 0;
var blast1Vegeta = null;
var blast1ball = null;
var poweringUpNow= false;
var powerupSoundStarted = false;
//sounds
var fxblast1 = null;
var fxstartpowerup = null;
var fxpowerup = null;
var fxteleport = null;
var theme = null;
//used for animations
var keepAnimating = false;
var frame = 0; // frame variable for all animations
var nextFunction = null;
var animationStarted = false;
var yrand = [];
var blockx = [];
	var HBl1 = 12;
	var WBl1 = 16;

//for blast animations///
var blastx = 0;
var blasty = 0;
var drawblast1 = false;
var vegetablast1 = false;
/////////////////////////////////////////////////////////////////

////window setup////////////////////////////////////////////////
window.onkeydown = keydown;
window.onkeyup = keyup;
window.onload = main;
this.load();

/////////////////////////////////////////////////////////////////

//////////////Functions//////////////////////////////////////////
function main() {
    vx = 0;
    vy = 300;
    nextFunction = startflying;
    animate(poweringup);
}

function detectCollision(x1, y1, w1, h1, x2, y2, w2, h2) {

    if (x2 > x1 + w1) { // block is outside of x boundary to the right
        return false;
    }
    if (x2 < x1 - w2)
        return false; // block is outside of x boundary to the left
    if (y2 > y1 + h1)
        return false; // block is outside of y boundary down
    if (y2 < y1 - h2)
        return false; // block is outside of y boundary up
	else{
    return true; // block touching the other block
	score += 25;}
}

//////Loading sounds and files///////////////////////////////////
function load() {
    background = new Image(1000,400);
    background.src = 'sprites/earth.gif';

    flying = new Image();
    flying.src = 'sprites/flying.png';

    powerup = new Image();
    powerup.src = 'sprites/powerup.png';

    teleport = new Image();
    teleport.src = 'sprites/horizontalspeed.png';

    blast1Vegeta = new Image();
    blast1Vegeta.src = 'sprites/blast1A.png';

    blast1ball = new Image();
    blast1ball.src = 'sprites/blast1B.png';
	
	boulder = new Image();
	boulder.src = 'sprites/boulder.png';
	

    fxstartpowerup = document.getElementById("soundStartPowerup");
    fxpowerup = document.getElementById("soundPowerup");
    fxteleport = document.getElementById("soundTeleport");
    theme = document.getElementById("theme");
    fxblast1 = document.getElementById("blast1");
    }

//////Animation functions ///////////////////////////////////////
function animate(f) {
    frame = 0;
    keepAnimating = true;
    animationStarted = false;
    window.setTimeout(f, 0);
}

function drawBackground(showStartText)
{
   
    ctx.drawImage(background, 0, 0, 1000, 400);

    if (showStartText) {
        ctx.fillStyle = "#FF0000";

        ctx.font = "30px Arial";

        ctx.fillText("Push any key to start playing!", 300, 50);
    }
    ////
}

function poweringup() {
    if (!keepAnimating) {
        fxpowerup.pause();
        animate(nextFunction);
        return;
    }
    if (frame == 2)
        frame = 0;

    this.drawBackground(true);

    ctx.drawImage(powerup, frame * 70 + 12, 0, 70, 90, vx, vy, 70, 90);
    frame += 1;
    
    window.setTimeout(poweringup, 100);

    if (!animationStarted)
    {
        animationStarted = true;
        fxstartpowerup.play();
        fxstartpowerup.onplay = function () { fxpowerup.loop = true; fxpowerup.play(); }
    }

}

function startflying() {
    if (frame == 5) {
        animate(scrolling);
        return; 
    }
    else {
        ctx.drawImage(background, background.width - Math.abs(velocity), 0, 1000, 400);
        switch (frame) {
            case 0:
                vx = 220
                vy = 220;
                ctx.drawImage(teleport, 20, 340);
                fxteleport.play();
                break;
            case 1:
                ctx.drawImage(teleport, vx, vy);
                break;
            case 2:
                theme.loop = true;
                theme.play();
                ctx.drawImage(flying, 0, 0, 30, 50, vx, vy, 30, 50);
                break;
            case 3:
                ctx.drawImage(flying, 40, 0, 30, 50, vx, vy, 30, 50);
                break;
            case 4:
                ctx.drawImage(flying, 75, 0, 33, 50, vx, vy, 33, 50);
                break;
        }
        frame += 1;
        window.setTimeout(startflying, 100);
    }

} // only called at begining

function scrolling()
{
    if (!animationStarted) {
        animationStarted = true;
        yrand = [Math.floor(Math.random() * 400),Math.floor(Math.random() * 400),Math.floor(Math.random() * 400),Math.floor(Math.random() * 400),Math.floor(Math.random() * 400)];
        block1x = [1000,1000,1000,1000,1000];
    }
    ctx.drawImage(background,velocity, 0, 1000, 400);
    ctx.drawImage(background, background.width - Math.abs(velocity), 0, 1000, 400);
	ctx.fillStyle = 'white';
	
	//Boulder 1
	var HB1 = 30;
	var WB1 = 30;
	if (blockx[0] > -20) {
	   var boulder1= ctx.drawImage(boulder, blockx[0], yrand[0], HB1, WB1);
	}
	else {
	    blockx[0] = 1000;
	    yrand[0] = Math.floor(Math.random() * 400);
	}
	
	//
	
	//Boulder 2
	if (blockx[1] > -20) {
	    var boulder2 = ctx.drawImage(boulder, blockx[1], yrand[1], 40, 40);
	}
	else {
	    blockx[1] = 1000;
	    yrand[1] = Math.floor(Math.random() * 400);
	}
	
	//
	
	//Boulder 3
	if (blockx[2] > -20) {
	   var boulder3 = ctx.drawImage(boulder, blockx[2], yrand[2], 50, 50);
	}
	else {
	    blockx[2] = 1000;
	    yrand[2] = Math.floor(Math.random() * 400);
	}
	
	//
      
	drawVegeta();
	detectCollision(blastx, blasty, WBl1, HBl1, blockx[0],yrand[0],WB1,HB1)
	
	powerbar();

    if (Math.abs(velocity) > background.width) {
        velocity = 0;
    }

    velocity -= 2;
    blockx[0] -= 2;
	blockx[1] -= 2;
    window.setTimeout(scrolling, 10);
}

function drawVegeta() {
    if (!vegetablast1 && !poweringUpNow)
        ctx.drawImage(flying, 75, 0, 33, 50, vx, vy, 33, 50);
    if (drawblast1) {
        blast1();
    }
    if (!vegetablast1 && poweringUpNow) {
        if (frame == 2)
            frame = 0;
        ctx.drawImage(powerup, frame * 70 + 12, 0, 70, 90, vx-20, vy-30, 70, 90);
        frame += 1;

        if (!powerupSoundStarted)
        {
            powerupSoundStarted = true;
            fxstartpowerup.play();
            fxstartpowerup.onplay = function () { fxpowerup.loop = true; fxpowerup.play(); }
        }
    }
}

function blast1() {

    if (vegetablast1) {
        vegetablast1 = false;
        blastx = vx + 82;
        blasty = vy + 27;

        //vegeta blast animation
        ctx.drawImage(blast1Vegeta, vx, vy, 81, 54);
        ctx.drawImage(blast1ball, blastx, blasty, WBl1, HBl1);
        fxblast1.play();
    }
    else {
        ctx.drawImage(blast1ball, blastx, blasty, WBl1, HBl1);
        blastx += 7;
        if (blastx >= 1000)
            drawblast1 = false;
    }

}

function powerbar() {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.fillRect(25, 25, 200, 25);
    ctx.strokeRect(25, 25, 200, 25);
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    ctx.fillRect(25, 25, powerlevel, 25);
    ctx.strokeRect(25, 25, powerlevel, 25);
	ctx.fillStyle = 'black';
	ctx.fillText(powerlevel, 230, 50);
	ctx.fillStyle = 'yellow';
	ctx.fillText(score, 920,390);
    if (powerlevel > 50 || powerlevel == 50) {
        ctx.fillStyle = 'red';
        ctx.fillRect(25, 25, 50, 25);
    }
    if (powerlevel > 100 || powerlevel == 100) {
        ctx.fillStyle = 'red';
        ctx.fillRect(25, 25, 100, 25);
    }
    if (powerlevel > 150 || powerlevel == 150) {
        ctx.fillStyle = 'red';
        ctx.fillRect(25, 25, 150, 25);
    }
    if (powerlevel == 200) {
        ctx.fillStyle = 'red';
        ctx.fillRect(25, 25, 200, 25);
    }
    ctx.strokeRect(25, 25, 50, 25);
    ctx.strokeRect(25, 25, 100, 25);
    ctx.strokeRect(25, 25, 150, 25);
    ctx.strokeRect(25, 25, 200, 25);
}



////////////Keyboard events ///////////////////////////////////
function keydown(event) {
    var x;
    x = event.which;
    keepAnimating = false;
    if (!poweringUpNow) {
        if (x == 38 || x == 87) //up arrow
        {
            if (vy > 0) {
                vy -= 7;
            }
        }
        if (x == 40 || x == 83) //down arrow
        {
            if (vy < 350) {
                vy += 7;
            }
        }
        if (x == 39 || x == 68) {
            //right arrow
            if (vx < 950) {
                vx += 7;
            }
        }
        if (x == 37 || x == 65) {
            //left arrow
            if (vx > 0) {
                vx -= 7;
            }
        }
    }
    if (x == 80) {//p
        if (!poweringUpNow) {
            poweringUpNow = true;

            powerupSoundStarted = false;
        }
		if (powerlevel < 200){
		    powerlevel += 1;
		}
		}
	if (x == 69){
		if (powerlevel > 0){
				powerlevel = 0;}
	}
	if (!poweringUpNow) {
	    if (x == 66) {

	        if (!drawblast1 && (powerlevel > 25 || powerlevel == 25)) {
	            powerlevel -= 25;
	            drawblast1 = true;
	            vegetablast1 = true;
	        }


	    }
	}
	if (x == 70){
		if (powerlevel > 0){
			powerlevel -= 1;}
	}
}

function keyup(event) {
    var x;
    x = event.which;
    if (x == 80) {//p
        poweringUpNow = false;
        fxpowerup.pause();
    }


}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////