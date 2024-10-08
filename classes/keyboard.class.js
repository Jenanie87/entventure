class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    THROW = false;

    constructor() {
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.bindBtnPressEvents();
        this.bindKeyboardEvents();
    }

    /**
     * This function handles touch start events to update button press states.
     * @param {Event} e - The touch start event.
     */
    handleTouchStart(e) {
        e.preventDefault();
        const target = e.currentTarget;
        if (target === this.btnLeft) {
            this.LEFT = true;
        } else if (target === this.btnRight) {
            this.RIGHT = true;
        } else if (target === this.btnJump) {
            this.SPACE = true;
        } else if (target === this.btnThrow) {
            this.THROW = true;
        }
    }

    /**
     * Handles touch end events to update button release states.
     * @param {Event} e - The touch end event.
     */
    handleTouchEnd(e) {
        e.preventDefault();
        const target = e.currentTarget;
        if (target === this.btnLeft) {
            this.LEFT = false;
        } else if (target === this.btnRight) {
            this.RIGHT = false;
        } else if (target === this.btnJump) {
            this.SPACE = false;
        } else if (target === this.btnThrow) {
            this.THROW = false;
        }
    }

    /**
     * This function binds touch events to button elements for press and release actions.
     */
    bindBtnPressEvents() {
        this.btnLeft = document.querySelector('.btnLeft');
        this.btnRight = document.querySelector('.btnRight');
        this.btnJump = document.querySelector('.btnJump');
        this.btnThrow = document.querySelector('.btnThrow');

        this.btnLeft.addEventListener('touchstart', this.handleTouchStart);
        this.btnLeft.addEventListener('touchend', this.handleTouchEnd);
        this.btnRight.addEventListener('touchstart', this.handleTouchStart);
        this.btnRight.addEventListener('touchend', this.handleTouchEnd);
        this.btnJump.addEventListener('touchstart', this.handleTouchStart);
        this.btnJump.addEventListener('touchend', this.handleTouchEnd);
        this.btnThrow.addEventListener('touchstart', this.handleTouchStart);
        this.btnThrow.addEventListener('touchend', this.handleTouchEnd);
    }

    /**
     * Binds keyboard events for key down and key up actions.
     */
    bindKeyboardEvents() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    /**
     * Handles key down events to update keyboard input states.
     * @param {KeyboardEvent} event - The key down event.
     */
    handleKeyDown(event) {
        event.preventDefault();
        switch (event.key) {
            case 'ArrowRight':
                this.RIGHT = true;
                break;
            case 'ArrowLeft':
                this.LEFT = true;
                break;
            case 'ArrowUp':
                this.UP = true;
                break;
            case 'ArrowDown':
                this.DOWN = true;
                break;
            case ' ':
                this.SPACE = true;
                break;
            case 'd':
            case 'D':
                this.THROW = true;
                break;
        }
    }

    /**
     * Handles key up events to update keyboard input states.
     * @param {KeyboardEvent} event - The key up event.
     */
    handleKeyUp(event) {
        event.preventDefault();
        switch (event.key) {
            case 'ArrowRight':
                this.RIGHT = false;
                break;
            case 'ArrowLeft':
                this.LEFT = false;
                break;
            case 'ArrowUp':
                this.UP = false;
                break;
            case 'ArrowDown':
                this.DOWN = false;
                break;
            case ' ':
                this.SPACE = false;
                break;
            case 'd':
            case 'D':
                this.THROW = false;
                break;
        }
    }

    /**
     * This function disables all keyboard and touch event listeners and resets button states.
     */
    disableKeyboard() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);

        this.btnLeft.removeEventListener('touchstart', this.handleTouchStart);
        this.btnLeft.removeEventListener('touchend', this.handleTouchEnd);
        this.btnRight.removeEventListener('touchstart', this.handleTouchStart);
        this.btnRight.removeEventListener('touchend', this.handleTouchEnd);
        this.btnJump.removeEventListener('touchstart', this.handleTouchStart);
        this.btnJump.removeEventListener('touchend', this.handleTouchEnd);
        this.btnThrow.removeEventListener('touchstart', this.handleTouchStart);
        this.btnThrow.removeEventListener('touchend', this.handleTouchEnd);

        this.LEFT = this.RIGHT = this.UP = this.DOWN = this.SPACE = this.THROW = false;
    }


    /**
     * Enables all keyboard and touch event listeners.
     */
    enableKeyboard() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);

        this.btnLeft.addEventListener('touchstart', this.handleTouchStart);
        this.btnLeft.addEventListener('touchend', this.handleTouchEnd);
        this.btnRight.addEventListener('touchstart', this.handleTouchStart);
        this.btnRight.addEventListener('touchend', this.handleTouchEnd);
        this.btnJump.addEventListener('touchstart', this.handleTouchStart);
        this.btnJump.addEventListener('touchend', this.handleTouchEnd);
        this.btnThrow.addEventListener('touchstart', this.handleTouchStart);
        this.btnThrow.addEventListener('touchend', this.handleTouchEnd);
    }
}
