class World {
    //properties
    character = new Character(); // Eine Instanz der Klasse Character
    enemies = [
        new Orc(),
        new Orc(),
        new Orc()
    ]; // Ein Array, das Instanzen der Klasse Orc enthält
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }
    //functions
    draw() { // Damit die Welt gezeichnet wird
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height) // Die Funktion kann nun auf ctx zugreifen, um auf weitere Methoden zugreifen zu können
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        });
    }
}