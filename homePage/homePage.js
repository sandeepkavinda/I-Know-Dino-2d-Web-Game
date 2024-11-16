var homeRunImageNumber = 0;
var homeRunImageMarginLeft = -400;

function startAnimation() {
    setInterval(homeRunAnimation, 40);
}

function homeRunAnimation() {
    homeRunImageNumber = homeRunImageNumber + 1;
    homeRunImageMarginLeft = homeRunImageMarginLeft + 8;
    var dinoImage = document.getElementById("dinoImage");
    dinoImage.src = "./Img/walk (" + homeRunImageNumber + ").png";
    dinoImage.style.marginLeft = homeRunImageMarginLeft + "px";
    if (homeRunImageNumber == 10) {
        homeRunImageNumber = 0;
    }

    if (homeRunImageMarginLeft == 1400) {
        homeRunImageMarginLeft = -400;
    }
}

function gamePageReload() {
    window.location.href = "../Game/game.html";
}
