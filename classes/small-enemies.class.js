class SmallEnemy extends Enemy {
    // properties
    damage = 1;
    healthPoints = 10;
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
            if (!this.checkIsDead() && !this.checkIfHurt()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.checkIsDead()) {
                this.playAnimation(this.IMAGES_DIE, true);
            } else if (this.checkIfHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_RUN);
            }
        }, 75);
    }
}