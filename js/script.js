let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard
let endbossMusicPlaying = false;
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
    if (world.endboss) {
        world.endboss.audio_endbossMusic.pause();
        world.endboss.audio_endbossMusic.currentTime = 0;
    }
    endbossMusicPlaying = false;
}

function init() {
    canvas = document.querySelector('canvas');
    keyboard.enableKeyboard();
    createLevel();
    world = new World(canvas, keyboard, soundEnabled, musicEnabled);
    initializeSoundVolume();
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
    changeVolume(soundEnabled ? 1.0 : 0.0);
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
        if (world.endboss) {
            world.endboss.audio_endbossMusic.pause();
        }
        changeVolume(0.0);
    }
    endbossMusicPlaying = false; // Auch hier wird die Endboss-Musik als nicht aktiv markiert
}

function turnSoundOn() {
    if (world) {
        playMusicEndboss();
        if (!endbossMusicPlaying) {
            world.audio_bgMusic.volume = 0.3;
            world.audio_bgMusic.play();
        }
        changeVolume(1.0);
    }
}

function turnMusicOff() {
    if (world) {
        world.audio_bgMusic.pause();
        if (world.endboss) {
            world.endboss.audio_endbossMusic.pause();
        }
    }
    endbossMusicPlaying = false; // Auch hier wird die Endboss-Musik als nicht aktiv markiert
}

function turnMusicOn() {
    if (world) {
        playMusicEndboss();
        if (!endbossMusicPlaying) {
            world.audio_bgMusic.volume = 0.3;
            world.audio_bgMusic.play();
        }
    }
}

function playMusicEndboss() {
    if (world && world.endboss) {
        if (!endbossMusicPlaying) {
            endbossMusicPlaying = true;
            world.endboss.audio_endbossMusic.play();
        }
    }
}

function setLostScreen(status) {
    setTimeout(() => {
        pauseEndbossMusic();
        canvas.classList.add('grayscale');
        stopMusic();
        scheduleEndScreenDisplay(status);
    }, 1000);
}

function pauseEndbossMusic() {
    if (world && world.endboss) {
        world.endboss.audio_endbossMusic.pause();
    }
}

function scheduleEndScreenDisplay(status) {
    setTimeout(() => {
        if (isGameLost(status)) {
            handleLoss();
        }
    }, 1500);
    setTimeout(() => {
        displayEndScreen(status);
    }, getEndScreenDelay(status));
}

function handleLoss() {
    world.audio_wasted.volume = 0.5;
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
    updateVisibility(openClassCurrentDisplay, anotherClassCurrentDisplay, className, openClass, anotherClass)
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

function changeVolume(factor) {
    if (!world) return;  // Sicherheitsabfrage, falls world noch nicht initialisiert ist

    world.character.audio_jumping.volume = 0.2 * factor;
    world.character.audio_bouncing.volume = 0.1 * factor;
    world.character.audio_walking.volume = 0.3 * factor;
    world.audio_wasted.volume = 0.5 * factor;
    world.audio_win.volume = 0.3 * factor;

    if (world.endboss) {
        world.endboss.audio_hurt.volume = 0.5 * factor;
        world.endboss.audio_roar.volume = 0.1 * factor;
    }

    world.level.coins.forEach(coin => {
        coin.audio_collecting.volume = 0.2 * factor;
    });

    world.level.pinecones.forEach(pinecone => {
        pinecone.audio_collect.volume = 0.3 * factor;
    });

    world.level.enemies.forEach(enemy => {
        if (enemy.height == 220) {
            enemy.audio_hurt.volume = 0.5 * factor;
        }
        if (enemy.height == 100) {
            enemy.audio_hurt.volume = 0.3 * factor;
        }
    });
}

function initializeSoundVolume() {
    let volumeFactor = soundEnabled ? 1.0 : 0.0;
    changeVolume(volumeFactor);
}



