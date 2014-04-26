var GameState = function(game) {
    this.name = 'game';
};

GameState.prototype.create = function() {
    G.setupStage();

    this.resetGame();
};

GameState.prototype.resetGame = function() {
    var tweenTime = 500;
    var delay = 0;
    var delayIncrement = 100;
    var t;

    // Instructions
    t = this.game.add.text(0, -100, 'DIG!', { font: '48px ' + G.mainFont, fill: '#ffffff' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 40 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*2);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'Use arrow keys.\nGO DEEP!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 90 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*2);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement * 25;

    t = this.game.add.text(0, -100, 'Avoid magma!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 40 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*2);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'Avoid monsters!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 90 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*2);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    // Create drill
    G.drill = this.game.add.sprite(G.blockWidth, G.blockHeight * 2, 'drill');

    // Create ground
    G.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += G.blockWidth) {
        for(var y = G.blockHeight * 3; y < this.game.height; y += G.blockHeight) {
            this.game.add.image(x, y, 'ground', 0, G.ground);
        }
    }
};

GameState.prototype.update = function() {
};
