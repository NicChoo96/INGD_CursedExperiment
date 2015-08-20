var TopDownGame = TopDownGame || {};

//Title screen
TopDownGame.CutScene = function () {
};

TopDownGame.CutScene.prototype = {

    create: function () {
		var nextImage = this.game.add.sprite(0, 0, 'nextImage');
		nextImage.scale.setTo(1.8,1.5);
	},

    update: function () {
		this.game.input.keyboard.onDownCallback = function(e) {
			//When R key is pressed
			if(e.keyCode == 75){
				TopDownGame.game.state.start('Scene');
			}
		}
	}
}

    
