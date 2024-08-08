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
    setRandomPosition() {
        const maxAttempts = 100;
        let attempts = 0;
        let colliding;
        do {
            this.x = 200 + Math.floor(Math.random() * 2000);
            colliding = this.checkCollisionWithOtherPinecones();
            attempts++;
        } while (colliding && attempts < maxAttempts);
    }

    checkCollisionWithOtherPinecones() {
        if (!this.world) return false;
        for (let pinecone of this.world.level.pinecones) {
            if (this.isCollisionCandidate(pinecone)) {
                return true;
            }
        }
        return false;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }

    collectPinecone() {
        if (this.hasThrowableObjects()) {
            this.world.level.pinecones.splice(this.index, 1);
            this.world.level.pinecones.forEach((pinecone, index) => {
                pinecone.index = index;
            });
            this.world.throwableObjects.pop();
            this.audio_collect.play();
        }
    }

    hasThrowableObjects() {
        return !this.world.throwableObjects.length <= 0;
    }

    isCollisionCandidate(pinecone) {
        return this !== pinecone && this.isTooClose(pinecone);
    }

    isTooClose(pinecone) {
        return Math.abs(this.x - pinecone.x) < this.minDistance;
    }
}