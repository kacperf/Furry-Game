document.addEventListener("DOMContentLoaded", function() {
    var Game = require("./game");

    var game = new Game();
    // game.showFurry();
    // game.showCoin();
    game.startGame(); // test set interval wyżej w komentarzu
    // game.moveFurry();
    // game.checkCoinCollision();
    game.gameOver();



});

