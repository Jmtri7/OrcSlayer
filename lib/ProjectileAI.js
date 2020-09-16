class ProjectileAI extends AI {
	constructor(entity, direction) {
		super(entity);
		this.direction = direction;
	}

	Control() {
		if(this.entity.hit == true) {
			//this.entity.Hit();
		} else {
			this.entity.Move(this.direction);
		}
	}
}