function getEndScreenDelay(status) {
    return this.isGameLost(status) ? 4500 : 3000;
}

function currentDisplayStyle(className) {
    let screenSources = document.querySelector(`${className}`);
    let cssObj = window.getComputedStyle(screenSources, null);
    return cssObj.getPropertyValue('display');
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  function setVisibility(className, displayStyle) {
    const element = document.querySelector(className);
    if (element) {
        element.style.display = displayStyle;
    }
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

function updateVisibility (openClassCurrentDisplay, anotherClassCurrentDisplay, className, openClass, anotherClass) {
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

function isGameLost(status) {
    return status === 'lost';
}