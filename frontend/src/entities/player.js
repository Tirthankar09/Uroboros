class Player {
    constructor() {

        this.x = 960;
        this.y = 540;

        this.width = 200;
        this.height = 100;

        this.speed = 400;

    }

    update(deltaTime, input) {

        if (input.pressedKeys.has("a")) {
            this.x -= this.speed * deltaTime;
        }

        if (input.pressedKeys.has("d")) {
            this.x += this.speed * deltaTime;
        }

        if (input.pressedKeys.has("s")) {
            this.y += this.speed * deltaTime;
        }

        if (input.pressedKeys.has("w")) {
            this.y -= this.speed * deltaTime;
        }
    }

    render(context){

        context.fillStyle = "red";
        context.fillRect(this.x,this.y,this.width,this.height);
    }

}

export default Player;