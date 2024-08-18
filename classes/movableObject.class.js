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

    /**
     * This function plays an animation from the given array of image paths.
     * @param {string[]} array - The array of image paths for the animation.
     * @param {boolean} [stopAtEnd=false] - Whether to stop at the last frame of the animation.
     */   
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

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        if (!(this instanceof Endboss)) {
            this.otherDirection = false;
        }
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Applies gravity to the object by updating its vertical position and speed.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isFallingOrJumping()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 280;
        }
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MovableObject} obj - The other object to check for collision.
     * @returns {boolean} - True if the objects are colliding, false otherwise.
     */
    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    /**
     * Checks if the object is positioned above another object.
     * @param {MovableObject} obj - The other object to check against.
     * @returns {boolean} - True if the object is above the other object, false otherwise.
     */
    isAboveEnemy(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top
    }

    /**
     * Checks if the object is dead based on its health points.
     * @returns {boolean} - True if the object is dead, false otherwise.
     */
    checkIsDead() {
        if (this.isOutOfHealth()) {
            this.isDead = true;
        }
        return this.isDead;
    }

    /**
     * Reduces the object's health points by the specified damage value.
     * @param {number} damage - The amount of damage to inflict.
     */
    hit(damage) {
        if (this.healthPoints > 0) {
            this.healthPoints -= damage;
        }
        this.lastHit = new Date().getTime();
    }


    /**
     * Checks if the object has been recently hurt based on the time since the last hit.
     * @returns {boolean} - True if the object is still in the hurt state, false otherwise.
     */
    checkIfHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.75;
    }

    /**
     * Moves the object to a specified x position, adjusting its position frame by frame.
     * @param {number} xPosition - The x position to move to.
     */
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

    /**
     * Checks if there are more frames left in the animation array.
     * @param {string[]} array - The array of image paths for the animation.
     * @returns {boolean} - True if there are more frames, false otherwise.
     */
    hasMoreFrames(array) {
        return this.currentImage < array.length;
    }

    /**
     * Checks if the object is falling or jumping.
     * @returns {boolean} - True if the object is falling or jumping, false otherwise.
     */
    isFallingOrJumping() {
        return this.isAboveGround() || this.speedY > 0;
    }

    /**
     * Checks if the object's health points are out or zero.
     * @returns {boolean} - True if the health points are zero or less, false otherwise.
     */
    isOutOfHealth() {
        return this.healthPoints <= 0;
    }

    /**
     * Checks if the object is to the left of a specified x position.
     * @param {number} xPosition - The x position to compare against.
     * @returns {boolean} - True if the object is to the left of the specified x position, false otherwise.
     */
    isCharacterLeftOf(xPosition) {
        return this.x < xPosition;
    }
}