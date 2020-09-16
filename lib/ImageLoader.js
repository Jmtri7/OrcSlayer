class ImageLoader {
	constructor() {
		this.img = [];
		this.loaded = [];
	}

	LoadImage(src) {
		var newImage = new Image();
		newImage.src = src;

		this.img.push(newImage);

		var imgID = this.img.length - 1;
		this.loaded[imgID] = false;

		var that = this;
		newImage.onload = function () {
			that.loaded[imgID] = true;
		}

		return newImage;
	}
}