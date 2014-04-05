var SoundManager = function() {
	var sm = this;

	var sm.s_background;
	var sm.s_shoot = new Audio();

	sm.load = function() {
		this.s_background = = new Audio();
		var src1  = document.createElement("source");
		src1.type = "audio/mpeg";
		src1.src  = "./sounds/background.mp3";
		this.s_background.appendChild(src1);

		this.s_shoot = = new Audio();
		var src2  = document.createElement("source");
		src2.type = "audio/mpeg";
		src2.src  = "./sounds/shoot.mp3";
		this.s_shoot.appendChild(src2);
	};
}
