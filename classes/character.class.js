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

    IMAGES_JUMP = [
        'img/character/2/Fairy_02__JUMP_000.png',
        'img/character/2/Fairy_02__JUMP_001.png',
        'img/character/2/Fairy_02__JUMP_002.png',
        'img/character/2/Fairy_02__JUMP_003.png',
        'img/character/2/Fairy_02__JUMP_004.png',
        'img/character/2/Fairy_02__JUMP_005.png',
        'img/character/2/Fairy_02__JUMP_006.png',
        'img/character/2/Fairy_02__JUMP_007.png',
        'img/character/2/Fairy_02__JUMP_008.png',
        'img/character/2/Fairy_02__JUMP_009.png',
    ];

    IMAGES_IDLE = [
        'img/character/2/Fairy_02__IDLE_000.png',
        'img/character/2/Fairy_02__IDLE_001.png',
        'img/character/2/Fairy_02__IDLE_002.png',
        'img/character/2/Fairy_02__IDLE_003.png',
        'img/character/2/Fairy_02__IDLE_004.png',
        'img/character/2/Fairy_02__IDLE_005.png',
        'img/character/2/Fairy_02__IDLE_006.png',
        'img/character/2/Fairy_02__IDLE_007.png',
        'img/character/2/Fairy_02__IDLE_008.png',
        'img/character/2/Fairy_02__IDLE_009.png',
    ];
    world;
    audio_walking = new Audio('audio/walking1.mp3');
    

    constructor() {
        super();
        this.x = -100;
        this.loadImage('img/character/2/Fairy_02__IDLE_000.png');
        this.audio_walking.playbackRate = 0.5;
        this.audio_walking.volume = 0.3;  
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_IDLE);
        this.applyGravity();
        this.animate();
    }

    // functions

    moveRight() {
        this.x += this.speed;
    }

    animate() {

        setInterval(() => {
            this.audio_walking.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.levelBounds.maxX - this.world.canvas.width / 2) {
                this.audio_walking.play();
                this.moveRight();            
                this.otherDirection = false; // Bild nicht gespiegelt
            } 
            if (this.world.keyboard.LEFT && this.x > this.world.levelBounds.minX -100) {
                this.audio_walking.play();
                this.moveLeft();
                this.otherDirection = true; // Bild gespiegelt
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                // !this.isAboveGround() -> Character ist nicht über dem Boden, also auf dem Boden
                this.jump();
            }

            this.updateCamera();
        }, 1000 / 60);

            setInterval(() => {
                if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMP);
                } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALK);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }, 100);
    }




    updateCamera() {
        let halfCanvasWidth = this.world.canvas.width / 2;
        let cameraOffsetToLeft = 250; // Offset zur linken Seite
        let newCameraX = -this.x + halfCanvasWidth - cameraOffsetToLeft;
        newCameraX = Math.max(newCameraX, -this.world.levelBounds.maxX + this.world.canvas.width);
        newCameraX = Math.min(newCameraX, -this.world.levelBounds.minX);
        this.world.camera_x = newCameraX;
    }

    jump() {
        this.speedY = 23;
    }

}