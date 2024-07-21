class ThrowableObject extends MovableObject {
    IMAGES_THROW = [
        'img/pinecone/pinecone_rotation/1_pinecone_rotation.png',
        'img/pinecone/pinecone_rotation/2_pinecone_rotation.png',
        'img/pinecone/pinecone_rotation/3_pinecone_rotation.png',
        'img/pinecone/pinecone_rotation/4_pinecone_rotation.png',
    ];
    collected = 0;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.loadImage('img/pinecone/pinecone_rotation/1_pinecone_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.animate();
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        }, 30);
    }

    animate() {
        setInterval(() => {
            if(this.isAboveGround(400)) {
                this.playAnimation(this.IMAGES_THROW);
            }
        }, 100);
    }
}