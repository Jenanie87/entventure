class Enemy extends MovableObject {
    // properties
    otherDirection = true; // Mit Setzen der Variable auf true, werden die enemies gespiegelt, durch Methode addToCanvas

    constructor() {
        super();
        this.x = 100 + Math.floor(Math.random() * 400);
/*         this.loadImage(path); */
    }

    // functions
}