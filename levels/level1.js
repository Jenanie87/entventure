const level1 = new Level([
    new Orc1BigEnemy(),
    new Orc1BigEnemy(),
    new Orc2BigEnemy(),
    new OrcSmallEnemy(),
    new GoblinSmallEnemy(),
    new Endboss(),
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

    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Sky.png', 720*3),
    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/BG_Decor.png', 720*3),
    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Middle_Decor.png', 720*3),
    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Foreground.png', 720*3),
],
[
    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 0),
    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 720),
    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 720 * 2),
    new BackgroundObject('img/background/Cartoon_Forest_BG_01/Layers/Ground.png', 720*3),
]
);
