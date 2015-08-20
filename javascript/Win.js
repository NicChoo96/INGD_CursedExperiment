var TopDownGame = TopDownGame || {};
var showInstruction = false;
var instructionPage = 0;
var mainMenu;
var instructionImage;

//Title screen
TopDownGame.Win = function () {
};

TopDownGame.Win.prototype = {

    create: function () {
		var winImage = this.game.add.sprite(0, 0, 'winImage');
		winImage.scale.setTo(1.8,1.5);
	},

    update: function () {
		this.game.input.keyboard.onDownCallback = function(e) {
			//When R key is pressed
			if(e.keyCode == 71){
				TopDownGame.game.state.start('Menu');
			}
		}
	}
}

    
