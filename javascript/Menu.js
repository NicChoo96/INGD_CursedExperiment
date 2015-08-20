var TopDownGame = TopDownGame || {};
var showInstruction = false;
var instructionPage = 0;
var mainMenu;
var instructionImage;

//Title screen
TopDownGame.Menu = function () {
};

TopDownGame.Menu.prototype = {

    create: function () {
		mainMenu = this.game.add.sprite(0, 0, 'menu');
		mainMenu.scale.setTo(1.8,1.5);
	},

    update: function () {
		if(!showInstruction){
			this.game.input.keyboard.onDownCallback = function(e) {
				//When Z key is pressed
				if(e.keyCode == 90){
					//Increment of instruction page
					instructionPage++;
					if(!showInstruction){
						showInstruction = true;
						instructionPage++;
						mainMenu.loadTexture('page' + instructionPage);
						mainMenu.scale.setTo(1.9,1.65);
					}
					if(showInstruction && instructionPage < 9){
						if(instructionPage == 2 || instructionPage == 4 || instructionPage == 6 || instructionPage == 8){
							mainMenu.loadTexture('page' + instructionPage);
							mainMenu.scale.setTo(1.9,1.65);
						}
					}
					if(instructionPage == 9){
						TopDownGame.game.state.start('Game');
					}
				}
			}
		}
	}
}

    
