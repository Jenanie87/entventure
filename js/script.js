let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard
let keyboardListeners = [];


function startGame() {
    document.querySelector('canvas').classList.remove('d_none');
    document.querySelector('.start_screen').style.display = 'none';
    init();
}

function init() {
    canvas = document.querySelector('canvas');
    enableKeyboard();
    world = new World(canvas, keyboard);
    world.audio_bgMusic.play();
}

function disableKeyboard() {
    keyboardListeners = [
        { event: 'keydown', listener: handleKeyDown },
        { event: 'keyup', listener: handleKeyUp }
    ];
    keyboardListeners.forEach(({ event, listener }) => window.removeEventListener(event, listener));

    // Reset
    Object.keys(world.keyboard).forEach(key => world.keyboard[key] = false);
}

function enableKeyboard() {
    keyboardListeners.forEach(({ event, listener }) => window.addEventListener(event, listener));
}

function handleKeyDown(event) {
    switch(event.key) {
        case 'ArrowRight':
            world.keyboard.RIGHT = true;
            break;
        case 'ArrowLeft':
            world.keyboard.LEFT = true;
            break;
        case 'ArrowUp':
            world.keyboard.UP = true;
            break;
        case 'ArrowDown':
            world.keyboard.DOWN = true;
            break;
        case ' ':
            world.keyboard.SPACE = true;
            break;
        case 'd':
        case 'D':
            world.keyboard.THROW = true;
            break;
    }
}

function handleKeyUp(event) {
    switch(event.key) {
        case 'ArrowRight':
            world.keyboard.RIGHT = false;
            break;
        case 'ArrowLeft':
            world.keyboard.LEFT = false;
            break;
        case 'ArrowUp':
            world.keyboard.UP = false;
            break;
        case 'ArrowDown':
            world.keyboard.DOWN = false;
            break;
        case ' ':
            world.keyboard.SPACE = false;
            break;
        case 'd':
        case 'D':
            world.keyboard.THROW = false;
            break;
    }
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

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
    world.level.enemies.forEach(enemy => {
        if (enemy.audio_endbossMusic) {
            enemy.audio_endbossMusic.pause();
        }
        if (enemy.audio_roar) {
            enemy.audio_roar.volume = 0.0;
        }
    });
    changeVolume(0.0);
  }

  function turnSoundOn() {
    let endbossMusicPlaying = false;
    playMusicEndboss();
    if (!endbossMusicPlaying) {
        world.audio_bgMusic.play();
    }
    changeVolume(0.3);
  }

  function turnMusicOff() {
    world.audio_bgMusic.pause();
    world.level.enemies.forEach(enemy => {
        if (enemy.endbossMusicPlayed) {
            enemy.audio_endbossMusic.pause();
        }
    });
  }
  
  function turnMusicOn() {
    let endbossMusicPlaying = false;
    playMusicEndboss();
    
    if (!endbossMusicPlaying) {
        world.audio_bgMusic.play();
    }
  }

  function changeVolume(volume) {
    world.character.audio_jumping.volume = volume;
    world.character.audio_bouncing.volume = volume;
    world.audio_roar.volume = volume;
    world.character.audio_walking.volume = volume;
    world.audio_wasted.volume = volume;
    world.level.coins.forEach(coin => {
        coin.audio_collecting.volume = volume;
    });
    world.level.pinecones.forEach(pinecone => {
        pinecone.audio_collect.volume = volume;
    });
  }

  function playMusicEndboss() {
    world.level.enemies.forEach(enemy => {
        if (enemy.endbossMusicPlayed) {
            endbossMusicPlaying = true;
            enemy.audio_endbossMusic.play();
        }
    });
  }

    function setLostScreen(status) {
        setTimeout(() => {
            canvas.classList.add('grayscale');
            setTimeout(() => {
                if (status === 'lost') {
                    world.audio_wasted.play();
                    canvas.classList.replace('grayscale', 'redtone');
                    document.querySelector('.lost_screen').classList.remove('d_none');
                }
            }, 1500);
            setTimeout(() => {
                const endscreen = document.querySelector('.endscreen');
                document.querySelector('.lost_screen').classList.add('d_none');
                endscreen.classList.add('show_endscreen');
                endscreen.style.display = 'flex';
                endscreen.style.backgroundImage = status === 'win' ? `url('img/settings/menu_win.png')` : '';
                document.querySelector('.collectableInfos').innerHTML = generateCollectableInfosHTML();
            }, status === 'lost' ? 4000 : 3000);
        }, 1000);
    }

    function generateCollectableInfosHTML() {
        return /* HTML */ `
            <div class="coins">Collected Coins ${world.coinbar.collectedCoin} 
                <img class="img_endscreen" src="img/coin/coin_9.png" alt="coin"> 
            </div>
            <div class="enemies">Killed Enemies ${world.killedEnemies} 
                <img class="img_endscreen" src="img/settings/enemy.png" alt="enemy"> 
            </div>`;
    }
