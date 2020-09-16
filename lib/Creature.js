class Creature extends Entity {
	constructor(map, x, y, w, h, spriteSheet) {
		super(map, x, y, w, h, spriteSheet);

		this.canDie = true;

		this.isAttacking = false;

		this.castDelay = false;
		this.castDelayTimeout;
	}

	Attack() {
		if(this.isAttacking == false && this.isDead == false) {
			this.isAttacking = true;

			this.SwingWeapon();

			this.CastFireball();

			// interrupt any animation for attack
			this.sprite.Pause();
			this.sprite.SetColSequence([this.facing + 9]);
			this.sprite.SetRowSequence([2, 1, 0, 1, 2]);
			this.sprite.Play(111);

			var that = this;
			setTimeout(function() {
				that.isAttacking = false;

				// stop attack animation
				that.sprite.Pause();
				
				// set back to moving
				if(that.isMoving == true) {
					that.sprite.SetColSequence([that.facing]);
					that.sprite.SetRowSequence([1, 2]);
					that.sprite.Play(333);
				}
			}, 555);
		}
	}

	// ran into something
	Hit(target) {
		
	}

	Stop() {
		if(this.isDead == false) {
			// stop moving
			clearInterval(this.moveInterval);
			this.isMoving = false;

			// set standing animation if not attacking
			if(this.isAttacking == false) {
				this.sprite.Pause();
				this.sprite.SetColSequence([this.facing]);
				this.sprite.SetRowSequence([0]);
				this.sprite.Play(1000);
			}
		}
	}

	Move(direction) {
		if(this.isDead == false) {
			// change direction
			this.facing = direction;
			this.sprite.SetColSequence([direction]);

			if(this.isMoving == false) {
				this.isMoving = true;

				// set walk animation if not attacking
				if(this.isAttacking == false) {
					this.sprite.Pause();
					this.sprite.SetRowSequence([1, 2]);
					this.sprite.Play(333);
				}

				var that = this;
				this.moveInterval = setInterval(function() {

					// save next position to check collision
					var newX = that.x;
					var newY = that.y;
					if(that.facing == 0) {
						newY = that.y - that.speed;
					} else if(that.facing == 1) {
						newX = that.x + that.speed * Math.sqrt(2) / 2;
						newY = that.y - that.speed * Math.sqrt(2) / 2;
					} else if(that.facing == 2) {
						newX = that.x + that.speed;
					} else if(that.facing == 3) {
						newX = that.x + that.speed * Math.sqrt(2) / 2;
						newY = that.y + that.speed * Math.sqrt(2) / 2;
					} else 	if(that.facing == 4) {
						newY = that.y + that.speed;
					} else if(that.facing == 5) {
						newX = that.x - that.speed * Math.sqrt(2) / 2;
						newY = that.y + that.speed * Math.sqrt(2) / 2;
					} else if(that.facing == 6) {
						newX = that.x - that.speed;
					} else if(that.facing == 7) {
						newX = that.x - that.speed * Math.sqrt(2) / 2;
						newY = that.y - that.speed * Math.sqrt(2) / 2;
					}

					var collided = false;
					for(var i = 0; i < that.map.entity.length; i++) {
						var currentEntity = that.map.entity[i];

						if(currentEntity.DetectCollision(newX, newY, that.w, that.h) && currentEntity.GetId() != that.GetId() && !(currentEntity.isFlying != that.isFlying)) {	
							collided = true;
							that.Hit(currentEntity);
						}
					}

					if(!that.map.border.DetectCollision(newX, newY, that.w, that.h)) {
						collided = true;
						if(that.isProjectile == true) {
							that.Die();
						}
					}

					if(collided == false) {
						that.x = newX;
						that.y = newY;
					}
				}, 10);
			}
	}
}

SwingWeapon() {
	var size = 20;

		var startX = this.x;
		var startY = this.y;
		switch(this.facing) {
			case 0:
			startX += -size / 2 + this.w / 2;
			startY -= size;
			break;
			case 1:
			startX += this.w;
			startY -= size;
			break;
			case 2:
			startX += this.w;
			startY += -size / 2 + this.h / 2;
			break;
			case 3:
			startX += this.w;
			startY += this.h;
			break;
			case 4:
			startX += -size / 2 + this.w / 2;
			startY += this.h;
			break;
			case 5:
			startX -= size;
			startY += this.h;
			break;
			case 6:
			startX -= size;
			startY += -size / 2 + this.h / 2;
			break;
			case 7:
			startX -= size;
			startY -= size;
			break;
		}

		for(var i = 0; i < this.map.entity.length; i++) {
			var currentEntity = this.map.entity[i]
			if(currentEntity.DetectCollision(startX, startY, size, size)) {
				if(currentEntity.canDie == true) {
					currentEntity.Hurt(25);
				}
			}
		}
}

CastFireball() {
	if(this.castDelay == false) {
		this.castDelay = true;

		var sound = new Audio('sounds/Fireball+3.wav');
		sound.volume = 1;
		sound.play();

		var that = this;
		this.castDelayTimeout = setTimeout(function() {
			that.castDelay = false;
		}, 1000);

		var size = 50;

		var startX = this.x;
		var startY = this.y;
		switch(this.facing) {
			case 0:
			startX += -size / 2 + this.w / 2;
			startY -= size;
			break;
			case 1:
			startX += this.w;
			startY -= size;
			break;
			case 2:
			startX += this.w;
			startY += -size / 2 + this.h / 2;
			break;
			case 3:
			startX += this.w;
			startY += this.h;
			break;
			case 4:
			startX += -size / 2 + this.w / 2;
			startY += this.h;
			break;
			case 5:
			startX -= size;
			startY += this.h;
			break;
			case 6:
			startX -= size;
			startY += -size / 2 + this.h / 2;
			break;
			case 7:
			startX -= size;
			startY -= size;
			break;
		}
		this.map.AddProjectile(startX, startY, size, size, this.facing, this.map.game.imageMap.get("Firebolt"));
	}
}
}