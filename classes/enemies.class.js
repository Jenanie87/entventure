class Enemy extends MovableObject {
    // properties

    constructor(path, width, heigth, y) {
        super();
        this.width = width;
        this.height = heigth;
        this.x = 100 + Math.floor(Math.random() * 400);
        this.y = y;
        this.loadImage(path);
    }

    // functions
}