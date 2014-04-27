var EndState = function(game) {
    this.name = 'end';
};

EndState.prototype.create = function() {
    G.setupStage();

    var tweenTime = 500;
    var delay = 0;
    var delayIncrement = 100;
    var t;

    t = this.game.add.text(0, -100, 'Game over!', { font: '60px ' + G.mainFont, fill: '#ffffff', stroke: '#4488cc', strokeThickness: 10 });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 80 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'You died at depth: ' + G.depth, { font: '40px ' + G.mainFont, fill: '#ffffff', stroke: '#4488cc', strokeThickness: 10 });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 170 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, this.game.height, 'Click to try again', { font: '40px ' + G.mainFont, fill: '#ffffff' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 300 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    this.game.input.onDown.add(function() { this.game.state.start('game'); }, this);
};

EndState.prototype.update = function() {
};
