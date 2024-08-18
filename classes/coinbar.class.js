class Coinbar extends DrawableObject {
    //properties
    x = 20;
    y = 45;
    width = 200;
    height = 60;
    collectedCoin = 0;

    IMAGES = [
        'img/statusbar/1_statusbar_coin/0.png',
        'img/statusbar/1_statusbar_coin/20.png',
        'img/statusbar/1_statusbar_coin/40.png',
        'img/statusbar/1_statusbar_coin/60.png',
        'img/statusbar/1_statusbar_coin/80.png',
        'img/statusbar/1_statusbar_coin/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.collectedCoin);
    }

    //functions

    /**
     * This function sets the coin bar percentage and updates the image based on the percentage.
     * @param {number} percentage - The percentage of collected coins.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Determines the image index based on the current percentage.
     * @returns {number} - The index of the image corresponding to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 20) {
            return 5;
        } else if (this.percentage >= 16) {
            return 4;
        } else if (this.percentage >= 12) {
            return 3;
        } else if (this.percentage >= 8) {
            return 2;
        } else if (this.percentage >= 4) {
            return 1;
        } else {
            return 0;
        }
    }
}