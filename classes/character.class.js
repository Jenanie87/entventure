class Character extends MovableObject{
    // properties


    constructor() {
        super();
        this.x = -130;
        this.loadImage('img/character/2/Fairy_02__IDLE_000.png');
    }

    // functions
    moveRight() {
        console.log('Moving right')
    }

    jump() {

    }

}