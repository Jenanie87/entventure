let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard
let keyboardListeners = [];
let soundEnabled = true;
let musicEnabled = true;


function startGame() {
    document.querySelector('canvas').classList.remove('d_none');
    document.querySelector('.start_screen').style.display = 'none';
    init();
}

function init() {
    canvas = document.querySelector('canvas');
    enableKeyboard();
    world = new World(canvas, keyboard, soundEnabled, musicEnabled);
    if (musicEnabled) {
        world.audio_bgMusic.play();
    }
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
    switch (event.key) {
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
    switch (event.key) {
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
    if (document.fullscreenElement === content) {
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
    if (img.src.match('misic')) {
        img.src = 'img/settings/music_off.png';
        turnSoundOff();
        soundEnabled = false;
        musicEnabled = false;
    } else {
        img.src = 'img/settings/misic.png';
        turnSoundOn();
        soundEnabled = true;
        musicEnabled = true;
    }
}

function toggleMusic() {
    let img = document.querySelector('.img_music');
    if (img.src.match('sisic')) {
        img.src = 'img/settings/sound_off.png';
        turnMusicOff();
        musicEnabled = false;
    } else {
        img.src = 'img/settings/sisic.png';
        turnMusicOn();
        musicEnabled = true;
    }
}

function turnSoundOff() {
    if (world) {
        world.audio_bgMusic.pause();
        world.level.enemies.forEach(enemy => {
            if (enemy.audio_endbossMusic) {
                enemy.audio_endbossMusic.pause();
            }
            if (enemy.audio_roar) {
                enemy.audio_roar.volume = 0.0;
            }
        });
        world.changeVolume(0.0);
    }
}

function turnSoundOn() {
    if (world) {
        let endbossMusicPlaying = false;
        playMusicEndboss();
        if (!endbossMusicPlaying) {
            world.audio_bgMusic.play();
        }
        world.changeVolume(0.3);
    }
}

function turnMusicOff() {
    if (world) {
        world.audio_bgMusic.pause();
        world.level.enemies.forEach(enemy => {
            if (enemy.endbossMusicPlayed) {
                enemy.audio_endbossMusic.pause();
            }
        });
    }
}

function turnMusicOn() {
    if (world) {
        let endbossMusicPlaying = false;
        playMusicEndboss();
        if (!endbossMusicPlaying) {
            world.audio_bgMusic.play();
        }
    }

}

function playMusicEndboss() {
    if (world) {
        world.level.enemies.forEach(enemy => {
            if (enemy.endbossMusicPlayed) {
                endbossMusicPlaying = true;
                enemy.audio_endbossMusic.play();
            }
        });
    }
}

function setLostScreen(status) {
    setTimeout(() => {
        canvas.classList.add('grayscale');
        setTimeout(() => {
            if (isGameLost(status)) {
                handleLoss();
            }
        }, 1500);
        setTimeout(() => {
            displayEndScreen(status);
        }, getEndScreenDelay(status));
    }, 1000);
}

function handleLoss() {
    world.audio_wasted.play();
    canvas.classList.replace('grayscale', 'redtone');
    document.querySelector('.lost_screen').classList.remove('d_none');
}

function getEndScreenDelay(status) {
    return this.isGameLost(status) ? 4500 : 3000;
}

function displayEndScreen(status) {
    const endscreen = document.querySelector('.endscreen');
    document.querySelector('.lost_screen').classList.add('d_none');
    endscreen.classList.add('show_endscreen');
    endscreen.style.display = 'flex';
    endscreen.style.backgroundImage = status === 'win' ? `url('img/settings/menu_win.png')` : '';
    document.querySelector('.collectableInfos').innerHTML = generateCollectableInfosHTML();
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

function currentDisplayStyle() {
    let screenSources = document.querySelector('.screen_sources');
    let cssObj = window.getComputedStyle(screenSources, null);
    return cssObj.getPropertyValue('display');
}

function toggleSources() {
    let currentDisplay = currentDisplayStyle();
    if (currentDisplay == 'none') {
        document.querySelector('.screen_sources').style.display = 'flex';
    } else {
        document.querySelector('.screen_sources').style.display = 'none';
    }
}

function isGameLost(status) {
    return status === 'lost';
}