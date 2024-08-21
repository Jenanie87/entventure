let canvas;
let world; // Erstellung des Objektes World
let keyboard = new Keyboard(); // Erstellung der Instanz Keyboard


/**
 * This function starts the game by making the canvas visible, hiding the start screen, and initializing the game.
 */
function startGame() {
    document.querySelector('canvas').classList.remove('d_none');
    setVisibility('.start_screen', 'none');
    initializeSoundVolume();
    keyboard.enableKeyboard();
}

/**
 * This function restarts the game by resetting the game state and canvas end screen, and then reinitializing the game.
 */
function restartGame() {
    resetGame();
    resetCanvasEndscreen();
    initializeSoundVolume();
    keyboard.enableKeyboard();
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
 * This function initializes the game by setting up the canvas, enabling keyboard controls, creating the game level, and creating a new game world with sound and music settings.
 */
function init() {
    canvas = document.querySelector('canvas');

    createLevel();
    world = new World(canvas, keyboard, soundEnabled, musicEnabled);
    startGame();
    startEnemiesAnimations();
}

function startEnemiesAnimations() {
    world.level.enemies.forEach(enemy => enemy.animate());
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
    setSoundLoss();
    audio_wasted.play();
    canvas.classList.replace('grayscale', 'redtone');
    document.querySelector('.lost_screen').classList.remove('d_none');
}

function setSoundLoss() {
    let soundIcons = document.querySelectorAll('.img_sound');
    soundIcons.forEach(img => {
        if (img.src.includes('misic.png')) {
            audio_wasted.volume = 0.5;
        } else {
            audio_wasted.volume = 0.0;
        }
    });
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







