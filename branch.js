class Branch {
    constructor(treeId, pos, size, angle, branchColor, leafColors, hasFruits) {
        this.treeId = treeId;
        this.pos = pos;
        this.size = size;
        this.angle = angle;
        this.branchColor = branchColor;
        this.leafColors = leafColors;
        this.hasFruits = hasFruits;
    }

    createSubBranches = () => {
        var size = this.size - (Math.random() * 4 + 4);
        var radians = (this.angle + 90) * Math.PI / 180;
        var x = this.pos.x - this.size * 3 * Math.cos(radians);
        var y = this.pos.y - this.size * 3 * Math.sin(radians);
        treeLastModified[this.treeId] = Date.now();
        if (size > 1) {
            context.fillStyle = this.branchColor;
            context.beginPath();
            context.arc(x, y, this.size / 2, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            let branch1 = new Branch(this.treeId, {x: x, y: y}, size, this.angle + (Math.random() * 30 + 15), this.branchColor, this.leafColors, this.hasFruits);
            let branch2 = new Branch(this.treeId, {x: x, y: y}, size, this.angle - (Math.random() * 30 + 15), this.branchColor, this.leafColors, this.hasFruits);
            branch1.draw();
            branch2.draw();
        } else {
            context.fillStyle = this.leafColors.fill;
            context.strokeStyle = this.leafColors.stroke;
            context.translate(x, y);
            context.rotate((Math.PI / 180) * this.angle);
            context.translate(-x, -y);

            context.beginPath();
            context.arc(x, y, 20, 0, Math.PI * 2);
            context.arc(x - 20, y, 20, 0, Math.PI * 2);
            context.arc(x + 20, y, 20, 0, Math.PI * 2);
            context.closePath();
            context.fill();

            if (this.hasFruits) {
                let random1 = Math.floor(Math.random() * 3);
                let random2 = Math.floor(Math.random() * 3); 
                context.fillStyle = "red";
                context.beginPath();
                if (random1 == 1) {
                    let fruit;
                    if (random2 == 0) {
                        fruit = new Fruit({x: x, y: y}, {x: x, y: y}, this.angle);
                    } else if (random2 == 1) {
                        fruit = new Fruit({x: x - 10, y: y}, {x: x, y: y}, this.angle);
                    } else {
                        fruit = new Fruit({x: x + 10, y: y}, {x: x, y: y}, this.angle);
                    }
                    setTimeout(fruit.grow, Math.random() * 100 + 20);
                }
                context.closePath();
                context.fill();
            }

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