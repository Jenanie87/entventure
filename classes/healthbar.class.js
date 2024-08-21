class Healthbar extends DrawableObject {
    x = 20;
    y = 5;
    width = 200;
    height = 60;

    IMAGES = [
        'img/statusbar/2_statusbar_health/0.png',
        'img/statusbar/2_statusbar_health/20.png',
        'img/statusbar/2_statusbar_health/40.png',
        'img/statusbar/2_statusbar_health/60.png',
        'img/statusbar/2_statusbar_health/80.png',
        'img/statusbar/2_statusbar_health/100.png',
    ];
    percentage = 80;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(80);
    }

    /**
     * This function sets the character health bar percentage and updates the image based on the percentage.
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
        if (this.percentage == 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}