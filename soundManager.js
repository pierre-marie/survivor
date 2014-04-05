var SoundManager = function() {
	var sm = this;

	var s_background;
	var s_shoot;

	sm.load = function() {
		s_background = new Audio();
		var src1  = document.createElement("source");
		src1.type = "audio/mpeg";
		src1.src  = "./sounds/background.mp3";
		s_background.appendChild(src1);

		s_shoot = new Audio();
		var src2  = document.createElement("source");
		src2.type = "audio/mpeg";
		src2.src  = "./sounds/shoot.mp3";
		s_shoot.appendChild(src2);
	};
}
