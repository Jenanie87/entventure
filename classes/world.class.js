class World {
    //properties
    character = new Character();
    healthbar = new Healthbar();
    coinbar = new Coinbar();
    pineconebar = new Pineconebar();
    throwableObjects = [new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject()];
    level = level1;
    canvas;
    ctx;
    keyboard;
    soundEnabled;
    musicEnabled;
    healthbar_endboss;
    isThrowing = false;
    canThrow = true;
    camera_x = 0;
    killedEnemies = 0;
    isGameOver = false;
    endbossFightStarted = false;
    endboss = null;
    audio_bgMusic = new Audio('audio/bg_nature.mp3');
    audio_wasted = new Audio('audio/wasted.mp3');
    audio_win = new Audio('audio/completed.mp3');
    roarPlayed = false;


    constructor(canvas, keyboard, soundEnabled, musicEnabled) {
        this.audio_win.volume = 0.5;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundEnabled = soundEnabled;
        this.musicEnabled = musicEnabled;
        this.levelBounds = this.calculateLevelBounds(level1.backgroundObjects);
        this.setWorld();
        this.draw();
        this.run();
        this.playBackgroundMusic();
    }

    //functions

    /**
     * Sets the world by assigning the world reference to various objects and initializing their positions.
     */
    setWorld() {
        this.character.world = this;
        this.level.pinecones.forEach((pinecone) => {
            pinecone.world = this;
            pinecone.setRandomPosition();
        });
        this.level.coins.forEach((coin) => {
            coin.world = this;
        });
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.throwableObjects.forEach(object => object.world = this);
    }

    /**
     * Starts the game loop to handle collisions, throwing objects, and the endboss fight.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.startEndboss();
            if (!this.isGameOver) {
                this.character.endGame();
            }
        }, 50);
    }

    /**
     * Plays background music if enabled.
     */
    playBackgroundMusic() {
        if (this.musicEnabled) {
            this.audio_bgMusic.volume = 0.3;
            this.audio_bgMusic.play();
        }
    }

    /**
     * Plays endboss music if enabled and if the endboss is present.
     */
    playEndbossMusic() {
        if (this.endboss && this.musicEnabled) {
            if (!this.endboss.endbossMusicPlayed) {
                this.endboss.audio_endbossMusic.volume = 0.3;
                this.endboss.audio_endbossMusic.play();
                this.endboss.endbossMusicPlayed = true;
            }
        } else if (this.endboss) {
            this.endboss.audio_endbossMusic.pause();
            this.endboss.audio_endbossMusic.currentTime = 0;
        }
    }

    /**
     * Checks for collisions between the character and other objects (coins, pinecones, enemies, throwable objects).
     */
    checkCollisions() {
        this.collisionWithEnemy();
        this.collisionWithPinecone();
        this.collisionWithCoin();
        this.collisionWithThrowableObjects();
    }

    /**
     * Checks if new throwable objects can be created and thrown.
     */
    checkThrowObjects() {
        if (this.canThrowPinecones()) {
            if (this.hasPineconeCapacity()) {
                this.createAndThrowPinecone();
            }
            this.resetThrowingAbility();
        } else {
            this.isThrowing = false;
        }
    }

    /**
     * Creates a new throwable pinecone and adds it to the game world.
     */
    createAndThrowPinecone() {
        let pinecone = new ThrowableObject(this.character.x + 200, this.character.y + 70);
        pinecone.world = this;
        this.throwableObjects.push(pinecone);
        this.pineconebar.setPercentage(this.throwableObjects.length - 1);
        pinecone.throw();
        this.isThrowing = true;
        setTimeout(() => {
            this.createNewPinecone();
        }, 5000);
    }

    /**
     * Resets the ability to throw throwable objects after a delay.
     */
    resetThrowingAbility() {
        this.canThrow = false;
        setTimeout(() => {
            this.canThrow = true;
        }, 500);
    }

    /**
     * Creates a new pinecone and adds it to the level.
     */
    createNewPinecone() {
        let newIndex = this.level.pinecones.length;
        let newPinecone = new Pinecone(newIndex);
        newPinecone.world = this;
        newPinecone.setRandomPosition();
        this.level.pinecones.push(newPinecone);
    }

    /**
     * Calculates the bounds of the level based on background objects.
     * @param {Array} backgroundObjects - The array of background objects.
     * @returns {Object} - The bounds of the level with min and max x values.
     */
    calculateLevelBounds(backgroundObjects) {
        let minX = Math.min(...backgroundObjects.map(obj => obj.x));
        let maxX = Math.max(...backgroundObjects.map(obj => obj.x + obj.width));
        return { minX, maxX };
    }

    /**
     * Draws all game elements on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsArrayToCanvas(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.drawFixedUIElements();
        this.ctx.translate(this.camera_x, 0);

        this.drawingMovingObjects();
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    /**
     * Adds an array of objects to the canvas.
     * @param {Array} objects - The array of objects to add.
     */
    addObjectsArrayToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        });
    }

    /**
     * Adds a single object to the canvas.
     * @param {MovableObject} object - The object to add.
     */
    addToCanvas(MovableObject) {
        if (MovableObject.otherDirection) {
            this.flipImage(MovableObject);
        }
        MovableObject.draw(this.ctx);
        if (MovableObject.otherDirection) {
            this.flipImageBack(MovableObject);
        }
    }

    /**
     * Draws fixed UI elements on the canvas.
     */
    drawFixedUIElements() {
        this.addToCanvas(this.healthbar);
        this.addToCanvas(this.coinbar);
        this.addToCanvas(this.pineconebar);
        if (this.healthbar_endboss) {
            this.addToCanvas(this.healthbar_endboss);
        };
    }

    /**
     * Draws moving objects on the canvas.
     */
    drawingMovingObjects() {
        this.addToCanvas(this.character);
        this.addObjectsArrayToCanvas(this.throwableObjects);
        this.addObjectsArrayToCanvas(this.level.enemies);
        this.addObjectsArrayToCanvas(this.level.pinecones);
        this.addObjectsArrayToCanvas(this.level.coins);
        this.addObjectsArrayToCanvas(this.level.foregroundObjects);
    }

    /**
     * Flips an object's image horizontally.
     * @param {MovableObject} object - The object to flip.
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * Flips an object's image back to its original orientation.
     * @param {MovableObject} object - The object to flip back.
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * Checks for collisions between the character and coins.
     */
    collisionWithCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin.collectCoin(index);
                this.coinbar.collectedCoin++;
                this.coinbar.setPercentage(this.coinbar.collectedCoin);
            }
        })
    };

    /**
     * Checks for collisions between the character and pinecones.
     */
    collisionWithPinecone() {
        this.level.pinecones.forEach((pinecone) => {
            if (this.character.isColliding(pinecone)) {
                pinecone.collectPinecone();
                this.pineconebar.setPercentage(this.throwableObjects.length);
            }
        })
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    collisionWithEnemy() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.characterHitsAliveEnemy(enemy)) {
                if (this.characterStompsEnemy(enemy)) {
                    this.handleEnemyStomp(enemy, index);
                } else {
                    this.character.hit(enemy.damage);
                }
                this.healthbar.setPercentage(this.character.healthPoints);
            };
        });
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    handleEnemyStomp(enemy, index) {
        this.character.bounceOffEnemy();
        enemy.hit(this.character.damage);
        if (enemy.checkIsDead()) {
            this.removeEnemy(enemy, index);
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
    collisionWithThrowableObjects() {
        this.throwableObjects.forEach((pinecone) => {
            this.level.enemies.forEach((enemy, index) => {
                if (this.isValidPineconeHit(pinecone, enemy)) {
                    this.handlePineconeCollisionWithEnemy(pinecone, enemy, index);
                }
            });
        });
    }

    /**
     * Handles the collision between a pinecone and an enemy.
     * @param {ThrowableObject} pinecone - The pinecone that collided.
     * @param {Enemy} enemy - The enemy that was hit.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    handlePineconeCollisionWithEnemy(pinecone, enemy, index) {
        enemy.hit(pinecone.damage);
        if (enemy.checkIsDead()) {
            this.removeEnemy(enemy, index);
        }
        enemy.isHitByPinecone = true;
        setTimeout(() => {
            enemy.isHitByPinecone = false;
        }, 1000);
        if (this.endboss != null) {
            this.healthbar_endboss.setPercentage(this.endboss.healthPoints);
        }
    }


    /**
     * Removes a dead enemy from the level after a delay.
     * @param {Enemy} enemy - The enemy to remove.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    removeEnemy(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
            this.level.enemies.forEach((e, index) => {
                e.index = index;
            });
        }, 2000);
        this.killedEnemies++;
    }

    /**
     * Starts the endboss fight if conditions are met.
     */
    startEndboss() {
        if (this.canEndbossFightStart()) {
            this.initializeBossFight();
            setTimeout(() => {
                this.character.moveCharacterToX(2775);
            }, 1500);
        }
    }

    /**
     * Initializes the endboss fight, including creating the endboss and playing the roar sound.
     */
    initializeBossFight() {
        this.createEndboss();
        this.keyboard.disableKeyboard();
        this.setEndbossSoundVolumes();
        this.playRoarSound();
        setTimeout(() => {
            document.querySelector('.screen_endboss').classList.add('show_screen_endboss');
            this.audio_bgMusic.pause();
        }, 1000);
    }

    /**
     * Creates a new endboss and adds it to the level.
     */
    createEndboss() {
        this.endboss = new Endboss();
        this.endboss.world = this;
        this.level.enemies.push(this.endboss);
    }

    /**
     * Plays the endboss roar sound after a delay.
     */
    playRoarSound() {
        setTimeout(() => {
            this.endboss.audio_roar.play();
            this.roarPlayed = true;
        }, 500);
    }

    /**
     * Starts battle mode with the endboss.
     */
    startBattleMode() {
        this.endbossFightStarted = true;
        setTimeout(() => {
            document.querySelector('.screen_endboss').classList.remove('show_screen_endboss');
        }, 2000);
        setTimeout(() => {
            this.endboss.endbossIsWaiting = false;
            this.healthbar_endboss = new HealthbarEndboss();
            this.playEndbossMusic();
            this.keyboard.enableKeyboard();
            this.endboss.moveEndboss();
        }, 4000);
    }


    /**
     * Sets the volumes for endboss sounds based on sound icons.
     */
    setEndbossSoundVolumes() {
        let soundIcons = document.querySelectorAll('.img_sound');
        soundIcons.forEach(img => {
            if (img.src.includes('misic.png')) {
                this.endboss.audio_roar.volume = 0.1;
                this.endboss.audio_hurt.volume = 0.5;
            } else {
                this.endboss.audio_roar.volume = 0.0;
                this.endboss.audio_hurt.volume = 0.0;
            }
        });
    }

    /**
     * Checks if pinecones can be thrown based on keyboard input and throw ability.
     * @returns {boolean} True if pinecones can be thrown, false otherwise.
     */
    canThrowPinecones() {
        return this.keyboard.THROW && this.canThrow;
    }

    /**
     * Checks if there is capacity to throw more pinecones.
     * @returns {boolean} True if there is capacity, false otherwise.
     */
    hasPineconeCapacity() {
        return this.throwableObjects.length < 10;
    }

    /**
     * Checks if the character is colliding with an enemy and the enemy is alive.
     * @param {Enemy} enemy - The enemy to check for collision.
     * @returns {boolean} True if colliding with an alive enemy, false otherwise.
     */
    characterHitsAliveEnemy(enemy) {
        return this.character.isColliding(enemy) && !enemy.checkIsDead();
    }

    /**
     * Checks if the character is stomping on an enemy.
     * @param {Enemy} enemy - The enemy to check.
     * @returns {boolean} True if the character is stomping on the enemy, false otherwise.
     */
    characterStompsEnemy(enemy) {
        return this.character.isAboveEnemy(enemy) && this.character.isAboveGround();
    }

    /**
     * Checks if a pinecone hit on an enemy is valid.
     * @param {ThrowableObject} pinecone - The pinecone to check.
     * @param {Enemy} enemy - The enemy to check.
     * @returns {boolean} True if the pinecone hit is valid, false otherwise.
     */
    isValidPineconeHit(pinecone, enemy) {
        return pinecone.isColliding(enemy) && !enemy.isHitByPinecone;
    }

    /**
     * Checks if both sound and music icons are set.
     * @param {HTMLImageElement} imgSound - The sound icon image element.
     * @param {HTMLImageElement} imgMusic - The music icon image element.
     * @returns {boolean} True if both sound and music icons are set, false otherwise.
     */
    areSoundsSet(imgSound, imgMusic) {
        return imgSound.src.includes('misic.png') && imgMusic.src.includes('sisic.png');
    }

    /**
     * Checks if the endboss fight can start based on game state.
     * @returns {boolean} True if the endboss fight can start, false otherwise.
     */
    canEndbossFightStart() {
        return !this.endbossFightStarted && this.character.x > 2580 && !this.endboss;
    }
}