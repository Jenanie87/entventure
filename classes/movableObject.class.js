class MovableObject {
    // properties
    x;
    y = 280;
    width = 450;
    height = 200;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    offsetY = 0;
    speedY = 0;
    acceleration = 2.5;
    healthPoints = 100;
    lastHit = 0;

    constructor() {

    }

    // functions
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image')<img id="image"> oder document.createElement('img')
        this.img.src = path; //Hiermit würde Pfad in die src geladen <img src=path>
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRect(ctx) {
        if(this instanceof Character || this instanceof Enemy) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

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
        return this.y < 280;
    }

    jump() {
        this.speedY = 25;
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
            console.log(this.healthPoints);
        } 
        this.lastHit = new Date().getTime();
    }

    checkIfHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden
        timePassed = timePassed / 1000; // Differenz in sekunden
        return timePassed < 0.75;
    }
}