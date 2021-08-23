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

    checkCollision(another) {
        const distance = Math.sqrt((another.positionX - this.positionX) ** 2 + (another.positionY - this.positionY) ** 2);
        if (distance < another.radius + this.radius) return true;
        return false
    }
}