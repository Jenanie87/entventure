class Enemy extends MovableObject {
    // properties
    otherDirection = true; // Mit Setzen der Variable auf true, werden die enemies gespiegelt, durch Methode addToCanvas

    constructor() {
        super();
        this.x = 150 + Math.floor(Math.random() * 2000);
    }

    // functions
}