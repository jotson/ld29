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
    t = this.game.add.text(0, -100, 'DIG!', { font: '60px ' + G.mainFont, fill: '#ffffff' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 40 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'Use arrow keys to dig.', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 100 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement * 25;

    t = this.game.add.text(0, -100, 'Avoid magma!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 40 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'Avoid monsters!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 90 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'GO DEEP!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center' });
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 140 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    // Create drill
    G.drill = this.game.add.sprite(G.blockWidth, G.blockHeight * 2.5, 'drill');
    G.drill.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(G.drill, Phaser.Physics.ARCADE);

    // Create ground
    G.ground = this.game.add.group();
    for(var x = G.blockWidth/2; x < this.game.width; x += G.blockWidth) {
        for(var y = G.blockHeight * 3.5; y < this.game.height; y += G.blockHeight) {
            var ground = this.game.add.image(x, y, 'ground', 0, G.ground);
            ground.anchor.setTo(0.5, 0.5);
        }
    }

    // Add score
    G.depth = 0;
    G.depthText = this.game.add.text(10, 10, 'Depth: 0', { font: '24px ' + G.mainFont, fill: '#ffffff' });
};

GameState.prototype.update = function() {
    // Update score
    G.depthText.setText('Depth: ' + G.depth);

    // Move
    G.drill.body.velocity.setTo(0, 0);
    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        G.drill.body.velocity.x = -50;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        G.drill.body.velocity.x = 50;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        G.drill.body.velocity.y = 50;
    } else if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        G.drill.body.velocity.y = -50;
    }
};
