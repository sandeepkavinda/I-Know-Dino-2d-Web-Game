var backgroundMusic = new Audio("Sounds/backgroundMusic.mp3");
backgroundMusic.loop = true;
var deadSound = new Audio("Sounds/dead.mp3");
var jumpSound = new Audio("Sounds/jump.mp3");

var dinoIdelImageNumber = 1;
var dinoIdleAnimationId = 0;

function startDinoIdle() {
    dinoIdleAnimationId = setInterval(dinoIdleAnimation, 100);
}

function dinoIdleAnimation() {
    dinoIdelImageNumber = dinoIdelImageNumber + 1;
    var dinoImage = document.getElementById("dinoImage");
    dinoImage.src = "./Img/Idle (" + dinoIdelImageNumber + ").png";
    if (dinoIdelImageNumber == 10) {
        dinoIdelImageNumber = 0;
    }
}

function animationControler(event) {
    var keyCode = event.which;
    //Enter
    if (keyCode == 13) {
        clearInterval(dinoIdleAnimationId);
        dinoJumpAnimationId = 0;
        document.getElementById("startMessegeDiv").style.display = "none";

        if (dinoRunAnimationId == 0) {
            backgroundMusic.play();
            dinoRunAnimationId = setInterval(dinoRunAnimation, 60);
        }

        if (backgroundMoveAnimationId == 0) {
            backgroundMoveAnimationId = setInterval(backgroundMoveAnimation, 60);
        }

        if (obsticalAnimationId == 0) {
            obsticalAnimationId = setInterval(obsticalAnimation, 60);
        }
    }

    //Space
    if (keyCode == 32) {

        if (dinoJumpAnimationId == 0) {
            clearInterval(dinoRunAnimationId);
            jumpSound.play();
            dinoJumpAnimationId = setInterval(dinoJumpAnimation, 60);

        }

    }

}

// ========== Dino Run Animation ==========

var dinoRunImageNumber = 0;
var dinoRunAnimationId = 0;

function dinoRunAnimation() {


    dinoRunImageNumber = dinoRunImageNumber + 1;
    var dinoImage = document.getElementById("dinoImage");
    dinoImage.src = "./Img/Run (" + dinoRunImageNumber + ").png";
    dinoJumpAnimationId = 0;
    if (dinoRunImageNumber == 8) {
        dinoRunImageNumber = 0;
    }

}

// ========== Background Move Animation ==========

var backgroundMoveAnimationId = 0;
var backgroundPostion = 0;
var score = 0;

function backgroundMoveAnimation() {
    score = score + 1;
    document.getElementById("scoreBoard").innerHTML = score;

    backgroundPostion = backgroundPostion - 35;
    var background = document.getElementById("fullScreenDiv");
    background.style.backgroundPositionX = backgroundPostion + "px";
}

// ========== Dino Jump Animation ==========

var dinoJumpAnimationId = -1;
var dinoJumpImageNumber = 0;
var dinoMarginTop = 467;

function dinoJumpAnimation() {
    clearInterval(dinoIdleAnimationId);
    dinoJumpImageNumber = dinoJumpImageNumber + 1;
    var dinoImage = document.getElementById("dinoImage");
    dinoImage.src = "Img/Jump (" + dinoJumpImageNumber + ").png";

    if (dinoJumpImageNumber <= 6) {
        dinoMarginTop = dinoMarginTop - 40;
        dinoImage.style.marginTop = dinoMarginTop + "px";
    }

    if (dinoJumpImageNumber > 6) {
        dinoMarginTop = dinoMarginTop + 40;
        dinoImage.style.marginTop = dinoMarginTop + "px";
    }

    if (dinoJumpImageNumber == 12) {
        jumpSound.pause();
        jumpSound.currentTime = 0;
        clearInterval(dinoJumpAnimationId);
        dinoRunAnimationId = 0;
        dinoRunImageNumber = 0;

        if (dinoRunAnimationId == 0) {
            dinoRunAnimationId = setInterval(dinoRunAnimation, 60);
        }
        if (backgroundMoveAnimationId == 0) {
            backgroundMoveAnimationId = setInterval(backgroundMoveAnimation, 60);
        }

        if (obsticalAnimationId == 0) {
            obsticalAnimationId = setInterval(obsticalAnimation, 60);
        }

        dinoJumpImageNumber = 0;

    }

}


// ========== Create Obsticals ==========

var createdBoxesMarginLeft = 3000;

function createObsticals() {

    for (var x = 1; x <= 200; x++) {
        var fullScreenDiv = document.getElementById("fullScreenDiv");
        var createdBoxes = document.createElement("div");
        createdBoxes.className = "obstaclesDiv";
        fullScreenDiv.appendChild(createdBoxes);
        var boxId = createdBoxes.id = "box" + x;
        createdBoxes.style.marginLeft = createdBoxesMarginLeft + "px";

        if (x < 100) {
            let randomNumber = Math.floor((Math.random() * 100) + 1);
            if (randomNumber <= 10) {
                createdBoxesMarginLeft = createdBoxesMarginLeft + 500;
            }

            if (randomNumber > 10 & randomNumber <= 50) {
                createdBoxesMarginLeft = createdBoxesMarginLeft + 800;
            }

            if (randomNumber > 50 & randomNumber <= 75) {
                createdBoxesMarginLeft = createdBoxesMarginLeft + 1500;
            }
            if (randomNumber > 75 & randomNumber <= 100) {
                createdBoxesMarginLeft = createdBoxesMarginLeft + 1000;
            }
        }


        if (x > 100) {
            createdBoxesMarginLeft = createdBoxesMarginLeft + 600;

        }
    }
}


// ========== Obsticals Animation ==========

var obsticalAnimationId = 0;

function obsticalAnimation() {
    for (var x = 1; x <= 200; x++) {
        var box = document.getElementById("box" + x);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 35;
        box.style.marginLeft = newMarginLeft + "px";
        // alert(newMarginLeft);

        if (newMarginLeft < 635 & newMarginLeft > 530) {
            if (dinoMarginTop > 427) {
                dinoJumpAnimationId = -1;
                if (dinoDeadAnimationId == 0) {
                    deadSound.play();
                    dinoDeadAnimationId = setInterval(dinoDeadAnimation, 60);
                    clearInterval(dinoJumpAnimationId);
                    clearInterval(dinoRunAnimationId);
                    clearInterval(backgroundMoveAnimationId);
                    clearInterval(obsticalAnimationId);
                    backgroundMusic.pause();
                }
            }
        }
    }
}



// ========== Dino Dead Animation ==========


var dinoDeadImageNumber = 0;
var dinoDeadAnimationId = 0;

function dinoDeadAnimation() {
    dinoDeadImageNumber = dinoDeadImageNumber + 1;
    var dinoImage = document.getElementById("dinoImage");
    dinoImage.src = "Img/Dead (" + dinoDeadImageNumber + ").png";
    if (dinoDeadImageNumber == 8) {
        clearInterval(dinoDeadAnimationId);
        gameOverDiv();

    }
}

// ========== Game Over Messege ==========


function gameOverDiv() {
    var endScoreBoard = document.getElementById("endScoreBoard");
    var endMessegeMainDiv = document.getElementById("endMessegeMainDiv");
    endScoreBoard.innerHTML = score;
    endMessegeMainDiv.style.display = "flex";

}


// ========== Try Again Button ==========

function gameTryAgain() {
    location.reload();
}

// ========== Home Button ==========

function gameHomePage() {
    window.location.href = "../homePage/homePage.html";

}