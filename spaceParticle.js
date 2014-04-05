var SpaceParticle = function() {
	var wp = this;

	wp.x = 0;
	wp.y = 0;
	wp.z = Math.random() * 1 + 0.3;
	wp.size = 1.2;
	wp.opacity = Math.random() * 0.8 + 0.1;

	wp.update = function(bounds) {
		if(wp.x == 0 || wp.y == 0) {
			wp.x = Math.floor(Math.random() * bounds.width);
			wp.y = Math.floor(Math.random() * bounds.height);
		}

		// Wrap around screen
		//wp.x = wp.x < bounds1.x ? bounds2.x : wp.x;
		//wp.y = wp.y < bounds1.y ? bounds2.y : wp.y;
		//wp.x = wp.x > bounds2.x ? bounds1.x : wp.x;
		//wp.y = wp.y > bounds2.y ? bounds1.y : wp.y;
	};

	wp.addToLayer = function(pixiLayer) {

		// Draw circle
		//context.fillStyle = 'rgba(226,219,226,'+wp.opacity+')';
		//context.fillStyle = '#fff';
		//context.beginPath();
		//context.arc(wp.x, wp.y, this.z * this.size, 0, Math.PI*2, true);
		//context.closePath();
		//context.fill();

		var graphics = new PIXI.Graphics();
		graphics.beginFill(0x00FF00);

		graphics.drawCircle(wp.x, wp.y, this.z * this.size);

		graphics.endFill();
		pixiLayer.addChild(graphics);
	};
}
