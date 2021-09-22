class Hitbox {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	DetectCollision(x, y, w, h) {
		if(this.x < x + w && this.x + this.w > x && this.y < y + h && this.y + this.h > y) {
			return true;
		}

		return false;
	}
}
