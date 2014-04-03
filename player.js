
function Player(_x, _y, _r, _picture, _name, _idPlayer) {

	this.timeAlive = 0;
	this.x_center = _x;
	this.y_center = _y;
	this.x = _x;
	this.y = _y;
	this.r = _r;
	this.picture = _picture;
	this.name = _name;
	this.idPlayer = _idPlayer;
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.space = false;
	this.b = false;
	this.n = false;
}
