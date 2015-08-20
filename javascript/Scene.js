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
var music;
var startGame = false;
var playerSpawn;
var changeH1 = true;
var changeH2 = true;
var hunterIsRight;
var ui;

//Title screen
TopDownGame.Scene = function () {
};

TopDownGame.Scene.prototype = {

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

		var music = this.game.add.audio('BGM');
		music.loopFull();
		music.play();
		
        this.createDoor();
        this.createOrb();
        this.createPlate();
        this.createKillPlayer();
        this.createPath();
        this.createZombieS();
        this.createZombieM();
        this.createHunter();
        this.createNecromancer();

        this.createPlayer();
    },

    createHunter: function () {
        this.hunter = this.game.add.group();

        this.hunter.enableBody = true;

        result = this.findObjectsByType('hunter', this.map, 'objectsLayer');

        for (var i = 0; result.length > i; i++) {
            //Create
            sprite = this.hunter.create(result[i].x + 32, result[i].y + 96, 'Hunter', 0);

            this.game.physics.arcade.enable(sprite);

            //Scale
            sprite.scale.set(multiplierX, multiplierY);

            //Anchor
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            //Animation
            sprite.animations.add('walkRight', [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 13, true);
            sprite.animations.add('attack', [13, 14, 15, 16, 17, 18, 19, 21, 21, 22, 23], 13, true);
            sprite.animations.play('walkRight');

            sprite.nameID = result[i].name;
        }
    },

    createNecromancer: function () {
        //create player
        var result = this.findObjectsByType('necromancer', this.map, 'objectsLayer');

        //we know there is just one result
        this.necromancer = this.game.add.sprite(result[0].x + 32, result[0].y + 96, 'necromancer', 0);
        this.game.physics.arcade.enable(this.necromancer);

        //Scale
        this.necromancer.scale.set(-multiplierX, multiplierY);

        //Anchor
        this.necromancer.anchor.x = 0.5;
        this.necromancer.anchor.y = 0.5;

        //Animation
        this.necromancer.animations.add('idle', [0, 1, 2, 3, 4, 5], 13, true);

        this.necromancer.animations.play('idle');
    },

    createPath: function () {
        this.paths = this.game.add.group();
        this.paths.enableBody = true;

        result = this.findObjectsByType('path', this.map, 'objectsLayer');

        for (i = 0; i < result.length; i++) {
            this.createFromTiledObject(result[i], this.paths, null);
            this.paths.getChildAt(i).nameID = result[i].name;
        }
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

        playerSpawn = result[0];

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

            sprite.body.velocity.y = speed / 2;

            sprite.animations.play('walkRight');

            this.zombieM.getChildAt(i).nameID = result[i].name;
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

    hunterCheckDistance: function () {
        for (var i = 0; i < this.hunter.length; i++) {
            for (var j = 0; j < this.paths.length; j++) {
                if (hunterIsRight) {
                    if (this.hunter.getChildAt(i).nameID + 'P1' == this.paths.getChildAt(j).nameID) {
                        if ((this.paths.getChildAt(j).x > this.player.x > this.hunter.getChildAt(i).x)
                            && this.player.y == this.hunter.getChildAt(i).y) {
                            this.hunter.getChildAt(i).animations.play('attack');
                            this.killPlayer();
                        }
                    }
                } else {
                    if (this.hunter.getChildAt(i).nameID + 'P2' == this.paths.getChildAt(j).nameID) {
                        if ((this.paths.getChildAt(j).x < this.player.x < this.hunter.getChildAt(i).x)
                            && this.player.y == this.hunter.getChildAt(i).y) {
                            this.hunter.getChildAt(i).animations.play('attack');
                            this.killPlayer();
                        }
                    }
                }
            }
        }
    },

    hunterAI: function () {
        var dist2X;
        var dist1X;

        for (var i = 0; i < this.hunter.length; i++) {
            for (var j = 0; j < this.paths.length; j++) {
                if (this.hunter.getChildAt(i).nameID + 'P1' == this.paths.getChildAt(j).nameID) {
                    dist1X = this.paths.getChildAt(j).x - this.hunter.getChildAt(i).x;
                }
                if (this.hunter.getChildAt(i).nameID + 'P2' == this.paths.getChildAt(j).nameID) {
                    dist2X = -this.paths.getChildAt(j).x + this.hunter.getChildAt(i).x;
                }
            }

            if ((this.hunter.getChildAt(i).nameID == 'H1' && changeH1)
                || (this.hunter.getChildAt(i).nameID == 'H2' && changeH2))
                if (dist1X > dist2X) {
                    this.hunter.getChildAt(i).body.velocity.x = speed / 2;
                    this.hunter.getChildAt(i).animations.play('walkRight');
                    this.hunter.getChildAt(i).scale.set(multiplierX, multiplierY);
                    //Right P1
                    hunterIsRight = true;
                } else if (dist1X < dist2X) {
                    this.hunter.getChildAt(i).body.velocity.x = -speed / 2;
                    this.hunter.getChildAt(i).animations.play('walkRight');
                    this.hunter.getChildAt(i).scale.set(-multiplierX, multiplierY);
                    //Left P2
                    hunterIsRight = false;
                }
        }
        changeH1 = false;
        changeH2 = false;
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
    },

    setCollision: function () {
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.player, this.door);
        this.game.physics.arcade.collide(this.player, this.orb);
        this.game.physics.arcade.collide(this.player, this.orbA);

        this.game.physics.arcade.collide(this.zombieS, this.blockedLayer);
        this.game.physics.arcade.collide(this.zombieS, this.orb);
        this.game.physics.arcade.collide(this.zombieS, this.orbA);
        this.game.physics.arcade.collide(this.zombieS, this.door);

        if (!possessed) {
            this.game.physics.arcade.overlap(this.player, this.zombieS, this.killPlayer, null, this);
        }

        if (possessed) {
            this.game.physics.arcade.overlap(this.zombieS, this.plate, this.triggerPlate, null, this);
        }

        this.game.physics.arcade.overlap(this.player, this.kill, this.killPlayer, null, this);
        this.game.physics.arcade.overlap(this.player, this.plate, this.triggerPlate, null, this);

        this.game.physics.arcade.overlap(this.zombieM, this.paths, this.triggerChange, null, this);
        this.game.physics.arcade.overlap(this.zombieM, this.player, this.killPlayer, null, this);

        this.game.physics.arcade.overlap(this.hunter, this.paths, this.triggerHunterChange, null, this);
		
        this.game.physics.arcade.overlap(this.hunter, this.player, this.killPlayer, null, this);
    },

    triggerHunterChange: function (hunter, paths) {
        if (hunter.nameID == 'H1') {
            changeH1 = true;
        }
        if (hunter.nameID == 'H2') {
            changeH2 = true;
        }
    },

    triggerChange: function (zombie, paths) {
        zombie.body.velocity.y *= -1;

        if (zombie.body.velocity.y > 0) {
            zombie.animations.play('walkRight');
        }
        else {
            zombie.animations.play('walkUp');
        }
    },

    triggerPlate: function (player, plate) {
        var sprite = this.plateA.create(plate.x, plate.y, 'plateA');

        this.plateA.getChildAt(this.plateA.length - 1).nameID = plate.nameID;
        this.plateA.getChildAt(this.plateA.length - 1).isActivated = true;

        sprite.scale.set(0.125, 0.125);

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        this.plate.remove(plate, true);

        for (i = 0; i < this.plateA.length; i++) {
            var plateChild = this.plateA.getChildAt(i);
            if (plateChild.nameID == 'plate1' && plateChild.isActivated) {
				var step = this.game.add.audio('PlateSound');
				step.play();
                for (j = 0; j < this.door.length; j++) {
                    if (this.door.getChildAt(j).nameID == 'door1') {
                        this.door.remove(this.door.getChildAt(j), true);
                    }
                }
            }
        }
        for (i = 0; i < this.plateA.length; i++) {
            var plateChild = this.plateA.getChildAt(i);
            if (plateChild.nameID == 'plate2' && plateChild.isActivated) {
				var step = this.game.add.audio('PlateSound');
				step.play();
                for (l = 0; l < this.orb.length; l++) {
                    if (this.orb.getChildAt(l).nameID == 'orb2') {
                        var sprite = this.orbA.create(this.orb.getChildAt(l).x, this.orb.getChildAt(l).y, 'orbA');

                        this.orbA.isActivated = true;

                        sprite.scale.set(0.125, 0.125);

                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                    }
                }
				for (j = 0; j < this.door.length; j++) {
                    if (this.door.getChildAt(j).nameID == 'door2') {
                        this.door.remove(this.door.getChildAt(j), true);
                    }
                }
				playerSpawn.x = 320;
				playerSpawn.y = 600;
				possessedZombie.kill();
				possessed = false;
            }
            if (plateChild.nameID == 'plate3' && plateChild.isActivated) {
				var step = this.game.add.audio('PlateSound');
				step.play();
				playerSpawn.x = plateChild.x;
				playerSpawn.y = plateChild.y;
                for (l = 0; l < this.orb.length; l++) {
                    if (this.orb.getChildAt(l).nameID == 'orb3') {
                        var sprite = this.orbA.create(this.orb.getChildAt(l).x, this.orb.getChildAt(l).y, 'orbA');

                        this.orbA.isActivated = true;

                        sprite.scale.set(0.125, 0.125);

                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                    }
                }
            }
            if (plateChild.nameID == 'plate4' && plateChild.isActivated) {
				var step = this.game.add.audio('PlateSound');
				step.play();
				playerSpawn.x = plateChild.x;
				playerSpawn.y = plateChild.y;
                for (l = 0; l < this.orb.length; l++) {
                    if (this.orb.getChildAt(l).nameID == 'orb4') {
                        var sprite = this.orbA.create(this.orb.getChildAt(l).x, this.orb.getChildAt(l).y, 'orbA');

                        this.orbA.isActivated = true;

                        sprite.scale.set(0.125, 0.125);

                        sprite.anchor.x = 0.5;
                        sprite.anchor.y = 0.5;
                    }
                }
            }
        }
    },

    killPlayer: function (player, zombieS) {
		var deathSound = this.game.add.audio('ScreamSound');
		deathSound.play();
        this.player.kill();
		ui = this.game.add.sprite(0, 0, 'loseImage');
		ui.scale.setTo(1.9,1.7);
    },
	
	checkWin: function(){
		var winCount = 4;
		for(i = 0; i < this.plate.length;i++){
			winCount--;
		}
		if(winCount == 4){
			TopDownGame.game.state.start('Win');
		}
	},

    possessZombie: function () {
		
        this.zombieS.forEach(function (element) {
            if (((this.player.x > element.x && this.player.x - 64 < element.x) ||
                (this.player.x < element.x && this.player.x + 64 > element.x)) &&
                ((this.player.y > element.y && this.player.y - 64 < element.y ) ||
                (this.player.y < element.y && this.player.y + 64 > element.y))) {
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
    },

    update: function () {
		this.checkWin();
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
            if(ui != null){
				ui.kill();
			}
            this.player.reset(playerSpawn.x+32, playerSpawn.y+96);
        }
		
        this.setCollision();
        if (!possessed) {
            this.movePlayer();
        }
        else {
            this.moveZombie();
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			var zombieSound = this.game.add.audio('ZombieSound');
			zombieSound.play();
            this.possessZombie();
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }

        if (!possessed) {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                this.player.reset(playerSpawn.x + 32, playerSpawn.y + 96);
            }
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.M)) {
            music.mute = true;
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            startGame = true;
        }

        if (changeH1 || changeH2)
            this.hunterAI();

        this.hunterCheckDistance();
    }
};

