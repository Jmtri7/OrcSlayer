class Game {
	constructor(canvasWidth, canvasHeight) {
		this.canvasController = new CanvasController(canvasWidth, canvasHeight);

		this.imageLoader = new ImageLoader();
		this.imageMap = new Map();

		this.player;
		this.playerController;

		this.currentMap;
	}

	Start() {
		this.currentMap = this.LoadMap(map1);

		var that = this;
		setInterval(function() {
			that.currentMap.SortEntities();
			that.Draw(that.player.x + that.player.w / 2, that.player.y + that.player.h / 2);
		}, 10);

		var that = this;
		setInterval(function() {
			that.playerController.Control();
			for(var i = 0; i < that.currentMap.AI.length; i++) {
				that.currentMap.AI[i].Control();
			}
		}, 10);
	}

	LoadGraphic(name, width, height) {
		// load image
		var newImage = this.imageLoader.LoadImage("img/" + name + ".png");
		// create spritesheet
		var newSpriteSheet = new SpriteSheet(newImage, width, height);
		// add to image map
		this.imageMap.set(name, newSpriteSheet);	
	}

	LoadMap(mapData) {
		var music = new Audio('music/' + mapData.music);
		music.volume = 0.5;
		music.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
		music.play();

		for(var i = 0; i < mapData.sprites.length; i++) {
			this.LoadGraphic(mapData.sprites[i][0], mapData.sprites[i][1], mapData.sprites[i][2]);
		}

		var newMap = new GameMap(this, mapData, mapData.size[0], mapData.size[1]);

		for(var i = 0; i < mapData.obstacles.length; i++) {
			var obstacleData = mapData.obstacles[i];
			newMap.AddObstacle(obstacleData[1], obstacleData[2], obstacleData[3], obstacleData[4], this.imageMap.get(obstacleData[0]));
		}

		var playerData = mapData.player;
		this.player = newMap.AddEntity(playerData[1], playerData[2], playerData[3], playerData[4], this.imageMap.get(playerData[0]));
		this.playerController = new PlayerController(this.player);

		for(var i = 0; i < mapData.entities.length; i++) {
			var entityData = mapData.entities[i];
			newMap.AddNPC(entityData[1], entityData[2], entityData[3], entityData[4], this.imageMap.get(entityData[0]));
		}

		return newMap;
	}

	Draw(x, y) {
		var CC = this.canvasController;

		CC.Clear();
		CC.ColorCanvas("black");

		CC.ctx.translate(-x + CC.c.width / 2, -y + CC.c.height / 2); // center on player

		CC.DrawTiles(this.imageMap.get("Grass2").img, this.currentMap.border.w, this.currentMap.border.h);

		for(var i = 0; i < this.currentMap.entity.length; i++) {
			var currentEntity = this.currentMap.entity[i];

			if(currentEntity.y > this.player.y
				&& currentEntity.y - currentEntity.h < this.player.y
				&& this.player.x > currentEntity.x
				&& this.player.x + this.player.w < currentEntity.x + currentEntity.w
			) {
				CC.ctx.globalAlpha = 0.4;
			}

			CC.DrawEntity(currentEntity);
			CC.ctx.globalAlpha = 1;
		}

		CC.ctx.translate(x - CC.c.width / 2, y - CC.c.height / 2); // uncenter on player
	}

}