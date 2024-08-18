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

    percentage = 60;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(60);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.percentage >= 60) {
            return 5;
        } else if (this.percentage > 48) {
            return 4;
        } else if (this.percentage > 36) {
            return 3;
        } else if (this.percentage > 24) {
            return 2;
        } else if (this.percentage > 12) {
            return 1;
        } else {
            return 0;
        }
    }
}