class ThrowableObject extends MovableObject {
    IMAGES_THROW = [
        'img/pinecone/pinecone_rotation/1_pinecone_rotation.png',
        'img/pinecone/pinecone_rotation/2_pinecone_rotation.png',
        'img/pinecone/pinecone_rotation/3_pinecone_rotation.png',
        'img/pinecone/pinecone_rotation/4_pinecone_rotation.png',
    ];
    world;
    damage = 5;
    offset = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.loadImage('img/pinecone/pinecone_rotation/1_pinecone_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.animate();
    }

    /**
     * Throws the throwable object, applying gravity and horizontal movement.
     */
    throw() {
        if (this.world) {
            this.speedY = 20;
            this.applyGravity();
            setInterval(() => {
                if (this.isMovingRight()) {
                    this.x += 15;
                } else {
                    this.x -= 15;
                }
            }, 30);
        }
    }

    /**
     * Starts the animation for the throwable object while it is above ground.
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround(400)) {
                this.playAnimation(this.IMAGES_THROW);
            }
        }, 100);
    }

    /**
     * Determines if the throwable object is moving to the right based on the character's direction.
     * @returns {boolean} - True if moving right, false otherwise.
     */
    isMovingRight() {
        return !this.world.character.otherDirection && this.world;
    }
}

