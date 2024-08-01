class Endboss extends Enemy {
    // properties
    width = 800;
    height = 800;
    y = -260; 
    x = 2200;
    damage = 10;
    healthPoints = 60;

    offset = {
        top: 330,
        right: 330,
        bottom: 90,
        left: 350
    };

    otherDirection = true; // Mit Setzen der Variable auf true, werden die enemies gespiegelt, durch Methode addToCanvas

    IMAGES_IDLE = [
        'img/enemies/3_ORK/ORK_03_IDLE_000.png',
        'img/enemies/3_ORK/ORK_03_IDLE_001.png',
        'img/enemies/3_ORK/ORK_03_IDLE_002.png',
        'img/enemies/3_ORK/ORK_03_IDLE_003.png',
        'img/enemies/3_ORK/ORK_03_IDLE_004.png',
        'img/enemies/3_ORK/ORK_03_IDLE_005.png',
        'img/enemies/3_ORK/ORK_03_IDLE_006.png',
        'img/enemies/3_ORK/ORK_03_IDLE_007.png',
        'img/enemies/3_ORK/ORK_03_IDLE_008.png',
        'img/enemies/3_ORK/ORK_03_IDLE_009.png'
    ];

    IMAGES_HURT = [
        'img/enemies/3_ORK/ORK_03_HURT_000.png',
        'img/enemies/3_ORK/ORK_03_HURT_001.png',
        'img/enemies/3_ORK/ORK_03_HURT_002.png',
        'img/enemies/3_ORK/ORK_03_HURT_003.png',
        'img/enemies/3_ORK/ORK_03_HURT_004.png',
        'img/enemies/3_ORK/ORK_03_HURT_005.png',
        'img/enemies/3_ORK/ORK_03_HURT_006.png',
        'img/enemies/3_ORK/ORK_03_HURT_007.png',
        'img/enemies/3_ORK/ORK_03_HURT_008.png',
        'img/enemies/3_ORK/ORK_03_HURT_009.png'
    ];

    IMAGES_DIE = [
        'img/enemies/3_ORK/ORK_03_DIE_000.png',
        'img/enemies/3_ORK/ORK_03_DIE_001.png',
        'img/enemies/3_ORK/ORK_03_DIE_002.png',
        'img/enemies/3_ORK/ORK_03_DIE_003.png',
        'img/enemies/3_ORK/ORK_03_DIE_004.png',
        'img/enemies/3_ORK/ORK_03_DIE_005.png',
        'img/enemies/3_ORK/ORK_03_DIE_006.png',
        'img/enemies/3_ORK/ORK_03_DIE_007.png',
        'img/enemies/3_ORK/ORK_03_DIE_008.png',
        'img/enemies/3_ORK/ORK_03_DIE_009.png'
    ];
    world;
    audio_roar = new Audio('audio/orc_scream.mp3');
    audio_endbossMusic = new Audio('audio/endboss.mp3');
    endbossMusicPlayed = false;
    roarPlayed = false;



    constructor(path) {
        super(path);
        this.loadImage('img/enemies/3_ORK/ORK_03_IDLE_000.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
        this.animate();
        this.audio_roar.volume = 0.3; 
    }
    
        // functions

    animate() { 
        
        setInterval(() => {
            if (this.world && this.world.character && this.world.character.x > 1700 && !this.roarPlayed) {
                this.audio_roar.play();
                this.roarPlayed = true;
            } 
        }, 1000 / 60);
        setInterval(() => {
            if(this.checkIsDead()) {
                this.playAnimation(this.IMAGES_DIE, true);
            } else if(this.checkIfHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100);
    }
}