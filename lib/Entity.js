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

class Entity extends Hitbox {
	constructor(map, x, y, w, h, spriteSheet) {
		super(x, y, w, h);

		this.map = map;
		this.sprite = new Sprite(spriteSheet);
		this.sprite.SetColSequence([4]);
		this.facing = 4;

		this.isMoving = false;
		this.speed = 2.5;

		this.maxHp = 100;
		this.currentHp = 100;
		this.canDie = false;
		this.isDead = false;

		this.isFlying = false;
		this.isProjectile = false;

		this.moveInterval;
	}

	GetId() {
		return this.map.entity.indexOf(this);
	}

	Hurt(dmg) {
		if(this.isProjectile == false) {
			this.currentHp -= dmg;
			if(this.currentHp <= 0) {
				this.Die();
			}
		}
	}

	Die() {
		if(this.isDead == false) {
			this.Stop();

			this.isDead = true;

			var deathDelay = 333;

			this.sprite.Pause(); 
			this.sprite.SetColSequence([8]);
			this.sprite.SetRowSequence([0, 1, 2]);
			this.sprite.Play(deathDelay / 3);

			var that = this;
			setTimeout(function() {
				var id = that.map.entity.indexOf(that);
				delete that.map.entity[id];
				that.map.entity.splice(id, 1);
			}, deathDelay);
		}
	}
}
