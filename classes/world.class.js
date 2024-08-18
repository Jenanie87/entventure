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

    playBackgroundMusic() {
        if (this.musicEnabled) {
            this.audio_bgMusic.volume = 0.3;
            this.audio_bgMusic.play();
        }
    }

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

    checkCollisions() {
        this.collisionWithEnemy();
        this.collisionWithPinecone();
        this.collisionWithCoin();
        this.collisionWithThrowableObjects();
    }

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

    resetThrowingAbility() {
        this.canThrow = false;
        setTimeout(() => {
            this.canThrow = true;
        }, 500);
    }

    createNewPinecone() {
        let newIndex = this.level.pinecones.length;
        let newPinecone = new Pinecone(newIndex);
        newPinecone.world = this;
        newPinecone.setRandomPosition();
        this.level.pinecones.push(newPinecone);
    }

    calculateLevelBounds(backgroundObjects) {
        let minX = Math.min(...backgroundObjects.map(obj => obj.x));
        let maxX = Math.max(...backgroundObjects.map(obj => obj.x + obj.width));
        return { minX, maxX };
    }

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

    addObjectsArrayToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        });
    }

    addToCanvas(MovableObject) {
        if (MovableObject.otherDirection) {
            this.flipImage(MovableObject);
        }
        MovableObject.draw(this.ctx);
        if (MovableObject.otherDirection) {
            this.flipImageBack(MovableObject);
        }
    }

    drawFixedUIElements() {
        this.addToCanvas(this.healthbar);
        this.addToCanvas(this.coinbar);
        this.addToCanvas(this.pineconebar);
        if (this.healthbar_endboss) {
            this.addToCanvas(this.healthbar_endboss);
        };
    }

    drawingMovingObjects() {
        this.addToCanvas(this.character);
        this.addObjectsArrayToCanvas(this.throwableObjects);
        this.addObjectsArrayToCanvas(this.level.enemies);
        this.addObjectsArrayToCanvas(this.level.pinecones);
        this.addObjectsArrayToCanvas(this.level.coins);
        this.addObjectsArrayToCanvas(this.level.foregroundObjects);
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    collisionWithCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin.collectCoin(index);
                this.coinbar.collectedCoin++;
                this.coinbar.setPercentage(this.coinbar.collectedCoin);
            }
        })
    };

    collisionWithPinecone() {
        this.level.pinecones.forEach((pinecone) => {
            if (this.character.isColliding(pinecone)) {
                pinecone.collectPinecone();
                this.pineconebar.setPercentage(this.throwableObjects.length);
            }
        })
    }

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

    handleEnemyStomp(enemy, index) {
        this.character.bounceOffEnemy();
        enemy.hit(this.character.damage);
        if (enemy.checkIsDead()) {
            this.removeEnemy(enemy, index);
        }
    }

    collisionWithThrowableObjects() {
        this.throwableObjects.forEach((pinecone) => {
            this.level.enemies.forEach((enemy, index) => {
                if (this.isValidPineconeHit(pinecone, enemy)) {
                    this.handlePineconeCollisionWithEnemy(pinecone, enemy, index);
                }
            });
        });
    }

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

    removeEnemy(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter(e => e !== enemy);
            this.level.enemies.forEach((e, index) => {
                e.index = index;
            });
        }, 2000);
        this.killedEnemies++;
    }

    startEndboss() {
        if (this.canEndbossFightStart()) {
            this.initializeBossFight();
            setTimeout(() => {
                this.character.moveCharacterToX(2775);
            }, 1500);
        }
    }

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

    createEndboss() {
        this.endboss = new Endboss();
        this.endboss.world = this;
        this.level.enemies.push(this.endboss);
    }

    playRoarSound() {
        setTimeout(() => {
            this.endboss.audio_roar.play();
            this.roarPlayed = true;
        }, 500);
    }

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

    canThrowPinecones() {
        return this.keyboard.THROW && this.canThrow;
    }

    hasPineconeCapacity() {
        return this.throwableObjects.length < 10;
    }

    characterHitsAliveEnemy(enemy) {
        return this.character.isColliding(enemy) && !enemy.checkIsDead();
    }

    characterStompsEnemy(enemy) {
        return this.character.isAboveEnemy(enemy) && this.character.isAboveGround();
    }

    isValidPineconeHit(pinecone, enemy) {
        return pinecone.isColliding(enemy) && !enemy.isHitByPinecone;
    }

    areSoundsSet(imgSound, imgMusic) {
        return imgSound.src.includes('misic.png') && imgMusic.src.includes('sisic.png');
    }

    canEndbossFightStart() {
        return !this.endbossFightStarted && this.character.x > 2580 && !this.endboss;
    }
}