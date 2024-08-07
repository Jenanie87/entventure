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
        if(this instanceof Character || this instanceof Enemy || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,(this.x + this.width - this.offset.right) - (this.x + this.offset.left),(this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }
    }
}