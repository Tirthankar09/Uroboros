class Player {
    constructor() {

        this.x = 600;
        this.y = 250;

        this.width = 200;
        this.height = 100;

        this.speed = 5;

    }

    update(input) {

        if (input.pressedKeys.has("a")) {
            this.x -= this.speed;
        }

        if (input.pressedKeys.has("d")) {
            this.x += this.speed;
        }
    }

    render(context){
        context.fillStyle = "red";
        context.fillRect(this.x,this.y,this.width,this.height);
    }

}

export default Player;