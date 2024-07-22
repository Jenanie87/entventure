class Pinecone extends DrawableObject {
    y = 330;
    minDistance = 100;
    offset = {
        top: 70,
        right: 25,
        bottom: 20,
        left: 60
    };

    constructor(path) {
        super();
        this.width = 150;
        this.height = 150;
        this.loadImage(path);
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

/*         if (attempts >= maxAttempts) {
            console.warn("Konnte keine gültige Position für Pinecone finden");
        } */
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
}