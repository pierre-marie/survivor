
function Shoot(_x, _y, _r, _idPlayer, _uniqId) {
	
	this.x = _x + 10 * Math.cos(_r);
	this.y = _y + 10 * Math.sin(_r);
	this.r = _r;
	this.idPlayer = _idPlayer;
	this.uniqId = _uniqId;
}