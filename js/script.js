let canvas;
let world; // Erstellung des Objektes World

function init() {
    canvas = document.querySelector('canvas');
    world = new World(canvas);

/*     console.log('My Character is', world.character);
    console.log(`The "Enemy" Orc is`, world.enemies); */
}