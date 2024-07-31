class OrcSmallEnemy extends SmallEnemy {
    // properties

    IMAGES_RUN = [
        'img/enemies/Orc/Running/0_Orc_Running_000.png',
        'img/enemies/Orc/Running/0_Orc_Running_001.png',
        'img/enemies/Orc/Running/0_Orc_Running_002.png',
        'img/enemies/Orc/Running/0_Orc_Running_003.png',
        'img/enemies/Orc/Running/0_Orc_Running_004.png',
        'img/enemies/Orc/Running/0_Orc_Running_005.png',
        'img/enemies/Orc/Running/0_Orc_Running_006.png',
        'img/enemies/Orc/Running/0_Orc_Running_007.png',
        'img/enemies/Orc/Running/0_Orc_Running_008.png',
        'img/enemies/Orc/Running/0_Orc_Running_009.png',
        'img/enemies/Orc/Running/0_Orc_Running_010.png',
        'img/enemies/Orc/Running/0_Orc_Running_011.png'
    ];

    IMAGES_HURT = [
        'img/enemies/Orc/Hurt/0_Orc_Hurt_000.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_001.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_002.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_003.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_004.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_005.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_006.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_007.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_008.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_009.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_010.png',
        'img/enemies/Orc/Hurt/0_Orc_Hurt_011.png'
    ];

    IMAGES_DIE = [
        'img/enemies/Orc/Dying/0_Orc_Dying_000.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_001.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_002.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_003.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_004.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_005.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_006.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_007.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_008.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_009.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_010.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_011.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_012.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_013.png',
        'img/enemies/Orc/Dying/0_Orc_Dying_014.png'
    ];

    constructor() {
        super();
        this.loadImage('img/enemies/Orc/Walking/0_Orc_Walking_000.png');
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
        this.animate();
    }
}