let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard


function init() {
    canvas = document.querySelector('canvas');
    world = new World(canvas, keyboard);
/*     console.log(world.character); */
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

  function toggleSound() {
    let img = document.querySelector('.img_sound');
    if(img.src.match('misic')) {
        img.src = 'img/settings/music_off.png';
        turnSoundOff();
    } else {
        img.src = 'img/settings/misic.png';
        turnSoundOn();
    }
  }

  function toggleMusic() {
    let img = document.querySelector('.img_music');
    if(img.src.match('sisic')) {
        img.src = 'img/settings/sound_off.png';
        turnMusicOff();
    } else {
        img.src = 'img/settings/sisic.png';
        turnMusicOn();
    }
  }

  function turnSoundOff() {
    world.audio_bgMusic.pause();
    world.character.audio_jumping.volume = 0.0;
    world.character.audio_walking.volume = 0.0;
    world.level.coins.forEach(coin => {
        coin.audio_collecting.volume = 0.0;
    });
    world.level.enemies[world.level.enemies.length - 1].audio_roar.volume = 0.0;
  }

  function turnSoundOn() {
    world.audio_bgMusic.play();
    world.character.audio_jumping.volume = 0.3;
    world.character.audio_walking.volume = 0.3;
    world.level.coins.forEach(coin => {
        coin.audio_collecting.volume = 0.3;
    });
    world.level.enemies[world.level.enemies.length - 1].audio_roar.volume = 0.3;
  }

  function turnMusicOff() {
    world.audio_bgMusic.pause();
  }
  
  function turnMusicOn() {
    world.audio_bgMusic.play();
  }