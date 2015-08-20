var TopDownGame = TopDownGame || {};
var showInstruction = false;
var instructionPage = 0;
var mainMenu;
var instructionImage;

//Title screen
TopDownGame.Lose = function () {
};

TopDownGame.Lose.prototype = {

    create: function () {
		var loseImage = this.game.add.sprite(0, 0, 'loseImage');
		loseImage.scale.setTo(1.8,1.5);
	},

    update: function () {
		this.game.input.keyboard.onDownCallback = function(e) {
			//When R key is pressed
			if(e.keyCode == 82){
				TopDownGame.game.state.start('Game');
			}
		}
	}
}

    
