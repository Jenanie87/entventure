class World {

    //properties
    character = new Character(); // Eine Instanz der Klasse Character
    healthbar = new Healthbar();
    coinbar = new Coinbar();
    pineconebar = new Pineconebar();
    throwableObjects = [new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject(), new ThrowableObject()];
    // Eigenschaften aus dem Level-Objekt übernehmen
    level = level1;
    canvas;
    ctx;
    keyboard;
    isThrowing = false;
    canThrow = true;
    camera_x = 0; 
    audio_bgMusic = new Audio('audio/bg_nature.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.levelBounds = this.calculateLevelBounds(level1.backgroundObjects);
        this.setWorld();
        this.draw();
        this.run();
        this.playBgMusicLoop();
    }

    //functions
    setWorld() {
        this.character.world = this;
        this.level.pinecones.forEach((pinecone) => {
            pinecone.world = this;
            pinecone.setRandomPosition();
        });
        this.level.coins.forEach((coin) => {
            coin.world = this;
        });
        this.level.enemies.forEach(enemy => enemy.world = this); 
        this.throwableObjects.forEach(object => object.world = this); 
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthbar.setPercentage(this.character.healthPoints);
            };
        })
        this.level.pinecones.forEach((pinecone) => {
            if(this.character.isColliding(pinecone)) {
                pinecone.collectPinecone();
                this.pineconebar.setPercentage(this.throwableObjects.length);
            }
        })
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                coin.collectCoin(index);
            }
        })
    }

    checkThrowObjects() {
        if(this.keyboard.THROW && this.canThrow) {
            if(this.throwableObjects.length < 10) {
                let pinecone = new ThrowableObject(this.character.x + 200, this.character.y + 70);
                pinecone.world = this;
                this.throwableObjects.push(pinecone);
                this.pineconebar.setPercentage(this.throwableObjects.length - 1);
                pinecone.throw();
                this.isThrowing = true;
                setTimeout(() => {
                    console.log("Creating new pinecone after delay");
                    this.createNewPinecone();  
                }, 5000);
            }
            this.canThrow = false;
            setTimeout(() => {
                this.canThrow = true;
            }, 500);
        } else {
            this.isThrowing = false;
        }
    }

    createNewPinecone() {
        let newIndex = this.level.pinecones.length;
        let newPinecone = new Pinecone(newIndex);
        newPinecone.world = this;
        newPinecone.setRandomPosition();
        this.level.pinecones.push(newPinecone);
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
        this.addObjectsArrayToCanvas(this.throwableObjects);
        this.addObjectsArrayToCanvas(this.level.enemies);
        this.addObjectsArrayToCanvas(this.level.pinecones);
        this.addObjectsArrayToCanvas(this.level.coins);
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

    playBgMusicLoop() {
        this.audio_bgMusic.volume = 0.2;
        this.audio_bgMusic.loop = true;
/*         this.audio_bgMusic.load(); */
        this.audio_bgMusic.play();
    }
}