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

    // Create ground
    G.ground = this.game.add.group();
    for(var x = G.blockWidth * 0.5; x < this.game.width; x += G.blockWidth) {
        for(var y = G.blockHeight * 3.5; y < this.game.height; y += G.blockHeight) {
            var ground = this.game.add.image(x, y, 'ground', 0, G.ground);
            ground.anchor.setTo(0.5, 0.5);
        }
    }

    // Define vertical center of screen
    this.middle = G.blockHeight * 2.5;

    // Create drill
    G.drill = this.game.add.sprite(G.blockWidth * 1.5, this.middle, 'drill');
    G.drill.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(G.drill, Phaser.Physics.ARCADE);

    // Add score
    G.depth = 0;
    G.depthText = this.game.add.text(10, 10, 'Depth: 0', { font: '24px ' + G.mainFont, fill: '#ffffff', stroke: '#4488cc', strokeThickness: 10 });
    G.depthText.fixedToCamera = true;
};

GameState.prototype.update = function() {
    // Update score
    G.depthText.setText('Depth: ' + G.depth);

    // Move
    if (!this.game.tweens.isTweening(G.drill) && !this.game.tweens.isTweening(G.ground)) {
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && G.drill.x > G.blockWidth/2) {
            this.game.add.tween(G.drill).to({ x: G.drill.x - G.blockWidth }, 200, Phaser.Easing.Sinusoidal.InOut, true);
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && G.drill.x < this.game.width - G.blockWidth/2) {
            this.game.add.tween(G.drill).to({ x: G.drill.x + G.blockWidth }, 200, Phaser.Easing.Sinusoidal.InOut, true);
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.game.add.tween(G.drill).to({ y: G.drill.y + G.blockHeight }, 200, Phaser.Easing.Sinusoidal.InOut, true);
            if (G.drill.y >= this.game.camera.y + this.middle) {
                this.game.add.tween(this.game.camera).to({ y: this.game.camera.y + G.blockHeight }, 200, Phaser.Easing.Sinusoidal.InOut, true);
            }
            G.depth++;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.UP) && G.depth > 0 && G.drill.y > this.game.camera.y + G.blockHeight/2) {
            this.game.add.tween(G.drill).to({ y: G.drill.y - G.blockHeight }, 200, Phaser.Easing.Sinusoidal.InOut, true);
            G.depth--;
        }
    }

    // Dig
    // If drill touches ground, kill the ground
};
