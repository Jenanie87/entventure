class HealthbarEndboss extends DrawableObject {
    x = 450;
    y = 5;
    width = 250;
    height = 60;

    IMAGES = [
        'img/statusbar/4_statusbar_endboss/0.png',
        'img/statusbar/4_statusbar_endboss/20.png',
        'img/statusbar/4_statusbar_endboss/40.png',
        'img/statusbar/4_statusbar_endboss/60.png',
        'img/statusbar/4_statusbar_endboss/80.png',
        'img/statusbar/4_statusbar_endboss/100.png',
    ];
    percentage = 30;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(30);
    }

    /**
     * This function sets the endboss health bar percentage and updates the image based on the percentage.
     * @param {number} percentage - The percentage of health points.
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
        if (this.percentage == 30) {
            return 5;
        } else if (this.percentage > 24) {
            return 4;
        } else if (this.percentage > 18) {
            return 3;
        } else if (this.percentage > 12) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}