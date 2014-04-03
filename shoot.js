
function Shoot(_x, _y, _x_display, _y_display, _r, _idPlayer, _uniqId) {
	
	this.x = _x + (70 * Math.cos(_r));
	this.y = _y + (70 * Math.sin(_r));
	this.x_display = _x_display;
	this.y_display = _y_display;
	this.r = _r;
	this.idPlayer = _idPlayer;
	this.uniqId = _uniqId;
}
