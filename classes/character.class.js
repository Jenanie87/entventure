class Character extends MovableObject {
    // properties
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
    audio_walking = new Audio('audio/walking1.mp3');
    audio_jumping = new Audio('audio/jump_man.mp3');
    

    constructor() {
        super();
        this.x = -100;
        this.loadImage('img/character/1/Ent_01__IDLE_000.png');
        this.audio_walking.playbackRate = 0.5;
        this.audio_walking.volume = 0.3;  
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
        this.applyGravity(280);
        this.animate();
    }

    // functions



    animate() {

        setInterval(() => {
            this.audio_walking.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.levelBounds.maxX - this.world.canvas.width / 2) {
                this.audio_walking.play();
                console.log(this.otherDirection);
                this.moveRight();            
            } 
            if (this.world.keyboard.LEFT && this.x > this.world.levelBounds.minX -100) {
                this.audio_walking.play();
                console.log(this.otherDirection);
                this.moveLeft();           
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                // !this.isAboveGround() -> Character ist nicht über dem Boden, also auf dem Boden
                this.jump();
                this.audio_jumping.play();
            }
             this.updateCamera();
        }, 1000 / 60);

            setInterval(() => {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DIE);
                } else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMP);
                } else if(this.world.isThrowing) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALK);
                } else if(this.checkIfHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
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
}