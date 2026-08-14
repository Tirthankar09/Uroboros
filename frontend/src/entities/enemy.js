import GameObject from "./GameObject";

class Enemy extends GameObject {
    constructor(assets) {

        super(300,550,100,210);
        this.spriteOffsetX = -150;
        this.spriteOffsetY = -110;
        this.spriteWidth = 400;
        this.spriteHeight = 400;
        this.health = 100;
        this.animations = {idle : [assets.get("enemyIdle1"), assets.get("enemyIdle2"), assets.get("enemyIdle3"), assets.get("enemyIdle4"), assets.get("enemyIdle5"), assets.get("enemyIdle6"), assets.get("enemyIdle7"), assets.get("enemyIdle8"), assets.get("enemyIdle9"), assets.get("enemyIdle10")]};
        this.currentAnimation = this.animations.idle;
        this.currentFrame = 0;
        this.frameDuration = 0.1;
        this.animationTimer = 0
    }

    render(context,camera) {

        if (!this.isDead()) {
            

            
            context.drawImage(this.currentAnimation[this.currentFrame], this.x - camera.x + this.spriteOffsetX, this.y + this.spriteOffsetY, this.spriteWidth, this.spriteHeight);
        }
    }

    takeDamage(damage){
        this.health -= damage;
    }

    isDead(){
        return this.health<=0;
    }
}

export default Enemy;