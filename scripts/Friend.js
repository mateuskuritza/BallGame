class Friend extends AutoMovingBall {

    constructor(positionX, positionY, signalX, signalY) {
        super(positionX, positionY, 20, "green", 6, signalX, signalY);
    }

    isOutOfScreen() {
        return (
            this.positionX < 0 || this.positionX > screenWidth || this.positionY < 0 || this.positionY > screenHeight
        );
    }
}