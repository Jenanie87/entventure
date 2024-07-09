class SmallEnemy extends Enemy {

    constructor(path) {
        super(path);
        this.width = 100;
        this.height = 100;
        this.y = 360;
        this.speed = 0.50 + Math.random();
    }

    // functions

    animate(array) {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            let i = this.currentImage % array.length;
            let path = array[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 75);
    }
}