class Level {
    enemies;
    pinecones;
    coins;
    backgroundObjects;
    foregroundObjects;


    constructor(enemies, pinecones, coins, backgroundObjects, foregroundObjects) {
        this.enemies = enemies;
        this.pinecones = pinecones;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
        this.foregroundObjects = foregroundObjects;
    }
}