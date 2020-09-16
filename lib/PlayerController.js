class PlayerController {
	constructor(entity) {
		this.entity = entity;

		this.key = [];
		for(var i = 0; i < 50; i++) {
			this.key.push(false);
		}

		var that = this;
		window.onkeydown = function(e) {
			that.key[e.keyCode ? e.keyCode : e.which] = true;
			// console.log(e.keyCode ? e.keyCode : e.which);
		}

		window.onkeyup = function(e) {
			that.key[e.keyCode ? e.keyCode : e.which] = false;
			// console.log(e.keyCode ? e.keyCode : e.which);
		}
	}

	Control() {
		var x = -1 * this.key[37] + 1 * this.key[39];
		var y = -1 * this.key[40] + 1 * this.key[38];

		if(x == -1) {
			if(y == -1) {
				this.entity.Move(5);
			} else if (y == 0) {
				this.entity.Move(6);
			} else if (y == 1) {
				this.entity.Move(7);
			}
		} else if (x == 0) {
			if(y == -1) {
				this.entity.Move(4);
			} else if (y == 0) {
				this.entity.Stop();
			} else if (y == 1) {
				this.entity.Move(0);
			}
		} else if (x == 1) {
			if(y == -1) {
				this.entity.Move(3);
			} else if (y == 0) {
				this.entity.Move(2);
			} else if (y == 1) {
				this.entity.Move(1);
			}
		}

		if(this.key[32] == true) {
			this.entity.Attack();
		}


	}
}