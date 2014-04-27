var DEBUG_PRELOADER = true;
if (DEBUG_PRELOADER) {
    Phaser.Loader.prototype.originalNextFile = Phaser.Loader.prototype.nextFile;

    Phaser.Loader.prototype.nextFile = function(previousIndex, success) {
        var self = this;
        window.setTimeout(function() { Phaser.Loader.prototype.originalNextFile.call(self, previousIndex, success); }, 100);
    };
}

var PreloadState = function(game) {
};

PreloadState.prototype.preload = function() {
    // Show progress bar
    preloadIcon = this.game.add.sprite(0, 0, 'preloader-icon');
    preloadIcon.y = this.game.height/2 - preloadIcon.height - 20;
    preloadIcon.x = this.game.width/2 - preloadIcon.width/2;

    preloadBg = this.game.add.sprite(0, 0, 'preloader-bg');
    preloadBg.y = this.game.height/2 - preloadBg.height/2;
    preloadBg.x = this.game.width/2 - preloadBg.width/2;

    preloadFg = this.game.add.sprite(0, 0, 'preloader-fg');
    preloadFg.y = this.game.height/2 - preloadFg.height/2;
    preloadFg.x = this.game.width/2 - preloadFg.width/2;

    this.game.load.setPreloadSprite(preloadFg);

    // Setup load callback
    this.game.load.onFileComplete.add(this.fileLoaded, this);

    // Load assets
    this.game.load.spritesheet('ground', 'assets/gfx/ground.png', 64, 64);
    this.game.load.spritesheet('drill', 'assets/gfx/drill.png', 64, 64);
    this.game.load.spritesheet('lava', 'assets/gfx/lava.png', 64, 64);
    this.game.load.spritesheet('monster', 'assets/gfx/monster.png', 64, 64);
};

PreloadState.prototype.create = function() {
    this.game.stage.backgroundColor = G.backgroundColor;

    // Delay to allow web fonts to load
    G.fadeOut(1000, G.backgroundColor);
    this.game.time.events.add(1000, function() { this.game.state.start('menu'); }, this);
};

PreloadState.prototype.update = function() {
};

PreloadState.prototype.fileLoaded = function(progress, key, success, totalLoaded, totalFiles) {
};
