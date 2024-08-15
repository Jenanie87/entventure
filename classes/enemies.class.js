class Enemy extends MovableObject {
    // properties
    isHitByPinecone = false;

    constructor() {
        super();
        this.x = 350 + Math.floor(Math.random() * 2500);
    }
}