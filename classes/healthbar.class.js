class Healthbar extends DrawableObject {
    //properties
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

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }

    //functions
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}