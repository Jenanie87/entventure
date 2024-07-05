class World {
    //properties
    character = new Character(); // Eine Instanz der Klasse Character
    enemies = [
        new Orc('img/orc/1_ORK/ORK_01_WALK_000.png'),
        new Orc('img/orc/2_ORK/ORK_02_WALK_000.png'),
        new Orc('img/orc/3_ORK/ORK_03_WALK_000.png')
    ]; // Ein Array, das Instanzen der Klasse Orc enthält
    background = [
        new Background('img/background/Cartoon_Forest_BG_01/Layers/Sky.png', 0),
        new Background('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 0),
        new Background('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 0),
        new Background('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png', 0),
        new Background('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 0),
    ];
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
        this.background.forEach(background => {
            this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height)
        });
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height); // Die Funktion kann nun auf ctx zugreifen, um auf weitere Methoden zugreifen zu können
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height)
        });

        //draw wird immer wieder aufgerufen
        requestAnimationFrame(() => {
            this.draw();
        });
    }
}