import GameObject from "./GameObject.js"
import Camera from "../camera/Camera.js"
class Player extends GameObject {
    constructor() {

        super(100,100,100,100);

        this.speed = 400;

        this.velocityY = 0;

        this.isGrounded = false;

    }

    update(deltaTime, input, groundY, gameWidth, platforms) {  

        
        
        
        this.applyGravity(deltaTime);
        this.checkGroundCollision(groundY);
        this.checkWallCollision(gameWidth);
        for(const platform of platforms) {
                this.checkPlatformCollision(platform);
            }
        this.handleInput(deltaTime, input);
        

    }

    render(context,camera){

        context.fillStyle = "red";
        context.fillRect(this.x - camera.x,this.y,this.width,this.height);
    }

    handleInput(deltaTime, input) {

        if (input.pressedKeys.has("a")) {
            this.x -= this.speed * deltaTime;
        }

        if (input.pressedKeys.has("d")) {
            this.x += this.speed * deltaTime;
        }

        if (input.justPressedKeys.has(" ") && this.isGrounded) {

            this.velocityY = -400 * 1.5;

            this.isGrounded = false;
        }

    }

    applyGravity(deltaTime) {

        this.velocityY  += 500 *2* deltaTime;

        this.y += this.velocityY * deltaTime;

    }

    checkGroundCollision(groundY) {

        if(this.y + this.height > groundY) {

            this.y = groundY - this.height;

            this.velocityY = 0;

            this.isGrounded = true;

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

    checkPlatformCollision(platform) {
        const isTouchingTop = this.y + this.height >= platform.y;
        const isOverlappingX = this.x + this.width > platform.x && this.x < platform.x + platform.width;
        const isFalling = this.velocityY > 0;
        const isAbovePlatform = this.y < platform.y;

        if(isTouchingTop && isOverlappingX && isFalling && isAbovePlatform) {

            this.y = platform.y - this.height;
            this.velocityY = 0;
            this.isGrounded = true;
        }
        
    }

}

export default Player;