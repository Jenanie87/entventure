class Character extends MovableObject {
    // properties
    currentImage = 0;

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

    constructor() {
        super();
        this.x = -130;
        this.loadImage('img/character/2/Fairy_02__IDLE_000.png');
        this.loadImages(this.IMAGES_WALK);
        this.animate();
    }

    // functions
    moveRight() {
        console.log('Moving right')
    }







    jump() {

    }

}