var introSound = new Audio("Sounds/introSound.mp3");

var dinoAnimationId = 0;
var dinoRunImageNumber = 1;
var dinoLeft = -120;

function start() {

    dinoAnimationId = setInterval(dinoAnimation, 20);
}

function dinoAnimation() {
    dinoRunImageNumber = dinoRunImageNumber + 1;
    var dinoImage = document.getElementById("dino1");
    dinoImage.src = "./Img/Run (" + dinoRunImageNumber + ").png";

    if (dinoRunImageNumber == 8) {
        dinoRunImageNumber = 0;
    }

    dinoLeft = dinoLeft + 20;
    dinoImage.style.left = "" + dinoLeft + "px";

    if (dinoLeft == 1400) {
        introSound.play();
        clearInterval(dinoAnimationId);
    }

}



function homePageReload() {
    window.location.href = "homePage/homePage.html";
}
