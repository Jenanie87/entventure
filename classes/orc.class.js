class Orc extends MovableObject {
    // properties

    constructor(path) {
        super();
        this.x = Math.floor(-30 + Math.random() * 350);
        this.y = 263;
        this.loadImage(path);
    }

    // functions
}