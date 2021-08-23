class Player extends Ball {

    constructor() {
        super(screenWidth / 2, screenHeight / 2, 60, "red");
    }

    moveTo(x, y) {
        this.positionX = x;
        this.positionY = y;

        if (x > screenWidth) this.positionX = screenWidth;
        if (y > screenHeight) this.positionY = screenHeight;
        if (x < 0) this.positionX = 0;
        if (y < 0) this.positionY = 0;
    }
}