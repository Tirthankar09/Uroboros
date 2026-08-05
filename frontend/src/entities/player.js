import GameObject from "./GameObject.js"
import Camera from "../camera/Camera.js"

class Player extends GameObject {
    constructor(assets) {

        super(100,100,90,200);
        this.spriteWidth = 400;
        this.spriteHeight = 370;
        this.spriteOffsetX = -155;
        this.spriteOffsetY = -88;

        this.speed = 500;

        this.velocityX = 0;
        this.velocityY = 0;

        this.isGrounded = false;

        this.animations = {

            idle : [assets.get("idle2"),assets.get("idle3"),assets.get("idle4"),assets.get("idle5"),assets.get("idle6"),assets.get("idle7"),assets.get("idle8"),assets.get("idle9")],
            run : [assets.get("run2"),assets.get("run3"),assets.get("run4"),assets.get("run5"),assets.get("run6"),assets.get("run7"),assets.get("run8")],
            jump : [assets.get("jump1")],
            fall : [assets.get("fall1")]
        };

        this.currentAnimation = this.animations.idle;
        this.currentFrame = 0;
        this.frameDuration = 0.1;
        this.animationTimer = 0;
        
        this.facing = 1;

        this.state = "IDLE";

        this.coyoteTimer = 0;
        this.coyoteDuration = 0.15;

    }

    update(deltatime, input, groundY, gameWidth, platforms) { 
 
        this.previousY = this.y;
        this.handleInput(deltatime, input);
        this.applyGravity(deltatime);
        this.move(deltatime);
        this.isGrounded = false; 
        this.checkGroundCollision(groundY);
        for(const platform of platforms) {
                this.checkPlatformCollision(platform);
            }
        this.checkWallCollision(gameWidth);
        this.updateCoyoteTime(deltatime);
        this.updateState();
        this.animationUpdate();
        
        this.animationTimer += deltatime;
        if(this.animationTimer >= this.frameDuration){
            this.currentFrame++;
            this.animationTimer = 0;
            if(this.currentFrame >= this.currentAnimation.length) {
                this.currentFrame = 0;
            }
        }
        

    }

    render(context,camera){
        
        if(this.facing === 1) {

        context.drawImage(this.currentAnimation[this.currentFrame], (this.x-camera.x)+this.spriteOffsetX, this.y+this.spriteOffsetY, this.spriteWidth, this.spriteHeight);
        }
        else{

            context.save();
            context.scale(-1,1);
            context.drawImage(this.currentAnimation[this.currentFrame], -(this.x-camera.x)-this.spriteWidth - this.spriteOffsetX, this.y + this.spriteOffsetY, this.spriteWidth, this.spriteHeight);
            context.restore();

        }
    }

    handleInput(deltatime, input) {

        this.velocityX = 0;
        
        if (input.pressedKeys.has("a")) {
            this.velocityX -= this.speed;
            this.facing = -1;
        }

        if (input.pressedKeys.has("d")) {
            this.velocityX += this.speed;
            this.facing = 1;
        }

        if (input.justPressedKeys.has(" ") && this.coyoteTimer > 0) {

            this.velocityY = -400 * 1.5;
            this.coyoteTimer = 0;
            this.isGrounded = false;
        }

    }

        applyGravity(deltatime) {

            this.velocityY  += 500 *2* deltatime;

        }

        move(deltatime) {

            this.x += this.velocityX * deltatime;
            this.y += this.velocityY * deltatime;

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
        
        const wasAbovePlatform = this.previousY + this.height <= platform.y;
        const isTouchingTop = this.y + this.height >= platform.y;
        const isOverlappingX = this.x + this.width > platform.x && this.x < platform.x + platform.width;
        const isFalling = this.velocityY > 0;

        if(isTouchingTop && isOverlappingX && isFalling && wasAbovePlatform) {

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

    updateState() {
        if(!this.isGrounded) {
            if(this.velocityY < 0) {
                this.state = "JUMP";
            }
            else{
                this.state = "FALL";
            }
        }
        else{
            if(this.velocityX === 0) {
                this.state = "IDLE";
            }
            else{
                this.state = "RUN";
            }
        }
    }

    animationUpdate() {
        switch (this.state) {
            case "IDLE":
                this.changeAnimation(this.animations.idle);
                break;
            case "RUN":
                this.changeAnimation(this.animations.run);
                break;
            case "JUMP":
                this.changeAnimation(this.animations.jump);
                break;
            case "FALL":
                this.changeAnimation(this.animations.fall);
                break;
        }
    }

    updateCoyoteTime(deltatime) {
        
        if (this.isGrounded === true) {
            this.coyoteTimer = this.coyoteDuration;
        }
        else {
            this.coyoteTimer -= deltatime
        }
    }

}

export default Player;