var SpaceParticle = function() {
	var wp = this;

	wp.x = 0;
	wp.y = 0;
	wp.z = Math.random() * 1 + 0.3;
	wp.size = 1.5;
	wp.opacity = Math.random() * 0.8 + 0.1;

	wp.update = function(w, h) {
		if(wp.x == 0 || wp.y == 0) {
			wp.x = Math.floor(Math.random() * w);
			wp.y = Math.floor(Math.random() * h);
		}

		// Wrap around screen
		if (wp.x < 0) {
			wp.x = w;
		}
		if (wp.x > w) {
			wp.x = 0;
		}
		if (wp.y < 0) {
			wp.y = h;
		}
		if (wp.y > h) {
			wp.y = 0;
		}
	};

	wp.addToLayer = function(pixiLayer) {

		var graphics = new PIXI.Graphics();		
		graphics.beginFill(0x00FF00);
		graphics.fillAlpha = wp.opacity;
		graphics.drawCircle(wp.x, wp.y, this.z * this.size);
		graphics.endFill();
		pixiLayer.addChild(graphics);
	};
}
