class Enemy extends MovableObject {
    // properties
    isHitByPinecone = false;

    constructor() {
        super();
        this.x = 150 + Math.floor(Math.random() * 2000);

    }

    // functions
}