let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard
let endbossMusicPlaying = false;
let soundEnabled = true;
let musicEnabled = true;

/**
 * This function starts the game by making the canvas visible, hiding the start screen, and initializing the game.
 */
function startGame() {
    document.querySelector('canvas').classList.remove('d_none');
    setVisibility('.start_screen', 'none');
    init();
}

/**
 * This function restarts the game by resetting the game state and canvas end screen, and then reinitializing the game.
 */
function restartGame() {
    resetGame();
    resetCanvasEndscreen();
    init();
}

/**
 * This function returns the game to the start screen by resetting the game state and canvas end screen, hiding the canvas, and showing the start screen.
 */
function getBack() {
    resetGame();
    resetCanvasEndscreen();
    document.querySelector('canvas').classList.add('d_none');
    setVisibility('.start_screen', 'flex');
}

/**
 * This function resets the game by clearing all intervals, disabling the keyboard if a game world exists, and setting the game world to null.
 */
function resetGame() {
    if (world) {
        keyboard.disableKeyboard();
    }
    clearAllIntervals();
    world = null;
}

/**
 * This function resets the canvas end screen by removing any applied grayscale or redtone effects, hiding the end screen element, and setting its display property to 'none'.
 */
function resetCanvasEndscreen() {
    canvas.classList.remove('grayscale', 'redtone');
    const endscreen = document.querySelector('.endscreen');
    endscreen.classList.remove('show_endscreen');
    endscreen.style.display = 'none';
}

/**
 * This function stops all background music by pausing it and resetting its playback position to the start. If an endboss exists in the game, it also stops and resets the endboss music.
 */
function stopMusic() {
    world.audio_bgMusic.pause();
    world.audio_bgMusic.currentTime = 0;
    if (world.endboss) {
        world.endboss.audio_endbossMusic.pause();
        world.endboss.audio_endbossMusic.currentTime = 0;
    }
    endbossMusicPlaying = false;
}

/**
 * This function initializes the game by setting up the canvas, enabling keyboard controls, creating the game level, and creating a new game world with sound and music settings.
 */
function init() {
    canvas = document.querySelector('canvas');
    keyboard.enableKeyboard();
    createLevel();
    world = new World(canvas, keyboard, soundEnabled, musicEnabled);
    initializeSoundVolume();
}

/**
 * This function toggles the game view between fullscreen and normal mode. It checks if the content element is currently in fullscreen mode and exits if so; otherwise, it enters fullscreen mode.
 */
function toggleFullScreen() {
    let content = document.querySelector('.content');
    if (document.fullscreenElement === content) {
        closeFullscreen();
    } else {
        openFullscreen(content);
    }
}

/**
 * This function requests fullscreen mode for the given element, handling different browser implementations.
 */
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
};

/**
 * This function exits fullscreen mode, handling different browser implementations.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
};

/**
 * This function toggles the sound state by changing the source of sound icons, updating sound settings, and changing volume.
 */
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

/**
 * This function toggles the music state by changing the source of music icons and updating the music settings.
 */
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

/**
 * This function stops the background music and endboss music if they exist, and sets the endboss music state to false.
 */
function turnSoundOff() {
    if (world) {
        world.audio_bgMusic.pause();
        if (world.endboss) {
            world.endboss.audio_endbossMusic.pause();
        }
        changeVolume(0.0);
    }
    endbossMusicPlaying = false; 
}

/**
 * This function starts the background music and endboss music if they exist, and sets the volume to 0.3.
 */
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

/**
 * This function stops the background music and endboss music if they exist.
 */
function turnMusicOff() {
    if (world) {
        world.audio_bgMusic.pause();
        if (world.endboss) {
            world.endboss.audio_endbossMusic.pause();
        }
    }
    endbossMusicPlaying = false; 
}

/**
 * This function starts the background music and endboss music if they exist and sets the volume to 0.3.
 */
function turnMusicOn() {
    if (world) {
        playMusicEndboss();
        if (!endbossMusicPlaying) {
            world.audio_bgMusic.volume = 0.3;
            world.audio_bgMusic.play();
        }
    }
}

/**
 * This function plays the endboss music if it exists and is not already playing.
 */
function playMusicEndboss() {
    if (world && world.endboss) {
        if (!endbossMusicPlaying) {
            endbossMusicPlaying = true;
            world.endboss.audio_endbossMusic.play();
        }
    }
}

/**
 * This function sets up the lost screen display by pausing the endboss music, applying grayscale effect, stopping music, and scheduling end screen display.
 * @param {string} status - The status indicating if the game was won or lost.
 */
function setLostScreen(status) {
    setTimeout(() => {
        pauseEndbossMusic();
        canvas.classList.add('grayscale');
        stopMusic();
        scheduleEndScreenDisplay(status);
    }, 1000);
}

/**
 * This function pauses the endboss music if it exists.
 */
function pauseEndbossMusic() {
    if (world && world.endboss) {
        world.endboss.audio_endbossMusic.pause();
    }
}

/**
 * This function schedules the display of the end screen based on the game status.
 * @param {string} status - The status indicating if the game was won or lost.
 */
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

/**
 * This function handles the game loss by playing a loss sound, applying a red tone effect, and showing the lost screen.
 */
function handleLoss() {
    world.audio_wasted.volume = 0.5;
    world.audio_wasted.play();
    canvas.classList.replace('grayscale', 'redtone');
    document.querySelector('.lost_screen').classList.remove('d_none');
}

/**
 * This function displays the end screen with the appropriate image and collects info based on game status.
 * @param {string} status - The status indicating if the game was won or lost.
 */
function displayEndScreen(status) {
    const endscreen = document.querySelector('.endscreen');
    document.querySelector('.lost_screen').classList.add('d_none');
    endscreen.classList.add('show_endscreen');
    endscreen.style.display = 'flex';
    endscreen.style.backgroundImage = status === 'win' ? `url('img/settings/menu_win.png')` : '';
    document.querySelector('.collectableInfos').innerHTML = generateCollectableInfosHTML();
}

/**
 * This function toggles the visibility of elements by updating their display styles based on their current states.
 * @param {string} className - The class name of the element to toggle.
 * @param {string} openClass - The class to apply if the element should be visible.
 * @param {string} anotherClass - The class to apply if the element should be hidden.
 */
function toggleScreen(className, openClass, anotherClass) {
    let openClassCurrentDisplay = currentDisplayStyle(openClass);
    let anotherClassCurrentDisplay = currentDisplayStyle(anotherClass);
    updateVisibility(openClassCurrentDisplay, anotherClassCurrentDisplay, className, openClass, anotherClass)
}

/**
 * This function closes dialogs by setting their visibility to 'none' if any of them are currently visible.
 * @param {string} classNameSource - The class name of the source dialog.
 * @param {string} classNameKeyboard - The class name of the keyboard dialog.
 * @param {string} classNameImpressum - The class name of the impressum dialog.
 */
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

/**
 * This function changes the volume of various audio elements in the game based on a given factor.
 * @param {number} factor - The factor to multiply the base volume levels.
 */
function changeVolume(factor) {
    if (!world) return;
    updateCharacterAudioVolumes(factor);
    updateBackgroundMusicVolume(factor);
    updateCoinAudioVolumes(factor);
    updatePineconeAudioVolumes(factor);
    updateEnemyAudioVolumes(factor);
}

/**
 * This function updates the volume of character-related audio elements.
 * @param {number} factor - The factor to multiply the base volume levels.
 */
function updateCharacterAudioVolumes(factor) {
    world.character.audio_jumping.volume = 0.2 * factor;
    world.character.audio_bouncing.volume = 0.1 * factor;
    world.character.audio_walking.volume = 0.3 * factor;
}

/**
 * This function updates the volume of background music and win/loss sounds.
 * @param {number} factor - The factor to multiply the base volume levels.
 */
function updateBackgroundMusicVolume(factor) {
    world.audio_wasted.volume = 0.5 * factor;
    world.audio_win.volume = 0.3 * factor;
}

/**
 * This function updates the volume of coin collection sounds.
 * @param {number} factor - The factor to multiply the base volume levels.
 */
function updateCoinAudioVolumes(factor) {
    world.level.coins.forEach(coin => {
        coin.audio_collecting.volume = 0.2 * factor;
    });
}

/**
 * This function updates the volume of pinecone collection sounds.
 * @param {number} factor - The factor to multiply the base volume levels.
 */
function updatePineconeAudioVolumes(factor) {
    world.level.pinecones.forEach(pinecone => {
        pinecone.audio_collect.volume = 0.3 * factor;
    });
}

/**
 * This function updates the volume of enemy hurt sounds based on enemy height.
 * @param {number} factor - The factor to multiply the base volume levels.
 */
function updateEnemyAudioVolumes(factor) {
    world.level.enemies.forEach(enemy => {
        if (enemy.height == 220) {
            enemy.audio_hurt.volume = 0.5 * factor;
        }
        if (enemy.height == 100) {
            enemy.audio_hurt.volume = 0.3 * factor;
        }
    });
}

/**
 * This function initializes the sound volume based on whether sound is enabled.
 */
function initializeSoundVolume() {
    let volumeFactor = soundEnabled ? 1.0 : 0.0;
    changeVolume(volumeFactor);
}



