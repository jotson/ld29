var Monster = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'monster');

    this.anchor.setTo(0.5, 0.5);

    this.animations.add('default', [0,1,2], 10, true);
    this.animations.play('default');
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {
    if (this.y < this.game.camera.y - G.blockHeight) this.kill();
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
