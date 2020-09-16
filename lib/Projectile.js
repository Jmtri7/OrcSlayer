class Projectile extends Creature {
	constructor(map, x, y, w, h, spriteSheet) {
		super(map, x, y, w, h, spriteSheet);

		this.speed = 4;

		this.hit = false;

		this.isExploding = false;

		this.isProjectile = true;

		this.canDie = true;

		this.damage = 50;
	}

	Hit(target) {
		if(target.canDie == true) {
			target.Hurt(this.damage);
		}

		this.hit = true;

		if(this.isExploding == false) {
			this.isExploding = true;

			var sound = new Audio('sounds/Explosion+3.wav');
			sound.volume = 0.3;
			sound.play();

			this.Die();
		}
	}
}