class Pineconebar extends DrawableObject {
    x = 20;
    y = 45;
    width = 200;
    height = 60;

    IMAGES = [
        'img/statusbar/3_statusbar_pinecone/0.png',
        'img/statusbar/3_statusbar_pinecone/20.png',
        'img/statusbar/3_statusbar_pinecone/40.png',
        'img/statusbar/3_statusbar_pinecone/60.png',
        'img/statusbar/3_statusbar_pinecone/80.png',
        'img/statusbar/3_statusbar_pinecone/100.png',
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(10);
    }

    /**
     * Updates the percentage of collected pinecones and changes the displayed image.
     * @param {number} pineconesCollected - The number of pinecones collected.
     */
    setPercentage(pineconesCollected) {
        this.percentage = 100 - (pineconesCollected / 5) * 100;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    /**
     * Determines the index of the image to display based on the percentage.
     * @returns {number} - The index of the image corresponding to the percentage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}