var TopDownGame = TopDownGame || {};
var isKeyPressed = false;
var isLeftPressed = false;
var isRightPressed = false;
var isDownPressed = false;
var multiplierX = 0.15;
var multiplierY = 0.15;
var speed = 150;
var possessed = false;
var possessedZombie;

//Title screen
TopDownGame.Game2 = function () {
};

TopDownGame.Game2.prototype = {

    create: function () {
        this.map = this.game.add.tilemap('level2');

        //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        this.map.addTilesetImage('Tiles2', 'gameTiles');

        //create layer
        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.blockedLayer = this.map.createLayer('blockedLayer');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 10000, true, 'blockedLayer');

        //Resize the game world to match the layer dimensions
        this.backgroundLayer.resizeWorld();
        this.blockedLayer.resizeWorld();

        this.createDoor();
        this.createOrb();
        this.createPlate();
        this.createKillPlayer();
        this.createPath();
        this.createZombieS();
        this.createZombieM();

        this.createPlayer();
    },

    createPath: function () {
        this.paths = this.game.add.group();
        this.paths.enableBody = true;

        result = this.findObjectsByType('path', this.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.items, null);
        }, this);
    },

    createDoor: function () {
        //Create door
        this.door = this.game.add.group();
        this.door.enableBody = true;
        result = this.findObjectsByType('door', this.map, 'objectsLayer');
        for (i = 0; i < result.length; i++) {
            this.createFromTiledObject(result[i], this.door, 'door');
            this.door.getChildAt(i).nameID = result[i].name;
        }
    },

    createOrb: function () {
        //Create door
        this.orb = this.game.add.group();
        this.orbA = this.game.add.group();
        this.orb.enableBody = true;
        result = this.findObjectsByType('orbD', this.map, 'objectsLayer');
        for (i = 0; i < result.length; i++) {
            this.createFromTiledObject(result[i], this.orb, 'orbD');
            this.orb.getChildAt(i).nameID = result[i].name;
        }
    },

    createKillPlayer: function () {
        this.kill = this.game.add.group();
        this.kill.enableBody = true;
        result = this.findObjectsByType('killPlayer', this.map, 'objectsLayer');
        result.forEach(function (element) {
            this.createFromTiledObject(element, this.kill, null);
        }, this);
    },

    createPlayer: function () {
        //create player
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

        //we know there is just one result
        this.player = this.game.add.sprite(result[0].x + 32, result[0].y + 96, 'Scientist', 0);
        this.game.physics.arcade.enable(this.player);

        //move player with cursor keys
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //Scale
        this.player.scale.set(-multiplierX, multiplierY);

        //Anchor
        this.player.anchor.x = 0.5;
        this.player.anchor.y = 0.5;

        //Animation
        this.player.animations.add('idleRight', [18, 19, 20, 21, 22, 23], 13, true);
        this.player.animations.add('walkRight', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 13, true);
        this.player.animations.add('idleUp', [0, 1, 2, 3, 4, 5], 13, true);
        this.player.animations.add('walkUp', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 13, true);
    },

    createZombieS: function () {
        this.zombieS = this.game.add.group();
        this.zombieS.enablebody = true;

        var result = this.findObjectsByType('zombieS', this.map, 'objectsLayer');

        for (var i = 0; result.length > i; i++) {
            //Create
            sprite = this.zombieS.create(result[i].x + 32, result[i].y + 96, 'Enemy', 0);

            this.game.physics.arcade.enable(sprite);
            //Scale
            sprite.scale.set(multiplierX, multiplierY);

            //Anchor
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            //Animation
            sprite.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 13, true);
            sprite.animations.add('idleUp', [0], 1, true);
            sprite.animations.add('idleRight', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 13, true);
            sprite.animations.add('walkRight', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 13, true);

            this.kill.forEach(function (element) {
                if (sprite.x == element.x || sprite.y == element.y) {
                    if (sprite.x > element.x) {
                        sprite.scale.set(-multiplierX, multiplierY);
                        sprite.animations.play('idleRight')
                    }
                    if (sprite.x < element.x) {
                        sprite.scale.set(multiplierX, multiplierY);
                        sprite.animations.play('idleRight')
                    }
                    if (sprite.y > element.y) {
                        sprite.animations.play('idleUp');
                    }
                    if (sprite.y < element.y) {
                        sprite.animations.play('idleRight');
                        sprite.scale.set(-multiplierX, multiplierY);
                    }
                }
            });
        }
    },

    createZombieM: function () {
        this.zombieM = this.game.add.group();
        this.zombieM.enablebody = true;

        var result = this.findObjectsByType('zombieM', this.map, 'objectsLayer');

        for (var i = 0; result.length > i; i++) {
            //Create
            sprite = this.zombieM.create(result[i].x + 32, result[i].y + 96, 'Enemy', 0);

            this.game.physics.arcade.enable(sprite);

            //Scale
            sprite.scale.set(multiplierX, multiplierY);

            //Anchor
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            //Animation
            sprite.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 13, true);
            sprite.animations.add('idleUp', [0], 1, true);
            sprite.animations.add('idleRight', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 13, true);
            sprite.animations.add('walkRight', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 13, true);
        }
    },

    createPlate: function () {
        //Create plate
        this.plateA = this.game.add.group();
        this.plate = this.game.add.group();
        this.plate.enableBody = true;
        result = this.findObjectsByType('plate', this.map, 'objectsLayer');
        for (i = 0; i < result.length; i++) {
            this.createFromTiledObject(result[i], this.plate, 'plate');
            this.plate.getChildAt(i).nameID = result[i].name;
            this.plate.getChildAt(i).isActivated = false;
        }
    },

    findObjectsByType: function (type, map, layer) {
        var result = new Array();

        map.objects[layer].forEach(function (element) {

            if (element.type === type) {
                //Phaser uses top left, Tiled bottom left so we have to adjust the y position
                //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
                //so they might not be placed in the exact pixel position as in Tiled
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },

    createFromTiledObject: function (element, group, key) {
        var sprite = group.create(element.x, element.y, key);

        sprite.scale.set(0.125, 0.125);

        if (key != null) {
            if (key.toString() != "Enemy" && key.toString() != "Hunter") {
                sprite.body.inmoveable = true;
                sprite.body.moves = false;
            }
        }

        if (key != null) {
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            sprite.x += 32;
            sprite.y += 32;
        }
        else {
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            sprite.x += 32;
            sprite.y += 96;

        }

        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function (key) {
            sprite[key] = element.properties[key];
        });
    },

    update: function () {
        this.setCollision();
        if (!possessed) {
            this.movePlayer();
        }
        else {
            this.moveZombie();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.possessZombie();
        }
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            console.log("H")
        }

        if (this.player.y < 256 && this.player.x < 128) {
            this.state.start('Game2');
        }

        //zombieAI();
    },

    zombieAI: function () {

    },

    movePlayer: function () {
        if (multiplierX < 0) {
            multiplierX *= -1;
        }

        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            isLeftPressed = true;
            isRightPressed = false;
            isDownPressed = false;
            isKeyPressed = true;
            this.player.body.velocity.x = -speed;
            this.player.animations.play('walkRight');
            multiplierX *= -1;
            this.player.scale.set(multiplierX, multiplierY);
        }
        else if (this.cursors.right.isDown) {
            isLeftPressed = false;
            isRightPressed = true;
            isDownPressed = false;
            isKeyPressed = true;
            this.player.body.velocity.x = speed;
            this.player.animations.play('walkRight');
            this.player.scale.set(multiplierX, multiplierY);
        }
        else if (this.cursors.up.isDown) {
            isKeyPressed = true;
            isLeftPressed = false;
            isRightPressed = false;
            isDownPressed = false;
            this.player.body.velocity.y = -speed;
            this.player.animations.play('walkUp');
            this.player.scale.set(multiplierX, multiplierY);
        }
        else if (this.cursors.down.isDown) {
            if (isLeftPressed)
                multiplierX *= -1;

            this.player.animations.play('walkRight');
            isKeyPressed = true;
            isDownPressed = true;
            this.player.body.velocity.y = speed;
            this.player.scale.set(multiplierX, multiplierY);
        }

        if (!isKeyPressed) {

            if (isLeftPressed) {
                multiplierX *= -1;
                this.player.animations.play('idleRight');
            }
            else if (isRightPressed) {
                this.player.animations.play('idleRight');
            }
            else {
                this.player.animations.play('idleUp');
            }
            if (isDownPressed && !isLeftPressed) {
                this.player.animations.play('idleRight');
            }

            this.player.scale.set(multiplierX, multiplierY);
        }

        isKeyPressed = false;
        this.game.debug.body(this.player);
    },

    setCollision: function () {
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.player, this.door);
        this.game.physics.arcade.collide(this.zombieS, this.blockedLayer);

        if (!possessed) {
            this.game.physics.arcade.overlap(this.player, this.zombieS, this.killPlayer, null, this);
        }

        if (possessed) {
            this.game.physics.arcade.overlap(this.zombieS, this.plate, this.triggerPlate, null, this);
        }
        this.game.physics.arcade.overlap(this.player, this.kill, this.killPlayer, null, this);
        this.game.physics.arcade.overlap(this.player, this.plate, this.triggerPlate, null, this);

        this.game.physics.arcade.overlap(this.zombieM, this.paths);
    },

    killPlayer: function (player, zombieS) {
        this.player.kill();
    },

    possessZombie: function () {

        this.zombieS.forEach(function (element) {
            if ((this.player.x > element.x && this.player.x - 64 < element.x) ||
                (this.player.x < element.x && this.player.x + 64 > element.x) ||
                (this.player.y > element.y && this.player.y - 64 < element.y ) ||
                (this.player.y < element.y && this.player.y + 64 > element.y)) {
                possessed = true;
                possessedZombie = element;
            }
        }, this);
    },

    moveZombie: function () {
        if (multiplierX < 0) {
            multiplierX *= -1;
        }

        possessedZombie.body.velocity.x = 0;
        possessedZombie.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            isLeftPressed = true;
            isRightPressed = false;
            isDownPressed = false;
            isKeyPressed = true;
            possessedZombie.body.velocity.x = -speed;
            possessedZombie.animations.play('walkRight');
            multiplierX *= -1;
            possessedZombie.scale.set(multiplierX, multiplierY);
        }
        else if (this.cursors.right.isDown) {
            isLeftPressed = false;
            isRightPressed = true;
            isDownPressed = false;
            isKeyPressed = true;
            possessedZombie.body.velocity.x = speed;
            possessedZombie.animations.play('walkRight');
            possessedZombie.scale.set(multiplierX, multiplierY);
        }
        else if (this.cursors.up.isDown) {
            isKeyPressed = true;
            isLeftPressed = false;
            isRightPressed = false;
            isDownPressed = false;
            possessedZombie.body.velocity.y = -speed;
            possessedZombie.animations.play('walkUp');
            possessedZombie.scale.set(multiplierX, multiplierY);
        }
        else if (this.cursors.down.isDown) {
            if (isLeftPressed)
                multiplierX *= -1;

            possessedZombie.animations.play('walkRight');
            isKeyPressed = true;
            isDownPressed = true;
            possessedZombie.body.velocity.y = speed;
            possessedZombie.scale.set(multiplierX, multiplierY);
        }

        if (!isKeyPressed) {

            if (isLeftPressed) {
                multiplierX *= -1;
                possessedZombie.animations.play('idleRight');
            }
            else if (isRightPressed) {
                possessedZombie.animations.play('idleRight');
            }
            else {
                possessedZombie.animations.play('idleUp');
            }
            if (isDownPressed && !isLeftPressed) {
                possessedZombie.animations.play('idleRight');
            }

            possessedZombie.scale.set(multiplierX, multiplierY);
        }

        isKeyPressed = false;
    }
};

var isObstacleTouched = false;

function createHunter() {
    hunter = game.add.sprite(100, 180, 'Hunter', 0);

    hunter.anchor.x = 0.5;
    hunter.anchor.y = 0.5;

    hunter.scale.set(multiplierX, multiplierY);

    hunter.animations.add('walkRight', [13, 14, 15, 16, 1718, 19, 20, 21, 22, 23], 13, true);

    hunter.animations.play('walkRight');
}

function moveHunter() {
    if (isObstacleTouched) {
        multiplierX *= -1;
    }
    hunter.scale.set(-multiplierX, multiplierY);
    hunter.body.velocity.x = -multiplierX * 100;
}

