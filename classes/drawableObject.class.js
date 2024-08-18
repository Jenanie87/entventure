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

    /**
     * This function loads an image from the specified path and assigns it to the img property.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths and caches them.
     * @param {string[]} array - An array of image paths.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function draws the image onto the canvas context at the object's position.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This funciton draws a red rectangle outline around the object if it's an instance of Character, Enemy, or ThrowableObject.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawRect(ctx) {
        if (this instanceof Character || this instanceof Enemy || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, (this.x + this.width - this.offset.right) - (this.x + this.offset.left), (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }
    }
}