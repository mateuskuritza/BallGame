class Ball {

    positionX;
    positionY;
    radius;
    color;

    constructor(positionX, positionY, radius, color) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
        context.fill();
    }

    checkCollision(anotherX, anotherY, anotherRadius) {
        const distance = Math.sqrt((anotherX - this.positionX) ** 2 + (anotherY - this.positionY) ** 2);
        if (distance < anotherRadius + this.radius) return true;
        return false
    }
}