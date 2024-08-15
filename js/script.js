let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard
/* let keyboardListeners = []; */
let soundEnabled = true;
let musicEnabled = true;

function startGame() {
    document.querySelector('canvas').classList.remove('d_none');
    setVisibility('.start_screen', 'none');
    init();
}

function restartGame() {
    resetGame();
    resetCanvasEndscreen();
    init();
}

function getBack() {
    resetGame();
    resetCanvasEndscreen();
    document.querySelector('canvas').classList.add('d_none');
    setVisibility('.start_screen', 'flex');
}

function resetGame() {
    if (world) {
        keyboard.disableKeyboard();
    }
    clearAllIntervals();
    world = null;
}

function resetCanvasEndscreen() {
    canvas.classList.remove('grayscale', 'redtone');
    const endscreen = document.querySelector('.endscreen');
    endscreen.classList.remove('show_endscreen');
    endscreen.style.display = 'none';
}

function stopMusic() {
    world.audio_bgMusic.pause();
    world.audio_bgMusic.currentTime = 0;
    if(world.endboss != null) {
        world.endboss.audio_endbossMusic.pause();
        world.endboss.audio_endbossMusic.currentTime = 0;
    }
}

function init() {
    canvas = document.querySelector('canvas');
    keyboard.enableKeyboard();
    createLevel();
    world = new World(canvas, keyboard, soundEnabled, musicEnabled);
    if (musicEnabled) {
        world.audio_bgMusic.play();
    }
}

function toggleFullScreen() {
    let content = document.querySelector('.content');
    if (document.fullscreenElement === content) {
        closeFullscreen();
    } else {
        openFullscreen(content);
    }
};

function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
};

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
    let soundIcons = document.querySelectorAll('.img_sound');
    soundIcons.forEach(img => {
        if (img.src.includes('misic')) {
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
    });
}

function toggleMusic() {
    let musicIcons = document.querySelectorAll('.img_music');
    musicIcons.forEach(img => {
        if (img.src.includes('sisic')) {
            img.src = 'img/settings/sound_off.png';
            turnMusicOff();
            musicEnabled = false;
        } else {
            img.src = 'img/settings/sisic.png';
            turnMusicOn();
            musicEnabled = true;
        }
    });
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
        if (world) {
            world.level.enemies.forEach(enemy => {
                if (enemy.endbossMusicPlayed) {
                    endbossMusicPlaying = true;
                    enemy.audio_endbossMusic.pause();
                }
            });
        }
        canvas.classList.add('grayscale');
        stopMusic();
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


function displayEndScreen(status) {
    const endscreen = document.querySelector('.endscreen');
    document.querySelector('.lost_screen').classList.add('d_none');
    endscreen.classList.add('show_endscreen');
    endscreen.style.display = 'flex';
    endscreen.style.backgroundImage = status === 'win' ? `url('img/settings/menu_win.png')` : '';
    document.querySelector('.collectableInfos').innerHTML = generateCollectableInfosHTML();
}

function toggleScreen(className, openClass, anotherClass) {
    let openClassCurrentDisplay = currentDisplayStyle(openClass);
    let anotherClassCurrentDisplay = currentDisplayStyle(anotherClass);
    if (openClassCurrentDisplay == 'flex') {
        setVisibility(`${openClass}`, 'none');
    }
    if (anotherClassCurrentDisplay == 'flex') {
        setVisibility(`${anotherClass}`, 'none');
    }
    let currentDisplay = currentDisplayStyle(className);
    if (currentDisplay == 'none') {
        setVisibility(`${className}`, 'flex');
    } else {
        setVisibility(`${className}`, 'none');
    }
}

function closeDialog(classNameSource, classNameKeyboard, classNameImpressum) {
    let currentDisplaySource = currentDisplayStyle(classNameSource);
    let currentDisplayKeyboard = currentDisplayStyle(classNameKeyboard);
    let currentDisplayImpressum = currentDisplayStyle(classNameImpressum);
    if (currentDisplaySource == 'flex' || currentDisplayKeyboard == 'flex' || currentDisplayImpressum == 'flex') {
        setVisibility(`${classNameSource}`, 'none');
        setVisibility(`${classNameKeyboard}`, 'none');
        setVisibility(`${classNameImpressum}`, 'none');
    } 
}

function isGameLost(status) {
    return status === 'lost';
}
