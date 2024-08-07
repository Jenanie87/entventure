class BigEnemy extends Enemy {
    // properties
    damage = 4;
    healthPoints = 25;

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
            if(!this.checkIsDead() && !this.checkIfHurt()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if(this.checkIsDead()) {
                this.playAnimation(this.IMAGES_DIE, true);
            } else if(this.checkIfHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 175);
    }
}