class MovableObject {
    // properties
    x;
    y = 280;
    width = 450;
    height = 200;
    img;
    imageCache = {};

    constructor() {

    }

    // functions
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image')<img id="image"> oder document.createElement('img')
        this.img.src = path; //Hiermit würde Pfad in die src geladen <img src=path>
    }

    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALK.length;
            let path = this.IMAGES_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }

    moveLeft() {
        console.log('Moving left');
    }

}