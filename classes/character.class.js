class Character extends MovableObject {
    speed = 5;
    offset = {
        top: 10,
        right: 190,
        bottom: 10,
        left: 180
    };

    IMAGES_WALK = [
        'img/character/1/Ent_01__WALK_000.png',
        'img/character/1/Ent_01__WALK_001.png',
        'img/character/1/Ent_01__WALK_002.png',
        'img/character/1/Ent_01__WALK_003.png',
        'img/character/1/Ent_01__WALK_004.png',
        'img/character/1/Ent_01__WALK_005.png',
        'img/character/1/Ent_01__WALK_006.png',
        'img/character/1/Ent_01__WALK_007.png',
        'img/character/1/Ent_01__WALK_008.png',
        'img/character/1/Ent_01__WALK_009.png',
    ];

    IMAGES_JUMP = [
        'img/character/1/Ent_01__JUMP_000.png',
        'img/character/1/Ent_01__JUMP_001.png',
        'img/character/1/Ent_01__JUMP_002.png',
        'img/character/1/Ent_01__JUMP_003.png',
        'img/character/1/Ent_01__JUMP_004.png',
        'img/character/1/Ent_01__JUMP_005.png',
        'img/character/1/Ent_01__JUMP_006.png',
        'img/character/1/Ent_01__JUMP_007.png',
        'img/character/1/Ent_01__JUMP_008.png',
        'img/character/1/Ent_01__JUMP_009.png',
    ];

    IMAGES_IDLE = [
        'img/character/1/Ent_01__IDLE_000.png',
        'img/character/1/Ent_01__IDLE_001.png',
        'img/character/1/Ent_01__IDLE_002.png',
        'img/character/1/Ent_01__IDLE_003.png',
        'img/character/1/Ent_01__IDLE_004.png',
        'img/character/1/Ent_01__IDLE_005.png',
        'img/character/1/Ent_01__IDLE_006.png',
        'img/character/1/Ent_01__IDLE_007.png',
        'img/character/1/Ent_01__IDLE_008.png',
        'img/character/1/Ent_01__IDLE_009.png',
    ];

    IMAGES_ATTACK = [
        'img/character/1/Ent_01__ATTACK_000.png',
        'img/character/1/Ent_01__ATTACK_001.png',
        'img/character/1/Ent_01__ATTACK_002.png',
        'img/character/1/Ent_01__ATTACK_003.png',
        'img/character/1/Ent_01__ATTACK_004.png',
        'img/character/1/Ent_01__ATTACK_005.png',
        'img/character/1/Ent_01__ATTACK_006.png',
        'img/character/1/Ent_01__ATTACK_007.png',
        'img/character/1/Ent_01__ATTACK_008.png',
        'img/character/1/Ent_01__ATTACK_009.png'
    ];

    IMAGES_HURT = [
        'img/character/1/Ent_01__HURT_000.png',
        'img/character/1/Ent_01__HURT_001.png',
        'img/character/1/Ent_01__HURT_002.png',
        'img/character/1/Ent_01__HURT_003.png',
        'img/character/1/Ent_01__HURT_004.png',
        'img/character/1/Ent_01__HURT_005.png',
        'img/character/1/Ent_01__HURT_006.png',
        'img/character/1/Ent_01__HURT_007.png',
        'img/character/1/Ent_01__HURT_008.png',
        'img/character/1/Ent_01__HURT_009.png',
    ];

    IMAGES_DIE = [
        'img/character/1/Ent_01__DIE_000.png',
        'img/character/1/Ent_01__DIE_001.png',
        'img/character/1/Ent_01__DIE_002.png',
        'img/character/1/Ent_01__DIE_003.png',
        'img/character/1/Ent_01__DIE_004.png',
        'img/character/1/Ent_01__DIE_005.png',
        'img/character/1/Ent_01__DIE_006.png',
        'img/character/1/Ent_01__DIE_007.png',
        'img/character/1/Ent_01__DIE_008.png',
        'img/character/1/Ent_01__DIE_009.png',
    ];
    world;

    constructor() {
        super();
        this.x = -100;
        audio_char_bouncing.volume = 0.1;
        audio_char_jumping.volume = 0.2;
        audio_char_walking.playbackRate = 0.5;
        this.loadImage('img/character/1/Ent_01__IDLE_000.png');
        this.loadAllImages();
        this.applyGravity(280);
        this.animate();
    }

    /**
     * Loads all images required for character animations.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
    }

    /**
     * Initializes the animation intervals for the character.
     */
    animate() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
        setInterval(() => this.playCharacterAnimation(), 100);
    }

    /**
     * Moves the character based on keyboard input and updates the camera.
     */
    moveCharacter() {
        audio_char_walking.pause();
        if (this.canMoveRight()) {
            audio_char_walking.play();
            this.moveRight();
        }
        if (this.canMoveLeft()) {
            audio_char_walking.play();
            this.moveLeft();
        }
        if (this.canJump()) {
            this.jump();
            audio_char_jumping.play();
        }
        this.updateCamera();
    }

    /**
     * This function plays the appropriate animation based on the character's state.
     */
    playCharacterAnimation() {
        if (this.checkIsDead()) {
            this.playAnimation(this.IMAGES_DIE, true);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMP);
        } else if (this.throwsPinecone()) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.isMoving()) {
            this.playAnimation(this.IMAGES_WALK);
        } else if (this.checkIfHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Ends the game if the character is dead or if the endboss is dead.
     */
    endGame() {
        if (this.checkIsDead()) {
            this.loseGame();
        }
        if (this.isEndbossPresent()) {
            if (this.world.endboss.checkIsDead()) {
                this.winGame();
            }
        }
    }

    /**
     * Handles the game loss scenario.
     */
    loseGame() {
        this.world.keyboard.disableKeyboard();
        this.world.isGameOver = true;
        setLostScreen('lost');
    }

    /**
     * This function handles the game win scenario.
     */
    winGame() {
        setTimeout(() => {
            audio_win.play();
        }, 750);
        this.world.keyboard.disableKeyboard();
        this.world.isGameOver = true;
        setLostScreen('win');
    }

    /**
     * Updates the camera position based on the character's position.
     */
    updateCamera() {
        let halfCanvasWidth = this.world.canvas.width / 2;
        let cameraOffsetToLeft = 250;
        let newCameraX = -this.x + halfCanvasWidth - cameraOffsetToLeft;
        newCameraX = Math.max(newCameraX, -this.world.levelBounds.maxX + this.world.canvas.width);
        newCameraX = Math.min(newCameraX, -this.world.levelBounds.minX);
        this.world.camera_x = newCameraX;
    }

    /**
     * Makes the character bounce off an enemy.
     */
    bounceOffEnemy() {
        this.speedY = 15;
        audio_char_bouncing.currentTime = 0;
        audio_char_bouncing.play();
    }

    /**
    * Checks for collisions between the character and enemies.
    */
    handleEnemyStomp(enemy, index) {
        this.bounceOffEnemy();
        enemy.hit(this.damage);
        if (enemy.checkIsDead()) {
            this.world.removeEnemy(enemy, index);
        }
    }

    /**
     * Checks if the character is colliding with an enemy and the enemy is alive.
     * @param {Enemy} enemy - The enemy to check for collision.
     * @returns {boolean} True if colliding with an alive enemy, false otherwise.
     */
    hitsAliveEnemy(enemy) {
        return this.isColliding(enemy) && !enemy.checkIsDead();
    }

    /**
     * Checks if the character can move right based on keyboard input and level bounds.
     * @returns {boolean} - Whether the character can move right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.levelBounds.maxX - this.world.canvas.width / 2;
    }

    /**
     * Checks if the character can move left based on keyboard input and level bounds.
     * @returns {boolean} - Whether the character can move left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > this.world.levelBounds.minX - 100;
    }

    /**
     * Checks if the character can jump based on keyboard input and current position.
     * @returns {boolean} - Whether the character can jump.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Checks if the character is throwing a pinecone.
     * @returns {boolean} - Whether the character is throwing a pinecone.
     */
    throwsPinecone() {
        return this.world.isThrowing;
    }

    /**
     * Checks if the character is moving based on keyboard input.
     * @returns {boolean} - Whether the character is moving.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * Checks if the endboss is present in the world.
     * @returns {boolean} - Whether the endboss is present.
     */
    isEndbossPresent() {
        return this.world.endboss != null;
    }
}