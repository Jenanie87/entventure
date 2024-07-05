class World {

    //properties
    character = new Character(); // Eine Instanz der Klasse Character
    enemies = [
        new Enemy('img/enemies/1_ORK/ORK_01_WALK_000.png', 450, 200, 266),
        new Enemy('img/enemies/2_ORK/ORK_02_WALK_000.png', 450, 200, 266),
        new Enemy('img/enemies/1_ORK/ORK_01_WALK_000.png', 450, 200, 266),
        new Enemy('img/enemies/Orc/Walking/0_Orc_Walking_000.png', 100, 100, 360),
        new Enemy('img/enemies/Goblin/Walking/0_Goblin_Walking_000.png', 100, 100, 360),
    ]; // Ein Array, das Instanzen der Klasse Enemy enthält
    backgroundObjects = [
        new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Sky.png'),
        new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png'),
        new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png'),
        new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png'),
        ,
    ]; // Ein Array, das Instanzen der Klasse Background enthält
    foregroundObject = new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png');
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    //functions
    draw() { // Damit die Welt gezeichnet wird
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart einmal die canvas
        this.addObjectsArrayToCanvas(this.backgroundObjects);
        this.addToCanvas(this.character); // Die Funktion kann nun auf ctx zugreifen, um auf weitere Methoden zugreifen zu können
        this.addObjectsArrayToCanvas(this.enemies);
        this.addToCanvas(this.foregroundObject);

        //draw wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }

    addObjectsArrayToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
    });
    }

    addToCanvas(MovableObject) {
        this.ctx.drawImage(MovableObject.img, MovableObject.x, MovableObject.y, MovableObject.width, MovableObject.height);
    }
}