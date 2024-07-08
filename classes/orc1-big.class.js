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

    constructor() {
        super();
        this.loadImage('img/enemies/1_ORK/ORK_01_ATTAK_001.png');
        this.loadImages(this.IMAGES_WALK);
        this.animate(this.IMAGES_WALK);
    }
}