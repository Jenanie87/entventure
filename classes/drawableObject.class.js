class DrawableObject {
    // properties
    x;
    y = 280;
    width = 450;
    height = 175;
    img;
    imageCache = {};
    currentImage = 0;

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawRect(ctx) {
        if(this instanceof Character || this instanceof Enemy || this instanceof ThrowableObject || this instanceof Pinecone || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';

            let offsetX = this.x + this.offset.left;
            let offsetY = this.y + this.offset.top;
            let offsetWidth = this.width - this.offset.left - this.offset.right;
            let offsetHeight = this.height - this.offset.top - this.offset.bottom;
            ctx.rect(offsetX, offsetY, offsetWidth, offsetHeight);
            ctx.stroke();
        }
    }
}