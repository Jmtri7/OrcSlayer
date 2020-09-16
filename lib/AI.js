class AI {
	constructor(entity) {
		this.entity = entity;

		this.action = 0;
		this.time = 0;

		this.direction;

		this.busy = false;
	}

	Control() {
		if(this.entity.isDead == true) {
			var id = this.entity.map.AI.indexOf(this);
			delete this.entity.map.AI[id];
			this.entity.map.AI.splice(id, 1);

			return;
		}

		if(this.busy == false) {

			this.action = Math.floor(Math.random() * 4);
			this.time = Math.floor(Math.random() * 250 + 250);
			this.busy = true;

			this.direction = Math.floor(8 * Math.random());

			var that = this;
			setTimeout(function() {
				that.busy = false;
			}, this.time);

		} else {
				switch(this.action) {
				case 0:
				case 1:
				case 2:
					this.Wait();
				break;
				case 3:
					this.Wander();
				break; 
			}
		}
	}

	Wait() {
		this.entity.Stop();
	}

	Wander() {
		this.entity.Move(this.direction);
	}
}