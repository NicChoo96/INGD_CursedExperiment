var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(960, 832, Phaser.AUTO, '');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Menu', TopDownGame.Menu);
TopDownGame.game.state.add('CutScene', TopDownGame.CutScene);
TopDownGame.game.state.add('Win', TopDownGame.Win);
TopDownGame.game.state.add('Game', TopDownGame.Game);
TopDownGame.game.state.add('Scene', TopDownGame.Scene);

TopDownGame.game.state.start('Boot');