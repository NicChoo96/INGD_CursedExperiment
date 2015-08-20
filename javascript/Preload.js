var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function () {
};

TopDownGame.Preload.prototype = {

    preload: function () {
        //load game assets
        this.load.tilemap('level', 'assets/TileMaps/Lab.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'assets/TileMaps/Street.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.image('gameTiles', 'assets/images/Tiles.png');

        this.load.image('door', 'assets/images/Door.png');

        this.load.image('plate', 'assets/images/PressurePlate.png');

        this.load.image('plateA', 'assets/images/PressurePlateA.png');
		
        this.load.image('menu', 'assets/pics/Menu.png');
		this.load.image('page2', 'assets/pics/Instruction1.png');
		this.load.image('page4', 'assets/pics/Instruction2.png');
		this.load.image('page6', 'assets/pics/Instruction3.png');
		this.load.image('page8', 'assets/pics/Instruction4.png');
        this.load.image('nextImage', 'assets/pics/NextLevel.png');
        this.load.image('winImage', 'assets/pics/Win.png');
        this.load.image('loseImage', 'assets/pics/Lose.png');

        this.load.image('orbA', 'assets/images/OrbActive.png');

        this.load.image('orbD', 'assets/images/Orb.png');
		
		this.load.audio('BGM', 'assets/AutoPlayMusic.wav');
		this.load.audio('ZombieSound', 'assets/ZombieSound.wav');
		this.load.audio('PlateSound', 'assets/PlateStep.wav');
		this.load.audio('ScreamSound', 'assets/Scream.wav');

        this.load.atlasXML('Hunter', 'assets/Characters/NewStuff/Hunter/Hunter.png',
            'assets/Characters/newStuff/Hunter/Hunter.xml', 24);
        this.load.atlasXML('Scientist', 'assets/Characters/NewStuff/Scientist/Scientist.png',
            'assets/Characters/NewStuff/Scientist/Scientist.xml', 36);
        this.load.atlasXML('Enemy', 'assets/Characters/NewStuff/Zombie/Zombie.png',
            'assets/Characters/NewStuff/Zombie/Zombie.xml');
        this.load.atlasXML('necromancer', 'assets/Characters/NewStuff/Necromancer/Necromancer.png',
            'assets/Characters/NewStuff/Necromancer/Necromancer.xml');
    },

    create: function () {
		//Change state to Menu
        this.state.start('Menu');
    }
};