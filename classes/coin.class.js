class Coin extends MovableObject {
    // properties
    height = 50;

    offset = {
        top: 0,
        right: 30,
        bottom: 0,
        left: 30
    };

    widthMapping = {
        0: 50, // img_1 
        1: 45, // img_2
        2: 37.5, // img_3
        3: 30, // img_4
        4: 25, // img_5
        5: 12.5, // img_6 
        6: 25, // img_7
        7: 30, // img_8
        8: 37.5, // img_9
        9: 45  // img_10 
    };

    IMAGES = [
        'img/coin/coin_1.png',
        'img/coin/coin_2.png',
        'img/coin/coin_3.png',
        'img/coin/coin_4.png',
        'img/coin/coin_5.png',
        'img/coin/coin_6.png',
        'img/coin/coin_7.png',
        'img/coin/coin_8.png',
        'img/coin/coin_9.png',
        'img/coin/coin_10.png'
    ];
    world;
    audio_collecting = new Audio('audio/coin.mp3');

    constructor(x, y) {
        super();
        this.audio_collecting.volume = 0.2;
        this.x = x;
        this.y = y;
        this.loadImage('img/coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.animate();
    }

    //functions

    /**
     * This function initializes the animation intervals for the coin and adjusts its width.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
            this.adjustWidth();
        }, 90);
    }

    /**
     * Adjusts the coin's width based on the current image index.
     */
    adjustWidth() {
        let currentImageIndex = this.currentImage % this.IMAGES.length;
        this.width = this.widthMapping[currentImageIndex];
    }

    /**
     * This function plays the coin collection sound and removes the coin from the world.
     * @param {number} index - The index of the coin to remove from the world.
     */
    collectCoin(index) {
        this.audio_collecting.play();
        this.world.level.coins.splice(index, 1);
    }
}