class Enemy extends MovableObject {
    isHitByPinecone = false;

    constructor() {
        super();
        this.x = 700 + Math.floor(Math.random() * 2100);
    }
}