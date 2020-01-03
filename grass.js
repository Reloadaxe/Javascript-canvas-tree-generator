class Grass {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.colors = [
            "#428600",
            "#4c9a00",
            "#55ae00",
            "#5fc100",
            "#69d500"
        ];
    }

    draw = () => {
        while(true) {
            let grassParcelSize = 1;
            let random = Math.floor(Math.random() * (this.colors.length + 1));
            context.fillStyle = this.colors[random];
            context.fillRect(this.x, this.y, grassParcelSize, grassParcelSize);
            this.x+=grassParcelSize;
            if (this.x > canvas.width) {
                this.x = 0;
                this.y+=grassParcelSize;
                if (this.y > canvas.height) {
                    break;
                }
            }
        }
    }
}