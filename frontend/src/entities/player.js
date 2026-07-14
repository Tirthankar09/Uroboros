import GameObject from "./GameObject.js"
class Player extends GameObject {
    constructor() {

        super(100,100,100,100);

        this.speed = 400;

        this.velocityY = 0;

    }

    update(deltaTime, input, groundY) {

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
        
        this.velocityY  += 500 * deltaTime;

        this.y += this.velocityY * deltaTime;  
        
        if(this.y + this.height > groundY) {
            
            this.y = groundY - this.height;
            this.velocityY = 0;

        }
    }

    render(context){

        context.fillStyle = "red";
        context.fillRect(this.x,this.y,this.width,this.height);
    }

}

export default Player;