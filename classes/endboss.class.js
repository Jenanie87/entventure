class Endboss extends Enemy {
    // properties
    width = 650;
    height = 700;
    y = -175; 
    x = 2400;

    IMAGES_IDLE = [
        'img/enemies/3_ORK/ORK_03_IDLE_000.png',
        'img/enemies/3_ORK/ORK_03_IDLE_001.png',
        'img/enemies/3_ORK/ORK_03_IDLE_002.png',
        'img/enemies/3_ORK/ORK_03_IDLE_003.png',
        'img/enemies/3_ORK/ORK_03_IDLE_004.png',
        'img/enemies/3_ORK/ORK_03_IDLE_005.png',
        'img/enemies/3_ORK/ORK_03_IDLE_006.png',
        'img/enemies/3_ORK/ORK_03_IDLE_007.png',
        'img/enemies/3_ORK/ORK_03_IDLE_008.png',
        'img/enemies/3_ORK/ORK_03_IDLE_009.png',
    ]

    constructor(path) {
        super(path);
        this.loadImage('img/enemies/3_ORK/ORK_03_IDLE_000.png');
        this.loadImages(this.IMAGES_IDLE);
        this.animate(this.IMAGES_IDLE);
    }
    
        // functions

        animate(array) {            
            setInterval(() => {
                let i = this.currentImage % array.length;
                let path = array[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }, 80);
        }

}