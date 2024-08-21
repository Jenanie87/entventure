class Orc2BigEnemy extends BigEnemy {
    IMAGES_WALK = [
        'img/enemies/2_ORK/ORK_02_WALK_000.png',
        'img/enemies/2_ORK/ORK_02_WALK_001.png',
        'img/enemies/2_ORK/ORK_02_WALK_002.png',
        'img/enemies/2_ORK/ORK_02_WALK_003.png',
        'img/enemies/2_ORK/ORK_02_WALK_004.png',
        'img/enemies/2_ORK/ORK_02_WALK_005.png',
        'img/enemies/2_ORK/ORK_02_WALK_006.png',
        'img/enemies/2_ORK/ORK_02_WALK_007.png',
        'img/enemies/2_ORK/ORK_02_WALK_008.png',
        'img/enemies/2_ORK/ORK_02_WALK_009.png',
    ];

    IMAGES_HURT = [
        'img/enemies/2_ORK/ORK_02_HURT_000.png',
        'img/enemies/2_ORK/ORK_02_HURT_001.png',
        'img/enemies/2_ORK/ORK_02_HURT_002.png',
        'img/enemies/2_ORK/ORK_02_HURT_003.png',
        'img/enemies/2_ORK/ORK_02_HURT_004.png',
        'img/enemies/2_ORK/ORK_02_HURT_005.png',
        'img/enemies/2_ORK/ORK_02_HURT_006.png',
        'img/enemies/2_ORK/ORK_02_HURT_007.png',
        'img/enemies/2_ORK/ORK_02_HURT_008.png',
        'img/enemies/2_ORK/ORK_02_HURT_009.png'
    ];

    IMAGES_DIE = [
        'img/enemies/2_ORK/ORK_02_DIE_000.png',
        'img/enemies/2_ORK/ORK_02_DIE_001.png',
        'img/enemies/2_ORK/ORK_02_DIE_002.png',
        'img/enemies/2_ORK/ORK_02_DIE_003.png',
        'img/enemies/2_ORK/ORK_02_DIE_004.png',
        'img/enemies/2_ORK/ORK_02_DIE_005.png',
        'img/enemies/2_ORK/ORK_02_DIE_006.png',
        'img/enemies/2_ORK/ORK_02_DIE_007.png',
        'img/enemies/2_ORK/ORK_02_DIE_008.png',
        'img/enemies/2_ORK/ORK_02_DIE_009.png'
    ];

    constructor() {
        super();
        this.loadImage('img/enemies/2_ORK/ORK_02_WALK_000.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
    }
}