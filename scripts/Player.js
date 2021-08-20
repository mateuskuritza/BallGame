class Player extends Ball {

    constructor() {
        super(screenWidth / 2, screenHeight / 2, 60, "red");
    }

    moveTo(x, y) {
        this.positionX = x;
        this.positionY = y;
    }
}