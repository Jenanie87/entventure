class Pinecone extends MovableObject {
    //properties
    y = 330;
    minDistance = 100;
    offset = {
        top: 70,
        right: 50,
        bottom: 20,
        left: 50
    };

    IMAGES = [
        'img/pinecone/1_pinecone_on_ground.png',
        'img/pinecone/2_pinecone_on_ground.png',
    ];

    constructor(index) {
        super();
        this.index = index;
        this.audio_collect.volume = 0.3;
        this.width = 150;
        this.height = 150;
        this.loadImage('img/pinecone/1_pinecone_on_ground.png');
        this.loadImages(this.IMAGES);
        this.animate();
    }
    audio_collect = new Audio('audio/collect.mp3');
    world;

    //functions

    /**
     * Sets a random position for the pinecone, ensuring it doesn't collide with other pinecones.
     */
    setRandomPosition() {
        const maxAttempts = 100;
        let attempts = 0;
        let colliding;
        do {
            this.x = 200 + Math.floor(Math.random() * 2500);
            colliding = this.checkCollisionWithOtherPinecones();
            attempts++;
        } while (colliding && attempts < maxAttempts);
    }

    /**
     * Checks if the pinecone collides with other pinecones in the world.
     * @returns {boolean} - True if collision is detected, false otherwise.
     */
    checkCollisionWithOtherPinecones() {
        if (!this.world) return false;
        for (let pinecone of this.world.level.pinecones) {
            if (this.isCollisionCandidate(pinecone)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Starts the animation loop for the pinecone.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }

    /**
     * Collects the pinecone, updates the world state, and plays the collect sound.
     */
    collectPinecone() {
        if (this.hasThrowableObjects()) {
            this.world.level.pinecones.splice(this.index, 1);
            this.world.level.pinecones.forEach((pinecone, index) => {
                pinecone.index = index;
            });
            this.world.throwableObjects.pop();
            this.setCollectPineconeVolumes();
            this.audio_collect.play();
        }
    }

    /**
     * Checks if there are throwable objects in the world.
     * @returns {boolean} - True if there are throwable objects, false otherwise.
     */
    hasThrowableObjects() {
        return !this.world.throwableObjects.length <= 0;
    }

    /**
     * Determines if the pinecone is a collision candidate with another pinecone.
     * @param {Pinecone} pinecone - The other pinecone to check for collision.
     * @returns {boolean} - True if this pinecone is a collision candidate, false otherwise.
     */
    isCollisionCandidate(pinecone) {
        return this !== pinecone && this.isTooClose(pinecone);
    }

    /**
     * Checks if the distance between this pinecone and another pinecone is less than the minimum distance.
     * @param {Pinecone} pinecone - The other pinecone to check against.
     * @returns {boolean} - True if the pinecones are too close, false otherwise.
     */
    isTooClose(pinecone) {
        return Math.abs(this.x - pinecone.x) < this.minDistance;
    }

    /**
     * Sets the volume of the collect sound based on the sound icons in the UI.
     */
    setCollectPineconeVolumes() {
        let soundIcons = document.querySelectorAll('.img_sound');
        soundIcons.forEach(img => {
            if (img.src.includes('misic.png')) {
                this.audio_collect.volume = 0.3;
            } else {
                this.audio_collect.volume = 0.0;
            }
        });
    }
}