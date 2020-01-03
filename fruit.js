class Fruit {
    constructor(rotatePos, pos, angle) {
        this.pos = pos;
        this.rotatePos = rotatePos;
        this.angle = angle;
        this.size = 0;
    }

    grow = () => {
        this.size += 0.1;
        this.draw();
        if (Math.random() * 2 <= 1.9 && this.size < 10) {
            setTimeout(this.grow, Math.random() * 100 + 20);
        }
    }

    draw = () => {
        context.translate(this.rotatePos.x, this.rotatePos.y);
        context.rotate((Math.PI / 180) * this.angle);
        context.translate(-this.rotatePos.x, -this.rotatePos.y);

        context.beginPath();
        context.fillStyle = "red";
        context.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
        context.closePath();
        context.fill();

        context.translate(this.rotatePos.x, this.rotatePos.y);
        context.rotate((Math.PI / 180) * -this.angle);
        context.translate(-this.rotatePos.x, -this.rotatePos.y);
    }
}