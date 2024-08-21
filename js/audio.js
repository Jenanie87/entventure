let endbossMusicPlaying = false;
let soundEnabled = true;
let musicEnabled = true;
let audio_char_walking = new Audio('audio/walking.mp3');
let audio_char_jumping = new Audio('audio/jumping2.mp3');
let audio_char_bouncing = new Audio('audio/boing1.mp3');
let audio_bgMusic = new Audio('audio/bg_nature.mp3');
let audio_wasted = new Audio('audio/wasted.mp3');
let audio_win = new Audio('audio/completed.mp3');

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
        audio_bgMusic.pause();
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
            audio_bgMusic.volume = 0.3;
            audio_bgMusic.play();
        }
        changeVolume(1.0);
    }
}

/**
 * This function stops the background music and endboss music if they exist.
 */
function turnMusicOff() {
    if (world) {
        audio_bgMusic.pause();
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
            audio_bgMusic.volume = 0.3;
            audio_bgMusic.play();
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
 * This function stops all background music by pausing it and resetting its playback position to the start. If an endboss exists in the game, it also stops and resets the endboss music.
 */
function stopMusic() {
    audio_bgMusic.pause();
    audio_bgMusic.currentTime = 0;
    if (world.endboss) {
        world.endboss.audio_endbossMusic.pause();
        world.endboss.audio_endbossMusic.currentTime = 0;
    }
    endbossMusicPlaying = false;
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
    audio_char_jumping.volume = 0.2 * factor;
    audio_char_bouncing.volume = 0.1 * factor;
    audio_char_walking.volume = 0.3 * factor;
}

/**
 * This function updates the volume of background music and win/loss sounds.
 * @param {number} factor - The factor to multiply the base volume levels.
 */
function updateBackgroundMusicVolume(factor) {
    audio_wasted.volume = 0.5 * factor;
    audio_win.volume = 0.3 * factor;
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