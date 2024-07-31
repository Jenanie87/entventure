class Orc1BigEnemy extends BigEnemy {
    // properties

    IMAGES_WALK = [
        'img/enemies/1_ORK/ORK_01_WALK_000.png',
        'img/enemies/1_ORK/ORK_01_WALK_001.png',
        'img/enemies/1_ORK/ORK_01_WALK_002.png',
        'img/enemies/1_ORK/ORK_01_WALK_003.png',
        'img/enemies/1_ORK/ORK_01_WALK_004.png',
        'img/enemies/1_ORK/ORK_01_WALK_005.png',
        'img/enemies/1_ORK/ORK_01_WALK_006.png',
        'img/enemies/1_ORK/ORK_01_WALK_007.png',
        'img/enemies/1_ORK/ORK_01_WALK_008.png',
        'img/enemies/1_ORK/ORK_01_WALK_009.png',
    ];

    IMAGES_HURT = [
        'img/enemies/1_ORK/ORK_01_HURT_000.png',
        'img/enemies/1_ORK/ORK_01_HURT_001.png',
        'img/enemies/1_ORK/ORK_01_HURT_002.png',
        'img/enemies/1_ORK/ORK_01_HURT_003.png',
        'img/enemies/1_ORK/ORK_01_HURT_004.png',
        'img/enemies/1_ORK/ORK_01_HURT_005.png',
        'img/enemies/1_ORK/ORK_01_HURT_006.png',
        'img/enemies/1_ORK/ORK_01_HURT_007.png',
        'img/enemies/1_ORK/ORK_01_HURT_008.png',
        'img/enemies/1_ORK/ORK_01_HURT_009.png'
    ];

    IMAGES_DIE = [
        'img/enemies/1_ORK/ORK_01_DIE_000.png',
        'img/enemies/1_ORK/ORK_01_DIE_001.png',
        'img/enemies/1_ORK/ORK_01_DIE_002.png',
        'img/enemies/1_ORK/ORK_01_DIE_003.png',
        'img/enemies/1_ORK/ORK_01_DIE_004.png',
        'img/enemies/1_ORK/ORK_01_DIE_005.png',
        'img/enemies/1_ORK/ORK_01_DIE_006.png',
        'img/enemies/1_ORK/ORK_01_DIE_007.png',
        'img/enemies/1_ORK/ORK_01_DIE_008.png',
        'img/enemies/1_ORK/ORK_01_DIE_009.png'
    ];

    constructor() {
        super();
        this.loadImage('img/enemies/1_ORK/ORK_01_ATTAK_001.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
        this.animate();
    }
}