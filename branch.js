class Branch {
    constructor(arbreId, pos, size, angle, branchColor, leafColors) {
        this.arbreId = arbreId;
        this.pos = pos;
        this.size = size;
        this.angle = angle;
        this.branchColor = branchColor;
        this.leafColors = leafColors;
    }

    createSubBranches = () => {
        var size = this.size - 4;
        var radians = (this.angle + 90) * Math.PI / 180;
        var x = this.pos.x - this.size * 3 * Math.cos(radians);
        var y = this.pos.y - this.size * 3 * Math.sin(radians);
        arbreLastModified[this.arbreId] = Date.now();
        if (size > 1) {
            context.fillStyle = this.branchColor;
            context.beginPath();
            context.arc(x, y, this.size / 2, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            let branch1 = new Branch(this.arbreId, {x: x, y: y}, size, this.angle + (Math.random() * 30 + 15), this.branchColor, this.leafColors);
            let branch2 = new Branch(this.arbreId, {x: x, y: y}, size, this.angle - (Math.random() * 30 + 15), this.branchColor, this.leafColors);
            branch1.draw();
            branch2.draw();
        } else {
            context.fillStyle = this.leafColors.fill;
            context.strokeStyle = this.leafColors.stroke;
            context.lineWidth = 2;
            context.translate(x, y);
            context.rotate((Math.PI / 180) * this.angle);
            context.translate(-x, -y);

            context.beginPath();
            context.arc(x, y, 20, 0, Math.PI * 2);
            arbreFillPos[this.arbreId].push([x, y, this.angle, this.leafColors.fill]);
            context.arc(x - 20, y, 20, 0, Math.PI * 2);
            context.arc(x + 20, y, 20, 0, Math.PI * 2);
            context.closePath();
            context.stroke();

            context.translate(x, y);
            context.rotate((Math.PI / 180) * -this.angle);
            context.translate(-x, -y);
        }
    }

    draw = () => {
        context.fillStyle = this.branchColor;
        context.translate(this.pos.x, this.pos.y);
        context.rotate((Math.PI / 180) * this.angle);
        context.translate(-this.pos.x, -this.pos.y);

        context.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size * 3, this.size, this.size * 3);

        context.translate(this.pos.x, this.pos.y);
        context.rotate((Math.PI / 180) * -this.angle);
        context.translate(-this.pos.x, -this.pos.y);

        setTimeout(this.createSubBranches, Math.random() * 700 + 100);
    };
}

fillTree = (x, y, angle, fillColor) => {
    context.fillStyle = fillColor;
    context.lineWidth = 2;
    context.translate(x, y);
    context.rotate((Math.PI / 180) * angle);
    context.translate(-x, -y);

    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.arc(x - 20, y, 20, 0, Math.PI * 2);
    context.arc(x + 20, y, 20, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    context.translate(x, y);
    context.rotate((Math.PI / 180) * -angle);
    context.translate(-x, -y);
}