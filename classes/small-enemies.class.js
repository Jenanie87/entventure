class SmallEnemy extends Enemy {
    // properties
    damage = 1;
    healthPoints = 3;
    offset = {
        top: 25,
        right: 35,
        bottom: 20,
        left: 30
    };
    audio_hurt = new Audio('audio/smallEnemies_hurt.mp3');

    constructor(path) {
        super(path);
        this.width = 100;
        this.height = 100;
        this.y = 360;
        this.speed = 1.50 + Math.random();
        this.audio_hurt.volume = 0.3;
    }

    // functions
    animate() {
        setInterval(() => this.moveEnemies(), 1000 / 60);
        setInterval(() => this.playEnemiesAnimation(), 75);
    }

    moveEnemies() {
        if (!this.checkIsDead() && !this.checkIfHurt()) {
            this.moveLeft();
        }
    }

    playEnemiesAnimation() {
        if (this.checkIsDead()) {
            this.playAnimation(this.IMAGES_DIE, true);
        } else if (this.checkIfHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.audio_hurt.play();
        } else {
            this.playAnimation(this.IMAGES_RUN);
        }
    }
}