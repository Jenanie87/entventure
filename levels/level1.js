let level1;

function createLevel() {
    level1 = new Level(
        [
            new Orc1BigEnemy(),
            new Orc1BigEnemy(),
            new Orc2BigEnemy(),
            new Orc2BigEnemy(),
            new OrcSmallEnemy(),
            new OrcSmallEnemy(),
            new GoblinSmallEnemy(),
        ],

        Array.from({ length: 5 }, (_, index) => new Pinecone(index)),
        [
            new Coin(500, 250),
            new Coin(550, 200),
            new Coin(600, 150),
            new Coin(600, 320),
            new Coin(650, 150),
            new Coin(650, 320),
            new Coin(700, 200),
            new Coin(750, 250),

            new Coin(1150, 300),
            new Coin(1250, 275),

            new Coin(1600, 235),
            new Coin(1600, 175),

            new Coin(1700, 235),
            new Coin(1700, 175),

            new Coin(1800, 235),
            new Coin(1800, 175),

            new Coin(2150, 320),
            new Coin(2225, 320),
            new Coin(2300, 320),
            new Coin(2375, 320),
        ],

        [
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Sky.png', 0),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 0),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 0),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png', 0),

            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Sky.png', 720),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 720),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 720),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png', 720),

            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Sky.png', 720 * 2),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 720 * 2),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 720 * 2),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png', 720 * 2),

            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Sky.png', 720 * 3),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 720 * 3),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 720 * 3),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png', 720 * 3),

            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Sky.png', 720 * 4),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 720 * 4),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 720 * 4),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png', 720 * 4),
        ],
        [
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 0),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 720),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 720 * 2),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 720 * 3),
            new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 720 * 4),
        ]
    );
}

