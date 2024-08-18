/**
 * This function returns the delay for displaying the end screen based on the game status.
 * @param {string} status - The game status which determines the delay.
 * @returns {number} - The delay in milliseconds.
 */
function getEndScreenDelay(status) {
    return this.isGameLost(status) ? 4500 : 3000;
}

/**
 * This function gets the current display style of an element identified by its class name.
 * @param {string} className - The class name of the element.
 * @returns {string} - The display style of the element.
 */
function currentDisplayStyle(className) {
    let screenSources = document.querySelector(`${className}`);
    let cssObj = window.getComputedStyle(screenSources, null);
    return cssObj.getPropertyValue('display');
}

/**
 * This function clears all intervals by iterating through a range of possible interval IDs.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * This function sets the display style of an element identified by its class name.
 * @param {string} className - The class name of the element.
 * @param {string} displayStyle - The display style to set.
 */
function setVisibility(className, displayStyle) {
    const element = document.querySelector(className);
    if (element) {
        element.style.display = displayStyle;
    }
}

/**
 * This function generates HTML for displaying collectable information such as collected coins and killed enemies.
 * @returns {string} - The HTML string with collectable information.
 */
function generateCollectableInfosHTML() {
    return /* HTML */ `
            <div class="coins">Collected Coins ${world.coinbar.collectedCoin} 
                <img class="img_endscreen" src="img/coin/coin_9.png" alt="coin"> 
            </div>
            <div class="enemies">Killed Enemies ${world.killedEnemies} 
                <img class="img_endscreen" src="img/settings/enemy.png" alt="enemy"> 
            </div>`;
}

/**
 * This function updates the visibility of elements based on their current display styles.
 * @param {string} openClass - The class name of the element to potentially hide.
 * @param {string} anotherClass - The class name of another element to potentially hide.
 * @param {string} className - The class name of the element to toggle visibility.
 */
function updateVisibility(openClassCurrentDisplay, anotherClassCurrentDisplay, className, openClass, anotherClass) {
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

/**
 * This function checks if the game status indicates a loss.
 * @param {string} status - The game status to check.
 * @returns {boolean} - Returns true if the status is 'lost', otherwise false.
 */
function isGameLost(status) {
    return status === 'lost';
}