var MenuState = function(game) {
    this.name = 'menu';
};

MenuState.prototype.create = function() {
    G.setupStage();

    this.addTitles();

    this.game.input.onDown.add(function() { this.game.state.start('game'); }, this);
};

MenuState.prototype.addTitles = function() {
    var t;

    var delay = 500;
    var tweenTime = 750;
    var delayIncrement = 100;

    t = this.game.add.text(0, -100, 'Infinite Dig Dug', { font: '48px ' + G.mainFont, fill: '#ffffff' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 100 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'by John Watson', { font: '24px ' + G.mainFont, fill: '#ffffff' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 150 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'Made for Ludum Dare 29 #ld48\nApril 25-28, 2014', { font: '24px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 200 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, this.game.height, 'Click to start', { font: '40px ' + G.mainFont, fill: '#ffffff' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 300 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;
};

MenuState.prototype.update = function() {
};
