class MovableObject extends DrawableObject {
    // properties
    speed = 0.15;
    otherDirection = false;
    offsetY = 0;
    speedY = 0;
    acceleration = 2.5;
    healthPoints = 80;
    lastHit = 0;
    damage = 3;
    isDead = false;


    constructor() {
        super();
    }

    // functions
    playAnimation(array, stopAtEnd = false) {
        if (this.hasMoreFrames(array)) {
            let i = this.currentImage % array.length;
            let path = array[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        } else if (stopAtEnd) {
            this.img = this.imageCache[array[array.length - 1]];
        } else {
            this.currentImage = 0;
        }
    }

    moveRight() {
        this.x += this.speed;
        if (!(this instanceof Endboss)) {
            this.otherDirection = false;
        }
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isFallingOrJumping()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 280;
        }
    }

    jump() {
        this.speedY = 25;
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    isAboveEnemy(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top
    }

    checkIsDead() {
        if (this.isOutOfHealth()) {
            this.isDead = true;
        }
        return this.isDead;
    }

    hit(damage) {
        if (this.healthPoints > 0) {
            this.healthPoints -= damage;
        }
        this.lastHit = new Date().getTime();
    }

    checkIfHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.75;
    }

    moveCharacterToX(xPosition) {
        let moveToPosition = () => {
            if (this.isCharacterLeftOf(xPosition)) {
                this.moveRight();
                requestAnimationFrame(moveToPosition);
            } else {
                this.x = xPosition;
                if (this instanceof Character && this.world) {
                    this.world.startBattleMode();
                }
            }
        };
        moveToPosition();
    }

    hasMoreFrames(array) {
        return this.currentImage < array.length;
    }

    isFallingOrJumping() {
        return this.isAboveGround() || this.speedY > 0;
    }

    isOutOfHealth() {
        return this.healthPoints <= 0;
    }

    isCharacterLeftOf(xPosition) {
        return this.x < xPosition;
    }
}