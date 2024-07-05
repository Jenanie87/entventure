class MovableObject {
    // properties
    x;
    y = 280;
    width = 450;
    height = 200;
    img;

    constructor() {

    }

    // functions
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image')<img id="image"> oder document.createElement('img')
        this.img.src = path; //Hiermit würde Pfad in die src geladen <img src=path>
    }

    moveLeft() {
        console.log('Moving left'); 
    }

}