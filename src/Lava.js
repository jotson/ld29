var Lava = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'lava');

    this.anchor.setTo(0.5, 0.5);

    var fillingAnim = this.animations.add('filling', [0,1,2], 3, false);
    fillingAnim.onComplete.add(function() { this.play('full'); }, this);
    this.animations.add('full', [3,4,5], 10, true);
};

Lava.prototype = Object.create(Phaser.Sprite.prototype);
Lava.prototype.constructor = Lava;

Lava.prototype.update = function() {
    if (!this.alive) return;

    if (this.y < this.game.camera.y - G.blockHeight) this.kill();

    if (this.animations.currentFrame.index == 2) this.lethal = true;

    if (this.animations.getAnimation('full').isPlaying) {
        canMoveRight = true;
        canMoveLeft = true;
        canMoveDown = true;

        G.ground.forEachAlive(function(ground) {
            if (ground.y == this.y && ground.x == this.x + G.blockWidth) canMoveRight = false;
            if (ground.y == this.y && ground.x == this.x - G.blockWidth) canMoveLeft = false;
            if (ground.x == this.x && ground.y == this.y + G.blockHeight) canMoveDown = false;
        }, this);

        G.lava.forEachAlive(function(lava) {
            if (lava.y == this.y && lava.x == this.x + G.blockWidth) canMoveRight = false;
            if (lava.y == this.y && lava.x == this.x - G.blockWidth) canMoveLeft = false;
            if (lava.x == this.x && lava.y == this.y + G.blockHeight) canMoveDown = false;
        }, this);

        if (canMoveRight && this.x < this.game.width - G.blockWidth/2) {
            Lava.create(this.game, this.x + G.blockWidth, this.y);
        }

        if (canMoveLeft && this.x > G.blockWidth/2) {
            Lava.create(this.game, this.x - G.blockWidth, this.y);
        }

        if (canMoveDown && this.y < this.game.camera.y + this.game.camera.height) {
            Lava.create(this.game, this.x, this.y + G.blockHeight);
        }
    }
};

Lava.create = function(game, x, y) {
    var lava = G.lava.getFirstDead();
    if (lava === null) {
        lava = G.lava.add(new Lava(game, x, y));
    }
    lava.reset(x, y);
    lava.lethal = false;
    lava.revive();
    lava.animations.stop();
    lava.animations.play('filling');

    return lava;
};
