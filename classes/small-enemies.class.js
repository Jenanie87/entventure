class SmallEnemy extends Enemy {

    offset = {
        top: 25,
        right: 35,
        bottom: 20,
        left: 30
    };

    constructor(path) {
        super(path);
        this.width = 100;
        this.height = 100;
        this.y = 360;
        this.speed = 1.50 + Math.random();
    }

    // functions

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_RUN);
        }, 75);
    }
}