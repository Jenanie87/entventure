class BigEnemy extends Enemy {

    constructor() {
        super();
        this.width = 450;
        this.height = 200;
        this.y = 266;
        this.speed = 0.05 + Math.random();
    }

    // functions

    animate(array) {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % array.length;
            let path = array[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 175);
    }
}