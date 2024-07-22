class BigEnemy extends Enemy {

    offset = {
        top: 100,
        right: 185,
        bottom: 30,
        left: 200
    };

    constructor() {
        super();
        this.width = 450;
        this.height = 220;
        this.y = 250;
        this.speed = 0.05 + Math.random();
    }

    // functions

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 175);
    }
}