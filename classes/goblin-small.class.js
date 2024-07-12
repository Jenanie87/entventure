class GoblinSmallEnemy extends SmallEnemy {
    // properties

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

    constructor() {
        super();
        this.loadImage('img/enemies/Goblin/Walking/0_Goblin_Walking_000.png');
        this.loadImages(this.IMAGES_RUN);
        this.animate();
    }
}