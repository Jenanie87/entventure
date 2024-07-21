let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard


function init() {
    canvas = document.querySelector('canvas');
    world = new World(canvas, keyboard);
    console.log(world.character);
    console.log(world.level.pinecones);
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

function toggleFullScreen() {
    let content = document.querySelector('.content');
    if(document.fullscreenElement === content) {
        closeFullscreen();
    } else {
        openFullscreen(content);
    }
};

/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
    element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
    element.msRequestFullscreen();
    }
  };
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  };