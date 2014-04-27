var GameState = function(game) {
    this.name = 'game';
};

GameState.prototype.create = function() {
    G.setupStage();

    this.resetGame();
};

GameState.prototype.resetGame = function() {
    // Define vertical center of screen
    this.middle = G.blockHeight * 3.5;

    // Create ground
    this.createGround();

    // Create drill
    G.drill = this.game.add.sprite(G.blockWidth * 1.5, this.middle, 'drill');
    G.drill.anchor.setTo(0.5, 0.5);
    G.drill.animations.add('right', [0,1,2], 10, true);
    G.drill.animations.add('left', [3,4,5], 10, true);
    G.drill.animations.add('down', [6,7,8], 10, true);
    G.drill.animations.add('up', [9,10,11], 10, true);
    G.drill.animations.play('right');
    this.game.physics.enable(G.drill, Phaser.Physics.ARCADE);

    // Instructions
    this.showInstructions();

    // Add score
    G.depth = 0;
    G.depthText = this.game.add.text(10, 10, 'Depth: 0', { font: '24px ' + G.mainFont, fill: '#ffffff', stroke: '#4488cc', strokeThickness: 10 });
    G.depthText.fixedToCamera = true;
};

GameState.prototype.showInstructions = function() {
    var tweenTime = 500;
    var delay = 0;
    var delayIncrement = 100;
    var t;

    var instructions = this.game.add.group();
    instructions.fixedToCamera = true;

    t = this.game.add.text(0, -100, 'DIG!', { font: '60px ' + G.mainFont, fill: '#ffffff', stroke: '#4488cc', strokeThickness: 10 });
    instructions.add(t);
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 40 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'Use arrow keys to dig.', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center', stroke: '#4488cc', strokeThickness: 10 });
    instructions.add(t);
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 100 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement * 25;

    t = this.game.add.text(0, -100, 'Avoid magma!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center', stroke: '#4488cc', strokeThickness: 10 });
    instructions.add(t);
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 40 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'Avoid monsters!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center', stroke: '#4488cc', strokeThickness: 10 });
    instructions.add(t);
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 90 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;

    t = this.game.add.text(0, -100, 'GO DEEP!', { font: '40px ' + G.mainFont, fill: '#ffffff', align: 'center', stroke: '#4488cc', strokeThickness: 10 });
    instructions.add(t);
    t.updateTransform();
    t.x = this.game.width/2 - t.getBounds().width/2;
    t.alpha = 0;
    this.game.add.tween(t).to({ y: 140 }, tweenTime, Phaser.Easing.Elastic.Out, true, delay).to({ y: -100 }, tweenTime, Phaser.Easing.Cubic.In, true, tweenTime*3);
    this.game.add.tween(t).to({ alpha: 1 }, tweenTime, Phaser.Easing.Sinusoidal.InOut, true, delay);
    delay += delayIncrement;
};

GameState.prototype.update = function() {
    // Update score
    G.depthText.setText('Depth: ' + G.depth);

    // Move
    if (!this.game.tweens.isTweening(G.drill)) {
        if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT) && G.drill.x > G.blockWidth/2) {
            this.game.add.tween(G.drill).to({ x: G.drill.x - G.blockWidth }, G.drillMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true);
            G.drill.animations.play('left');
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && G.drill.x < this.game.width - G.blockWidth/2) {
            this.game.add.tween(G.drill).to({ x: G.drill.x + G.blockWidth }, G.drillMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true);
            G.drill.animations.play('right');
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.game.add.tween(G.drill).to({ y: G.drill.y + G.blockHeight }, G.drillMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true);
            this.addMoreGround();
            if (G.drill.y >= this.game.camera.y + this.middle) {
                this.game.add.tween(this.game.camera).to({ y: this.game.camera.y + G.blockHeight }, G.drillMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true);
            }
            G.drill.animations.play('down');
            G.depth++;
        } else if (this.input.keyboard.isDown(Phaser.Keyboard.UP) && G.depth > 0 && G.drill.y > this.game.camera.y + G.blockHeight/2) {
            this.game.add.tween(G.drill).to({ y: G.drill.y - G.blockHeight }, G.drillMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true);
            G.drill.animations.play('up');
            G.depth--;
        }
    }

    // Dig
    if (G.drill.alive) {
        G.ground.forEachAlive(function(ground) {
            if (this.game.math.distance(G.drill.x, G.drill.y, ground.x, ground.y) < G.blockWidth) {
                if (!ground.animations.getAnimation('crush').isPlaying) {
                    ground.tween = this.game.add.tween(ground).to({ alpha: 0 }, 180, Phaser.Easing.Cubic.In, true);
                    ground.animations.play('crush');
                }
            }

            if (ground.y < this.game.camera.y - G.blockHeight) {
                ground.kill();
            }
        }, this);
    }

    // Lava kills
    G.lava.forEachAlive(function(lava) {
        if (!lava.lethal) return;

        if (this.game.math.distance(G.drill.x, G.drill.y, lava.x, lava.y) < G.blockWidth/2) {
            G.drill.kill();
            this.game.time.events.add(200, function() { this.game.state.start('end'); }, this);
        }

        G.monsters.forEachAlive(function(monster) {
            if (this.game.math.distance(monster.x, monster.y, lava.x, lava.y) < G.blockWidth) {
                monster.kill();
            }
        }, this);
    }, this);

    // Monsters kill
    G.monsters.forEachAlive(function(monster) {
        if (this.game.math.distance(G.drill.x, G.drill.y, monster.x, monster.y) < G.blockWidth/2) {
            G.drill.kill();
            this.game.time.events.add(200, function() { this.game.state.start('end'); }, this);
        }
    }, this);
};

GameState.prototype.createGround = function() {
    G.groundDepth = this.middle + G.blockHeight;

    G.ground = this.game.add.group();
    G.lava = this.game.add.group();
    G.monsters = this.game.add.group();

    this.addMoreGround();
};

GameState.prototype.addMoreGround = function() {
    if (this.game.camera.y + this.game.camera.height < G.groundDepth - G.blockHeight) return;

    var x, y;
    for(x = G.blockWidth * 0.5; x < this.game.width; x += G.blockWidth) {
        for(y = G.groundDepth; y < G.groundDepth + G.blockHeight * 5; y += G.blockHeight) {
            var difficulty = 50 * this.game.camera.y/(this.game.world.height * 0.8);
            var obstacleChance = this.game.math.chanceRoll(10 + difficulty);
            if (obstacleChance && y > G.groundDepth) {
                // Randomly place obstacles based on depth
                var lavaChance = this.game.math.chanceRoll(50);
                if (lavaChance) {
                    // Place lava
                    Lava.create(this.game, x, y);
                } else {
                    // Place monster
                    Monster.create(this.game, x, y);
                }
            } else {
                // Place ground
                var ground = G.ground.getFirstDead();
                if (ground === null) {
                    ground = this.game.add.sprite(x, y, 'ground', 0, G.ground);
                    ground.anchor.setTo(0.5, 0.5);
                    var animation = ground.animations.add('crush', [0,1,2,3], 20, false);
                    animation.killOnComplete = true;
                }
                ground.reset(x, y);
                ground.frame = 0;
                ground.alpha = 1;
                ground.revive();
            }
        }
    }

    G.groundDepth = y;
};
