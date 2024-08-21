class BigEnemy extends Enemy {
    damage = 2;
    healthPoints = 9;
    offset = {
        top: 100,
        right: 185,
        bottom: 30,
        left: 145
    };
    audio_hurt = new Audio('audio/bigEnemies_hurt.mp3');

    constructor() {
        super();
        this.width = 450;
        this.height = 220;
        this.y = 250;
        this.speed = 0.10 + Math.random();
        this.audio_hurt.volume = 0.5;
    }

    /**
    * This function initializes the animation intervals for the enemy.
    */
    animate() {
        setInterval(() => this.moveEnemies(), 1000 / 60);
        setInterval(() => this.playEnemiesAnimation(), 175);
    }

    /**
     * This function moves the enemy left if it is not dead or hurt.
     */
    moveEnemies() {
        if (!this.checkIsDead() && !this.checkIfHurt()) {
            this.moveLeft();
        }
    }

    /**
     * Plays the appropriate animation based on the enemy's state:
     * - Die animation if the enemy is dead.
     * - Hurt animation and sound if the enemy is hurt.
     * - Walking animation otherwise.
     */
    playEnemiesAnimation() {
        if (this.checkIsDead()) {
            this.playAnimation(this.IMAGES_DIE, true);
        } else if (this.checkIfHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.audio_hurt.play();
        } else {
            this.playAnimation(this.IMAGES_WALK);
        }
    }
}