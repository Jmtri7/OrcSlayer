class GameMap {
	constructor(game, mapData, width, height) {
		this.game = game;

		this.border = new Hitbox(0, 0, width, height);

		this.entity = [];
		this.AI = [];
	}

	SortEntities() {
		// sorts by the center of the entities height
		this.entity.sort(function(e1, e2){return (2 * e1.y + e1.h) / 2 - (2 * e2.y + e2.h) / 2;});
	}

	AddProjectile(x, y, w, h, direction, spriteSheet) {
		var newEntity = new Projectile(this, x, y, w, h, spriteSheet);

		var newAI = new ProjectileAI(newEntity, direction);
		this.AI.push(newAI);

		this.entity.push(newEntity);

		return newEntity;
	}

	AddObstacle(x, y, w, h, spriteSheet) {
		var newEntity = new Entity(this, x, y, w, h, spriteSheet);

		newEntity.sprite.SetColSequence([0]);
		newEntity.facing = 0;

		this.entity.push(newEntity);

		return newEntity;
	}

	AddNPC(x, y, w, h, spriteSheet) {
		var newEntity = new Creature(this, x, y, w, h, spriteSheet);

		var newAI = new AI(newEntity);
		this.AI.push(newAI);

		this.entity.push(newEntity);

		return newEntity;
	}

	AddEntity(x, y, w, h, spriteSheet) {
		var newEntity = new Creature(this, x, y, w, h, spriteSheet);
		
		this.entity.push(newEntity);

		return newEntity;
	}
}