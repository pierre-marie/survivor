var SoundManager = function() {
	var sm = this;

	var s_background  = new Audio();
	var s_shoot  = new Audio();

	sm.load = function() {
		var src1  = document.createElement("source");
		src1.type = "audio/mpeg";
		src1.src  = "./sounds/background.mp3";
		s_background.appendChild(src1);

		var src2  = document.createElement("source");
		src2.type = "audio/mpeg";
		src2.src  = "./sounds/shoot.mp3";
		s_shoot.appendChild(src2);
	};

}
