class World {
    //properties
    character = new Character(); // Eine Instanz der Klasse Character
    enemies = [
        new Orc('img/orc/1_ORK/ORK_01_WALK_000.png'),
        new Orc('img/orc/2_ORK/ORK_02_WALK_000.png'),
        new Orc('img/orc/3_ORK/ORK_03_WALK_000.png')
    ]; // Ein Array, das Instanzen der Klasse Orc enthält
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
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height) // Die Funktion kann nun auf ctx zugreifen, um auf weitere Methoden zugreifen zu können
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        });

        //draw wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }
}