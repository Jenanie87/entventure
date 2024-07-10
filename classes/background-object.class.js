class BackgroundObject extends MovableObject {
    y = 0;

    constructor(path, x) {
        super();
        this.width = 720;
        this.height = 480;
        this.x = x;
        this.loadImage(path);
    }
}