class GoblinSmallEnemy extends SmallEnemy {
    IMAGES_RUN = [
        'img/enemies/Goblin/Running/0_Goblin_Running_000.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_001.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_002.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_003.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_004.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_005.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_006.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_007.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_008.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_009.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_010.png',
        'img/enemies/Goblin/Running/0_Goblin_Running_011.png',
    ];

    IMAGES_HURT = [
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_000.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_001.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_002.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_003.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_004.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_005.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_006.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_007.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_008.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_009.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_010.png',
        'img/enemies/Goblin/Hurt/0_Goblin_Hurt_011.png'
    ];

    IMAGES_DIE = [
        'img/enemies/Goblin/Dying/0_Goblin_Dying_000.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_001.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_002.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_003.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_004.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_005.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_006.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_007.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_008.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_009.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_010.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_011.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_012.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_013.png',
        'img/enemies/Goblin/Dying/0_Goblin_Dying_014.png'
    ];

    constructor() {
        super();
        this.loadImage('img/enemies/Goblin/Walking/0_Goblin_Walking_000.png');
        this.loadImages(this.IMAGES_RUN);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
    }
}