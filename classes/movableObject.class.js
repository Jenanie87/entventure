class MovableObject extends DrawableObject {
    // properties
    speed = 0.15;
    otherDirection = false;
    offsetY = 0;
    speedY = 0;
    acceleration = 2.5;
    healthPoints = 500;
    lastHit = 0;

    constructor() {
        super();
    }

    // functions

    playAnimation(array) {
        let i = this.currentImage % array.length;
        let path = array[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false; // Bild nicht gespiegelt
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true; // Bild gespiegelt
    }

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);   
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) { // throwableObject should always fall
            return true;
        } else {
            return this.y < 280;
        }
    }

    jump() {
        this.speedY = 23;
    }

    isColliding (obj) {
        return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
                (this.y + this.offsetY + this.height) >= obj.y &&
                (this.y + this.offsetY) <= (obj.y + obj.height);
    }

    isDead() {
        return this.healthPoints == 0;
    }

    hit() {
        if(this.healthPoints > 0) {
            this.healthPoints -= 2;
        } 
        this.lastHit = new Date().getTime(); // Aktualisiert die Zeit des letzten Treffers
    }

    checkIfHurt() { // Speichert Zeitpunkt wann man zuletzt verletzt wurde
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden - Zeitspanne
        timePassed = timePassed / 1000; // Differenz in Sekunden
        return timePassed < 0.75; // Wenn Zeit mehr als 0.75 Sekunden in der Vergangenheit, dann false
    }
}