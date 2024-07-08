let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard

function init() {
    canvas = document.querySelector('canvas');
    world = new World(canvas, keyboard);
}


document.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if(event.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    } 
    if(event.key == 'ArrowUp') {
        keyboard.UP = true;
    } 
    if(event.key == 'ArrowDown') {
        keyboard.DOWN = true;
    } 
    if(event.key == ' ') {
        keyboard.SPACE = true;
    } 
    if(event.key == 'd') {
        keyboard.THROW = true;
    } 
});

document.addEventListener('keyup', (event) => {
    if(event.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if(event.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    } 
    if(event.key == 'ArrowUp') {
        keyboard.UP = false;
    } 
    if(event.key == 'ArrowDown') {
        keyboard.DOWN = false;
    } 
    if(event.key == ' ') {
        keyboard.SPACE = false;
    } 
    if(event.key == 'd') {
        keyboard.THROW = false;
    } 
});