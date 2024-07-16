class World {

    //properties
    character = new Character(); // Eine Instanz der Klasse Character
    healthbar = new Healthbar();
    coinbar = new Coinbar();
    pineconebar = new Pineconebar();
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
        this.checkCollisions();
    }

    //functions
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => enemy.world = this); 
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.healthbar.setPercentage(this.character.healthPoints);
                };
            })
        }, 200);
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

        this.ctx.translate(-this.camera_x, 0); // Back
        // Space for fixed Objects
        this.addToCanvas(this.healthbar);
        this.addToCanvas(this.coinbar);
        this.addToCanvas(this.pineconebar);
        this.ctx.translate(this.camera_x, 0); //Forwards
        
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
            this.flipImage(MovableObject);
        }
        MovableObject.draw(this.ctx);
        MovableObject.drawRect(this.ctx);
        if(MovableObject.otherDirection) { // Bedingung - wenn ctx verändert wurde
            this.flipImageBack(MovableObject);
        }
    }

    flipImage(object) {
        this.ctx.save(); // Aktuellen Zustand/Status von ctx speichern
        this.ctx.translate(object.width, 0); // Ursprung des Koordinatensystems nach rechts verschieben
        this.ctx.scale(-1, 1); // Bild horizontal spiegeln (an der y-Achse)
        object.x = object.x * -1; // x-Koordinate invertieren für die Spiegelung
    }

    flipImageBack(object) {
        object.x = object.x * -1; // x-Koordinate wieder zurückinvertieren
        this.ctx.restore(); // Ursprünglichen Zustand von ctx wiederherstellen
    }
}