import GameObject from "./GameObject";

class Enemy extends GameObject {
    constructor(assets) {

        super(500,50,100,210);
        this.spriteOffsetX = -150;
        this.spriteOffsetY = -114;
        this.spriteWidth = 400;
        this.spriteHeight = 400;
        this.health = 100;
        this.animations = {idle : [assets.get("enemyIdle1"), assets.get("enemyIdle2"), assets.get("enemyIdle3"), assets.get("enemyIdle4"), assets.get("enemyIdle5"), assets.get("enemyIdle6"), assets.get("enemyIdle7"), assets.get("enemyIdle8"), assets.get("enemyIdle9"), assets.get("enemyIdle10")],
            attack : [assets.get("enemyAttack1"), assets.get("enemyAttack3"), assets.get("enemyAttack5"), assets.get("enemyAttack7"), assets.get("enemyAttack9"), assets.get("enemyAttack10"), assets.get("enemyAttack11"), assets.get("enemyAttack12"), assets.get("enemyAttack13"), assets.get("enemyAttack14"), assets.get("enemyAttack15")]
        };
        this.currentAnimation = this.animations.idle;
        this.currentFrame = 0;
        this.frameDuration = 0.1;
        this.animationTimer = 0;
        this.velocityY = 0;
        this.velocityX = 0;
        this.state = "IDLE"
        this.isGrounded = false;
        this.hitFlashTimer = 0;
        this.hitFlashDuration = 0.1;
    }

    update(deltatime,groundY,platforms) {

        this.isGrounded = false;
        this.previousY = this.y;
        if(this.hitFlashTimer > 0) {
            this.hitFlashTimer  -= deltatime;
        }

        this.applyGravity(deltatime);
        this.move(deltatime);
        this.checkGroundCollision(groundY);
        for (const platform of platforms) {
            this.checkPlatformCollision(platform);
        }

        this.animationTimer += deltatime;
        if(this.animationTimer >= this.frameDuration) {
            this.currentFrame++;
            this.animationTimer = 0;
            if (this.currentFrame >= this.currentAnimation.length) {
                this.currentFrame = 0;
            }
        }

        this.updateState();
        this.AnimationUpdate();

    }

    render(context,camera) {

        if (!this.isDead() || this.hitFlashTimer  > 0) {
            if(this.hitFlashTimer > 0) {
                context.filter = "brightness(0) invert(1)";
            }
            
            context.drawImage(this.currentAnimation[this.currentFrame], this.x - camera.x + this.spriteOffsetX, this.y + this.spriteOffsetY, this.spriteWidth, this.spriteHeight);
            context.filter = "none";
        };
    }

    takeDamage(damage){
        this.health -= damage;
        this.hitFlashTimer = this.hitFlashDuration;
    }

    isDead(){
        return this.health<=0;
    }

    applyGravity(deltatime) {
        this.velocityY += 500 * 3.3 * deltatime;
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

    checkPlatformCollision(platform) {
        const wasAbovePlatform = this.previousY + this.height <= platform.y;
        const isTouchingTop = this.y + this.height >= platform.y;
        const isOverlappingX = this.x + this.width > platform.x && this.x < platform.x + platform.width;
        const isFalling = this.velocityY > 0;

        if(wasAbovePlatform && isTouchingTop && isOverlappingX && isFalling) {
            this.y = platform.y - this.height;
            this.velocityY = 0
            this.isGrounded = true;
        }

    }

    changeAnimation(animation) {
        if(this.currentAnimation !== animation) {
            this.currentAnimation = animation;
            this.currentFrame = 0;
            this.animationTimer = 0
        }
    }

    updateState() {
        if(this.isGrounded) {
            this.state = "ATTACK";
        }
        else{
            this.state = "IDLE"
        }
    }
    AnimationUpdate() {
        switch(this.state) {
            case "IDLE": 
                this.changeAnimation(this.animations.idle);
                break;
            case "ATTACK":
                this.changeAnimation(this.animations.attack);
                break;

        }
    }

} 

export default Enemy;