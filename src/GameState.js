var GameState = function(game) {
    this.name = 'game';
};

GameState.prototype.create = function() {
    G.setupStage();

    this.resetGame();

    var t = this.game.add.text(0, 0, 'GAME TITLE', { font: '48px ' + G.mainFont, fill: '#ffffff' });
};

GameState.prototype.resetGame = function() {

};

GameState.prototype.update = function() {
};
