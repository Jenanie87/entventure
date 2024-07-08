class SmallEnemy extends Enemy {

    constructor(path) {
        super(path);
        this.width = 100;
        this.height = 100;
        this.y = 360;
    }

    // functions

    animate(array) {
        setInterval(() => {
            let i = this.currentImage % array.length;
            let path = array[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 75);
    }
}