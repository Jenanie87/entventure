class Endboss extends Enemy {
    // properties
    width = 800;
    height = 800;
    y = -260;
    x = 2850;
    damage = 5;
    healthPoints = 30;
    currentPosition = 0;
    stepsRemaining = 0;
    movingRight = false;
    offset = {
        top: 330,
        right: 330,
        bottom: 90,
        left: 350
    };

    otherDirection = true; // Mit Setzen der Variable auf true, werden die enemies gespiegelt, durch Methode addToCanvas

    IMAGES_IDLE = [
        'img/enemies/3_ORK/ORK_03_IDLE_000.png',
        'img/enemies/3_ORK/ORK_03_IDLE_001.png',
        'img/enemies/3_ORK/ORK_03_IDLE_002.png',
        'img/enemies/3_ORK/ORK_03_IDLE_003.png',
        'img/enemies/3_ORK/ORK_03_IDLE_004.png',
        'img/enemies/3_ORK/ORK_03_IDLE_005.png',
        'img/enemies/3_ORK/ORK_03_IDLE_006.png',
        'img/enemies/3_ORK/ORK_03_IDLE_007.png',
        'img/enemies/3_ORK/ORK_03_IDLE_008.png',
        'img/enemies/3_ORK/ORK_03_IDLE_009.png'
    ];

    IMAGES_HURT = [
        'img/enemies/3_ORK/ORK_03_HURT_000.png',
        'img/enemies/3_ORK/ORK_03_HURT_001.png',
        'img/enemies/3_ORK/ORK_03_HURT_002.png',
        'img/enemies/3_ORK/ORK_03_HURT_003.png',
        'img/enemies/3_ORK/ORK_03_HURT_004.png',
        'img/enemies/3_ORK/ORK_03_HURT_005.png',
        'img/enemies/3_ORK/ORK_03_HURT_006.png',
        'img/enemies/3_ORK/ORK_03_HURT_007.png',
        'img/enemies/3_ORK/ORK_03_HURT_008.png',
        'img/enemies/3_ORK/ORK_03_HURT_009.png'
    ];

    IMAGES_DIE = [
        'img/enemies/3_ORK/ORK_03_DIE_000.png',
        'img/enemies/3_ORK/ORK_03_DIE_001.png',
        'img/enemies/3_ORK/ORK_03_DIE_002.png',
        'img/enemies/3_ORK/ORK_03_DIE_003.png',
        'img/enemies/3_ORK/ORK_03_DIE_004.png',
        'img/enemies/3_ORK/ORK_03_DIE_005.png',
        'img/enemies/3_ORK/ORK_03_DIE_006.png',
        'img/enemies/3_ORK/ORK_03_DIE_007.png',
        'img/enemies/3_ORK/ORK_03_DIE_008.png',
        'img/enemies/3_ORK/ORK_03_DIE_009.png'
    ];

    IMAGES_WALK = [
        'img/enemies/3_ORK/ORK_03_WALK_000.png',
        'img/enemies/3_ORK/ORK_03_WALK_001.png',
        'img/enemies/3_ORK/ORK_03_WALK_002.png',
        'img/enemies/3_ORK/ORK_03_WALK_003.png',
        'img/enemies/3_ORK/ORK_03_WALK_004.png',
        'img/enemies/3_ORK/ORK_03_WALK_005.png',
        'img/enemies/3_ORK/ORK_03_WALK_006.png',
        'img/enemies/3_ORK/ORK_03_WALK_007.png',
        'img/enemies/3_ORK/ORK_03_WALK_008.png',
        'img/enemies/3_ORK/ORK_03_WALK_009.png',
    ];
    world;
    audio_endbossMusic = new Audio('audio/endboss.mp3');
    audio_hurt = new Audio('audio/endboss_hurt.mp3');
    audio_roar = new Audio('audio/orc_scream1.mp3');
    endbossMusicPlayed = false;
    endbossIsWaiting = true;

    constructor(path) {
        super(path);
        this.loadImage('img/enemies/3_ORK/ORK_03_IDLE_000.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
        this.loadImages(this.IMAGES_WALK);
        this.audio_hurt.volume = 0.5;
        this.audio_roar.volume = 0.1;
        this.animate();
    }

    // functions

    /**
     * This function initializes the animation for the endboss, switching between idle, hurt, and walk animations based on state.
     */
    animate() {
        setInterval(() => {
            if (this.checkIsDead()) {
                this.playAnimation(this.IMAGES_DIE, true);
            } else if (this.checkIfHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.audio_hurt.play();
            } else if (!this.endbossIsWaiting) {
                this.playAnimation(this.IMAGES_WALK);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100);
    }

    /**
     * Moves the endboss, regenerating health if necessary and deciding next move when steps run out.
     */
    moveEndboss() {
        setInterval(() => {
            if (!this.checkIsDead()) {
                if (this.canRegenerate()) {
                    this.regenerateHealthPoints();
                }
                if (this.hasNoRemainingSteps()) {
                    this.decideNextMove();
                } else {
                    this.move();
                    this.stepsRemaining--;
                }
            }
        }, 1000 / 60);
    }

    /**
     * Regenerates the endboss's health points and updates the health bar.
     */
    regenerateHealthPoints() {
        this.healthPoints = this.healthPoints + 0.2;
        this.world.healthbar_endboss.setPercentage(this.healthPoints);
    }

    /**
     * This function decides the endboss's next move, including direction and speed.
     */
    decideNextMove() {
        this.movingRight = Math.random() < 0.5; // kleiner gleich 0.5 = true;
        this.stepsRemaining = Math.floor(Math.random() * 500) + 150;
        this.speed = Math.random() * 2.0 + 0.50;
    }

    /**
     * Moves the endboss left or right based on its current direction.
     */
    move() {
        if (this.x >= 3070) {
            this.movingRight = false;
        } else if (this.x <= 0) {
            this.movingRight = true;
        }
        if (this.movingRight) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    /**
     * Determines if the endboss can regenerate health based on distance from the character and current health.
     * @returns {boolean} - True if the endboss can regenerate health.
     */
    canRegenerate() {
        return Math.abs(this.x - this.world.character.x) > 400 && this.healthPoints < 60;
    }

    /**
     * Checks if the endboss has no remaining steps before deciding the next move.
     * @returns {boolean} - True if there are no remaining steps.
     */
    hasNoRemainingSteps() {
        return this.stepsRemaining <= 0;
    }
}