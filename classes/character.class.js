class Character extends MovableObject {
    // properties
    speed = 5;

    IMAGES_WALK = [
        'img/character/2/Fairy_02__WALK_000.png',
        'img/character/2/Fairy_02__WALK_001.png',
        'img/character/2/Fairy_02__WALK_002.png',
        'img/character/2/Fairy_02__WALK_003.png',
        'img/character/2/Fairy_02__WALK_004.png',
        'img/character/2/Fairy_02__WALK_005.png',
        'img/character/2/Fairy_02__WALK_006.png',
        'img/character/2/Fairy_02__WALK_007.png',
        'img/character/2/Fairy_02__WALK_008.png',
        'img/character/2/Fairy_02__WALK_009.png',
    ];
    world;

    constructor() {
        super();
        this.x = -130;
        this.loadImage('img/character/2/Fairy_02__IDLE_000.png');
        this.loadImages(this.IMAGES_WALK);
        this.animate(this.IMAGES_WALK);
    }

    // functions

    moveRight() {
        this.x += this.speed;
    }

    animate(array) {

        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.moveRight();  
                this.otherDirection = false; // Bild nicht gespiegelt
            } 
            if (this.world.keyboard.LEFT) {
                this.moveLeft();
                this.otherDirection = true; // Bild gespiegelt
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);

            setInterval(() => {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    let i = this.currentImage % array.length;
                    let path = array[i];
                    this.img = this.imageCache[path];
                    this.currentImage++;
                }
            }, 100);
    }

    jump() {

    }

}