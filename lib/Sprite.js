class Sprite {
	constructor(spriteSheet) {
		this.sheet = spriteSheet.img;
		this.width = spriteSheet.width;
		this.height = spriteSheet.height;

		this.colIndex = 0;
		this.rowIndex = 0;
		this.colSequence = [0];
		this.rowSequence = [0];

		this.animationInterval;
	}

	Pause() {
		clearInterval(this.animationInterval);
	}

	GetX() {
		return this.rowSequence[this.rowIndex] * this.width;
	}

	GetY() {
		return this.colSequence[this.colIndex] * this.height;
	}

	SetRowSequence(sequence) {
		this.rowSequence = sequence;
	}

	SetColSequence(sequence) {
		this.colSequence = sequence;
	}

	Play(frameLength) {
		this.rowIndex = 0;
		this.colIndex = 0;

		var that = this;
		this.animationInterval = setInterval(function() {
			that.NextIndex();
		}, frameLength);
	}

	NextIndex() {
		if(this.rowIndex == this.rowSequence.length - 1) {
			this.rowIndex = 0;
		} else {
			this.rowIndex++;
		}

		if(this.colIndex == this.colSequence.length - 1) {
			this.colIndex = 0;
		} else {
			this.colIndex++;
		}
	}
}