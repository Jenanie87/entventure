class World {

    //properties
    character = new Character(); // Eine Instanz der Klasse Character
    
    // Eigenschaften aus dem Level-Objekt übernehmen
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0; 

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.levelBounds = this.calculateLevelBounds(level1.backgroundObjects);
        this.setWorld();
        this.draw();
    }

    //functions
    setWorld() {
        this.character.world = this;
    }

    calculateLevelBounds(backgroundObjects) {
        let minX = Math.min(...backgroundObjects.map(obj => obj.x));
        let maxX = Math.max(...backgroundObjects.map(obj => obj.x + obj.width));
        return { minX, maxX };
    }

    draw() { // Damit die Welt gezeichnet wird
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // cleart einmal die canvas

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsArrayToCanvas(this.level.backgroundObjects);
        this.addToCanvas(this.character); // Die Funktion kann nun auf ctx zugreifen, um auf weitere Methoden zugreifen zu können
        this.addObjectsArrayToCanvas(this.level.enemies);
        this.addObjectsArrayToCanvas(this.level.foregroundObjects);

        this.ctx.translate(-this.camera_x, 0);
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
        if (MovableObject.otherDirection) {
            this.ctx.save(); // Aktuellen Zustand/Status von ctx speichern
            this.ctx.translate(MovableObject.width, 0); // Ursprung des Koordinatensystems nach rechts verschieben
            this.ctx.scale(-1, 1); // Bild horizontal spiegeln (an der y-Achse)
            MovableObject.x = MovableObject.x * -1; // x-Koordinate invertieren für die Spiegelung
        }
        this.ctx.drawImage(MovableObject.img, MovableObject.x, MovableObject.y, MovableObject.width, MovableObject.height);
        if(MovableObject.otherDirection) { // Bedingung - wenn ctx verändert wurde
            MovableObject.x = MovableObject.x * -1; // x-Koordinate wieder zurückinvertieren
            this.ctx.restore(); // Ursprünglichen Zustand von ctx wiederherstellen
        }
    }
}