class CanvasController {
	constructor(canvasWidth, canvasHeight) {
		this.c = document.createElement('canvas');
		this.c.width = canvasWidth;
		this.c.height = canvasHeight;
		this.c.style.border = "1px solid";
		this.c.style.marginLeft = "calc(50% - " + canvasWidth / 2 + "px)";
		document.body.appendChild(this.c);

		this.ctx = this.c.getContext("2d");
	}

	Clear() {
		this.ctx.clearRect(0, 0, this.c.width, this.c.height);
	}

	ColorCanvas(color) {
		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.c.width, this.c.height);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}

	DrawTiles(img, mapWidth, mapHeight) {
		var padding = 0;
		for(var i = -padding; i < Math.ceil(mapWidth / 100) + padding; i++) {
			for(var j = -padding; j < Math.ceil(mapHeight / 100) + padding; j++) {
				this.DrawImage(img, 100 * i, 100 * j, 101, 101, 100, 100, 0, 0);
			}
		}
	}

	DrawHitbox(x, y, w, h) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.stroke();
	}

	DrawImage(sheet, x, y, drawWidth, drawHeight, frameWidth, frameHeight, animation, frame) {
		this.ctx.drawImage(sheet, frame * frameWidth, animation * frameHeight, frameWidth, frameHeight, x, y, drawWidth, drawHeight);
	}

	DrawSprite(sprite, x, y, drawWidth, drawHeight) {
		this.ctx.drawImage(sprite.sheet, sprite.GetX(), sprite.GetY(), sprite.width, sprite.height, x, y, drawWidth, drawHeight);
	}

	DrawEntity(currentEntity) {
		// Draws the entity twice as tall as its hitbox
		var spriteScaleFactor = 2;

		// finds the center of the hitbox
		var hitboxCenterX = currentEntity.x + currentEntity.w / 2;
		var hitboxCenterY = currentEntity.y + currentEntity.h / 2;

		// centers the sprite in the hitbox
		var spriteX = hitboxCenterX - currentEntity.w / 2 * spriteScaleFactor;
		var spriteY = currentEntity.y - currentEntity.h;
		//var spriteY = hitboxCenterY - currentEntity.hitbox.height / 2 * spriteScaleFactor;

		var spriteW = currentEntity.w * spriteScaleFactor;
		var spriteH = currentEntity.h * spriteScaleFactor;

		//this.DrawHitbox(currentEntity.x, currentEntity.y, currentEntity.w, currentEntity.h);
		this.DrawSprite(currentEntity.sprite, spriteX, spriteY, spriteW, spriteH);
		
		if(currentEntity.currentHp < 100 && currentEntity.currentHp > 0) {
			var percentFull = currentEntity.currentHp / 100;

			this.ctx.beginPath();
			this.ctx.rect(spriteX, spriteY - spriteH / 7, spriteW, spriteH / 8);
			this.ctx.fillStyle = "red";
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.rect(spriteX, spriteY - spriteH / 7, spriteW * percentFull, spriteH / 8);
			this.ctx.fillStyle = "green";
			this.ctx.fill();

		}
	}
}