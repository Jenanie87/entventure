class BackgroundObject extends MovableObject {
    y = 0;
    
    constructor(path, x) {
        super();
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.x = x;
        this.loadImage(path);
    }
}