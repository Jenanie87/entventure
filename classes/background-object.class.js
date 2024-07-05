class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    constructor(path) {
        super();
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.loadImage(path);
    }
}