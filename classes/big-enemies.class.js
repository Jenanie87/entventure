class BigEnemy extends Enemy {

    constructor() {
        super();
        this.width = 450;
        this.height = 200;
        this.y = 266;
    }

    // functions

    animate(array) {
        setInterval(() => {
            let i = this.currentImage % array.length;
            let path = array[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }
}