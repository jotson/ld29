var G = {
    game: null,
    width: 832, /* stage width in pixels */
    height: 448, /* stage height in pixels */

    blockHeight: 64,
    blockWidth: 64,

    drillMoveSpeed: 200,

    monsterWakeupDelay: 500,
    monsterStepDelay: 200,
    monsterMoveSpeed: 200,

    sfx: {}, /* sound effects */

    depth: 0,

    backgroundColor: 0x4488cc,
    mainFont: '"Luckiest Guy"'
};

G.setupStage = function() {
    G.game.stage.backgroundColor = G.backgroundColor;

    G.game.world.setBounds(0, 0, G.game.width, 1000 * G.blockHeight);
};

G.addRectangle = function(color) {
    var rect = G.game.add.graphics(0, 0);
    rect.beginFill(color, 1);
    rect.drawRect(0, 0, G.game.width, G.game.height);
    rect.endFill();

    return rect;
};

G.fadeIn = function(length, color, delay) {
    if (delay === undefined) delay = 0;
    if (color === undefined) color = 0x000000;
    if (length === undefined) length = 500;

    var curtain = G.addRectangle(color);
    curtain.alpha = 1;
    G.game.add.tween(curtain).to({ alpha: 0 }, length, Phaser.Easing.Quadratic.In, true, delay);
};

G.fadeOut = function(length, color, delay) {
    if (delay === undefined) delay = 0;
    if (color === undefined) color = 0x000000;
    if (length === undefined) length = 500;

    var curtain = G.addRectangle(color);
    curtain.alpha = 0;
    G.game.add.tween(curtain).to({ alpha: 1 }, length, Phaser.Easing.Quadratic.In, true, delay);
};

G.shake = function() {
    var tx = G.game.camera.x + 30;
    var ty = G.game.camera.y + 30;

    var tween;
    tween = G.game.add.tween(G.game.camera)
        .to({ x: tx }, 40, Phaser.Easing.Sinusoidal.InOut, false, 0, 3, true)
        .start();

    tween = G.game.add.tween(G.game.camera)
        .to({ y: ty }, 80, Phaser.Easing.Sinusoidal.InOut, false, 0, 3, true)
        .start();
};
