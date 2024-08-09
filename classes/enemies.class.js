class Enemy extends MovableObject {
    // properties
    isHitByPinecone = false;

    constructor() {
        super();
        this.x = 250 + Math.floor(Math.random() * 2000);
    }
}