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
        'img/enemies/Orc/Running/0_Orc_Running_011.png',
    ]

    constructor() {
        super();
        this.loadImage('img/enemies/Orc/Walking/0_Orc_Walking_000.png');
        this.loadImages(this.IMAGES_RUN);
        this.animate(this.IMAGES_RUN);
    }
}