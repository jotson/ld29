var Monster = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'monster');

    this.anchor.setTo(0.5, 0.5);

    this.animations.add('default', [0,1,2], 10, true);
    this.animations.play('default');
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {
    if (!this.alive) return;

    if (this.y < this.game.camera.y - G.blockHeight) this.kill();

    if (!this.game.tweens.isTweening(this)) {
        canMoveRight = true;
        canMoveLeft = true;
        canMoveDown = true;
        canMoveUp = true;

        G.ground.forEachAlive(function(ground) {
            if (ground.y == this.y && ground.x == this.x + G.blockWidth) canMoveRight = false;
            if (ground.y == this.y && ground.x == this.x - G.blockWidth) canMoveLeft = false;
            if (ground.x == this.x && ground.y == this.y + G.blockHeight) canMoveDown = false;
            if (ground.x == this.x && ground.y == this.y - G.blockHeight) canMoveUp = false;
        }, this);

        G.lava.forEachAlive(function(lava) {
            if (lava.y == this.y && lava.x == this.x + G.blockWidth) canMoveRight = false;
            if (lava.y == this.y && lava.x == this.x - G.blockWidth) canMoveLeft = false;
            if (lava.x == this.x && lava.y == this.y + G.blockHeight) canMoveDown = false;
            if (lava.x == this.x && lava.y == this.y - G.blockHeight) canMoveUp = false;
        }, this);

        if (this.y <= G.blockHeight * 3.5) canMoveUp = false; // So many magic numbers!

        if (G.drill.y < this.y) {
            canMoveDown = false;
        } else if (G.drill.y > this.y) {
            canMoveUp = false;
        } else if (G.drill.y == this.y) {
            canMoveUp = false;
            canMoveDown = false;
        }
        if (G.drill.x < this.x) {
            canMoveRight = false;
        } else if (G.drill.x > this.x) {
            canMoveLeft = false;
        } else {
            canMoveRight = false;
            canMoveLeft = false;
        }

        if (canMoveRight && this.x < this.game.width - G.blockWidth/2) {
            this.game.add.tween(this).to({ x: this.x + G.blockWidth }, G.monsterMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true, G.monsterStepDelay);
        } else if (canMoveLeft && this.x > G.blockWidth/2) {
            this.game.add.tween(this).to({ x: this.x - G.blockWidth }, G.monsterMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true, G.monsterStepDelay);
        } else if (canMoveDown && this.y < this.game.camera.y + this.game.camera.height) {
            this.game.add.tween(this).to({ y: this.y + G.blockHeight }, G.monsterMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true, G.monsterStepDelay);
        } else if (canMoveUp && this.y > this.game.camera.y) {
            this.game.add.tween(this).to({ y: this.y - G.blockHeight }, G.monsterMoveSpeed, Phaser.Easing.Sinusoidal.InOut, true, G.monsterStepDelay);
        }
    }
};

Monster.create = function(game, x, y) {
    var monster;
    monster = G.monsters.getFirstDead();
    if (monster === null) {
        monster = G.monsters.add(new Monster(game, x, y));
    }
    monster.reset(x, y);
    monster.revive();
    monster.animations.play('default');

    return monster;
};
