import GameObject from "./GameObject.js"
import Camera from "../camera/Camera.js"

class Player extends GameObject {
    constructor(assets) {

        super(100,100,400,300);

        this.speed = 500;

        this.velocityX = 0;
        this.velocityY = 0;

        this.isGrounded = false;

        this.animations = {

            idle : [assets.get("idle1"),assets.get("idle2"),assets.get("idle3"),assets.get("idle4"),assets.get("idle5"),assets.get("idle6"),assets.get("idle7"),assets.get("idle8"),assets.get("idle9")],
            run : [assets.get("run2"),assets.get("run3"),assets.get("run4"),assets.get("run5"),assets.get("run6"),assets.get("run7"),assets.get("run8")],
        };

        this.currentAnimation = this.animations.idle;
        this.currentFrame = 0;
        this.animationTimer -= this.frameDuration;
        this.frameDuration = 0.1;

    }

    update(deltaTime, input, groundY, gameWidth, platforms) { 
         
        this.handleInput(deltaTime, input);
        this.applyGravity(deltaTime);
        this.move(deltaTime);
        this.isGrounded = false;
        this.checkGroundCollision(groundY);
        for(const platform of platforms) {
                this.checkPlatformCollision(platform);
            }
        this.checkWallCollision(gameWidth);
            

        

        if (this.velocityX === 0) {
            this.changeAnimation(this.animations.idle);
        }
        else {
            this.changeAnimation(this.animations.run);
        }
        this.animationTimer += deltaTime;
        if(this.animationTimer >= this.frameDuration){
            this.currentFrame++;
            this.animationTimer = 0;
            if(this.currentFrame >= this.currentAnimation.length) {
                this.currentFrame = 0;
            }
        }
        

    }

    render(context,camera){

        context.drawImage(this.currentAnimation[this.currentFrame],this.x-camera.x,this.y,this.width,this.height);
    }

    handleInput(deltaTime, input) {

        this.velocityX = 0;
        
        if (input.pressedKeys.has("a")) {
            this.velocityX -= this.speed;
        }

        if (input.pressedKeys.has("d")) {
            this.velocityX += this.speed;
        }

        if (input.justPressedKeys.has(" ") && this.isGrounded) {

            this.velocityY = -400 * 1.5;

            this.isGrounded = false;
        }

    }

        applyGravity(deltaTime) {

            this.velocityY  += 500 *2* deltaTime;

        }

        move(deltaTime) {

            this.x += this.velocityX * deltaTime;
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

    changeAnimation(animation){

        if (animation !== this.currentAnimation) {
            this.currentAnimation = animation;
            this.currentFrame = 0;
            this.animationTimer = 0;
        }
    }

}

export default Player;