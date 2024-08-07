class Pinecone extends MovableObject {
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
    audio_collect = new Audio('audio/collect.mp3');

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
    world;

    setRandomPosition() {
        const maxAttempts = 100; // Maximalversuche, um eine passende Position zu finden
        let attempts = 0;
        let colliding;
        do {
            // Setze eine zufällige x-Position zwischen 200 und 2200 (200 + 2000)
            this.x = 200 + Math.floor(Math.random() * 2000);
            // Prüfe, ob diese Position mit einer anderen Pinecone kollidiert
            colliding = this.checkCollisionWithOtherPinecones();
            // Erhöhe den Versuchszähler
            attempts++;
        // Wiederhole, wenn es eine Kollision gibt und die maximale Anzahl von Versuchen noch nicht erreicht wurde
        } while (colliding && attempts < maxAttempts);
    }

    checkCollisionWithOtherPinecones() {
        if (!this.world) return false; // Wenn kein Bezug zur Welt besteht, gibt es keine Kollision
        for (let pinecone of this.world.level.pinecones) {
            // Überprüfe jedes andere Pinecone-Objekt in der Welt
            if (this !== pinecone && this.isTooClose(pinecone)) {
                return true; // Kollision gefunden
            }
        }
        return false; // Keine Kollision
    }

    isTooClose(pinecone) {
        return Math.abs(this.x - pinecone.x) < this.minDistance;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 500);
    }

    collectPinecone() {
        if(!this.world.throwableObjects.length <= 0) {
            this.world.level.pinecones.splice(this.index, 1);
            this.world.level.pinecones.forEach((pinecone, index) => {
                pinecone.index = index;
            });
            this.world.throwableObjects.pop();
            this.audio_collect.play();
        }
    }
}