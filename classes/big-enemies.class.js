class BigEnemy extends Enemy {
    // properties
    damage = 2;
    healthPoints = 9;
    offset = {
        top: 100,
        right: 185,
        bottom: 30,
        left: 200
    };
    audio_hurt = new Audio('audio/bigEnemies_hurt.mp3');

    constructor() {
        super();
        this.width = 450;
        this.height = 220;
        this.y = 250;
        this.speed = 0.05 + Math.random();
        this.audio_hurt.volume = 0.5;
    }

    // functions
    animate() {
        setInterval(() => this.moveEnemies(), 1000 / 60);
        setInterval(() => this.playEnemiesAnimation(), 175);
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
            this.playAnimation(this.IMAGES_WALK);
        }
    }
}