import GameObject from "./GameObject.js"

class Player extends GameObject {
    constructor() {

        super(100,100,100,100);

        this.speed = 400;

        this.velocityY = 0;

    }

    update(deltaTime, input, groundY, gameWidth) {  
        
        this.groundY = false;
        this.handleInput(deltaTime, input);
        this.applyGravity(deltaTime);
        this.checkGroundCollision(groundY);
        this.checkWallCollision(gameWidth);

    }

    render(context){

        context.fillStyle = "red";
        context.fillRect(this.x,this.y,this.width,this.height);
    }

    handleInput(deltaTime, input) {

        if (input.pressedKeys.has("a")) {
            this.x -= this.speed * deltaTime;
        }

        if (input.pressedKeys.has("d")) {
            this.x += this.speed * deltaTime;
        }

        if (input.justPressedKeys.has("w") && this.isGround === true) {

            this.velocityY = -400;

            this.isGround = false;
        }

    }

    applyGravity(deltaTime) {

        this.velocityY  += 500 * deltaTime;

        this.y += this.velocityY * deltaTime;

    }

    checkGroundCollision(groundY) {

        if(this.y + this.height > groundY) {

            this.y = groundY - this.height;

            this.velocityY = 0;

            this.isGround = true;

        }

    }

    checkWallCollision(gameWidth) {

        if(this.x<0) {
            this.x = 0;
        }

        if(this.x + this.width > gameWidth) {

            this.x = gameWidth - this.width;
        }
    }

}

export default Player;