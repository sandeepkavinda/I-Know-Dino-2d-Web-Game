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
    // alert(keyCode);

    if (keyCode == 13) {
        if (dinoRunAnimationId == 0 & dinoJumpAnimationId == 0) {
            clearInterval(dinoIdleAnimationId);
            dinoRunAnimationId = setInterval(dinoRunAnimation, 60);
        }
        if (backgroundMoveAnimationId == 0) {
            backgroundMoveAnimationId = setInterval(backgroundMoveAnimation, 40);

        }
        if (obsticalAnimationId == 0) {
            obsticalAnimationId = setInterval(obsticalAnimation, 40);
        }
    }
    if (keyCode == 32) {

        if (dinoJumpAnimationId == 0) {
            clearInterval(dinoIdleAnimationId);
            dinoIdleAnimationId = 0;
            dinoIdelImageNumber = 0;
            clearInterval(dinoRunAnimationId);
            dinoRunAnimationId = 0;
            dinoRunImageNumber = 0;
            dinoJumpAnimationId = setInterval(dinoJumpAnimation, 60);
        }

    }

}


// ========== Dino Run Animation ==========

var dinoRunImageNumber = 1;
var dinoRunAnimationId = 0;

function dinoRunAnimation() {
    dinoRunImageNumber = dinoRunImageNumber + 1;
    var dinoImage = document.getElementById("dinoImage");
    dinoImage.src = "./Img/Run (" + dinoRunImageNumber + ").png";

    if (dinoRunImageNumber == 8) {
        dinoRunImageNumber = 0;
    }

}


// ========== Background Move Animation ==========

var backgroundMoveAnimationId = 0;
var backgroundPostion = 0;

function backgroundMoveAnimation() {
    backgroundPostion = backgroundPostion - 20;
    var background = document.getElementById("fullScreenDiv");
    background.style.backgroundPosition = "left " + backgroundPostion + "px bottom";
}


// ========== Dino Jump Animation ==========

var dinoJumpAnimationId = 0;
var dinoJumpImageNumber = 0;
var dinoMarginBottom = 15.5;

function dinoJumpAnimation() {

    dinoJumpImageNumber = dinoJumpImageNumber + 1;
    var dinoImage = document.getElementById("dinoImage");
    dinoImage.src = "Img/Jump (" + dinoJumpImageNumber + ").png";

    if (dinoJumpImageNumber <= 6) {
        dinoMarginBottom = dinoMarginBottom + 5;
        dinoImage.style.marginBottom = dinoMarginBottom + "vh";
    } else {
        dinoMarginBottom = dinoMarginBottom - 5;
        dinoImage.style.marginBottom = dinoMarginBottom + "vh";
    }


    if (dinoJumpImageNumber == 12) {
        clearInterval(dinoJumpAnimationId);
        dinoJumpImageNumber = 0;
        dinoJumpAnimationId = 0;

        if (dinoRunAnimationId == 0 & dinoJumpAnimationId == 0) {
            clearInterval(dinoIdleAnimationId);
            dinoRunAnimationId = setInterval(dinoRunAnimation, 60);
        }

        if (backgroundMoveAnimationId == 0) {
            backgroundMoveAnimationId = setInterval(backgroundMoveAnimation, 40);

        }
        if (obsticalAnimationId == 0) {
            obsticalAnimationId = setInterval(obsticalAnimation, 40);
        }



    }
}

// ========== Create Obsticals And Obstical Animation ==========

var obstaclesDivMarginLeft = 2000;

function createObsticals() {

    for (var x = 1; x <= 100; x++) {
        var fullScreenDiv = document.getElementById("fullScreenDiv");
        var createdDiv = document.createElement("div");
        createdDiv.className = "obstaclesDiv";
        fullScreenDiv.appendChild(createdDiv);
        createdDiv.id = "obstical" + x;
        createdDiv.style.marginLeft = obstaclesDivMarginLeft + "px";

        let randomNumber = Math.floor((Math.random() * 100) + 1);
        if (randomNumber <= 10) {
            obstaclesDivMarginLeft = obstaclesDivMarginLeft + 300;
        }

        if (randomNumber > 10 & randomNumber <= 50) {
            obstaclesDivMarginLeft = obstaclesDivMarginLeft + 600;
        }

        if (randomNumber > 50 & randomNumber <= 75) {
            obstaclesDivMarginLeft = obstaclesDivMarginLeft + 800;
        }
        if (randomNumber > 75 & randomNumber <= 100) {
            obstaclesDivMarginLeft = obstaclesDivMarginLeft + 1000;
        }

        // obstaclesDivMarginLeft = obstaclesDivMarginLeft + 1000;

    }


}

var obsticalAnimationId = 0;

function obsticalAnimation() {
    for (var x = 1; x <= 100; x++) {
        var obsticalId = document.getElementById("obstical" + x);
        var currentMarginLeft = getComputedStyle(obsticalId).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        obsticalId.style.marginLeft = newMarginLeft + "px";
        // alert(newMarginLeft);

        if (newMarginLeft < 640 & newMarginLeft > 540) {

            if (dinoMarginBottom < 25.5) {
                dinoJumpAnimationId = -1;
                clearInterval(dinoJumpAnimationId);
                clearInterval(dinoRunAnimationId);
                clearInterval(backgroundMoveAnimationId);
                clearInterval(dinoIdelImageNumber);
                clearInterval(obsticalAnimationId);
                document.getElementById("dinoImage").style.marginBottom = "15.5vh"

                if (dinoDeadAnimationId == 0) {
                    dinoDeadAnimationId = setInterval(dinoDeadAnimation, 60);

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

    }
}

