import GameObject from "./GameObject";

class MovingPlatform extends GameObject{
    constructor(x, y, width, height, speed, minX, maxX, texture) {
        super(x, y, width, height)

        this.speed = speed;
        this.minX = minX;
        this.maxX = maxX;
        this.texture = texture;
        this.direction = 1;
        this.previousX = this.x;
    }

    update(deltatime){
        this.previousX = this.x;

        this.x += this.speed * this.direction * deltatime;

        if(this.x >= this.maxX){
            this.x = this.maxX;
            this.direction = -1;
        }

        if(this.x <= this.minX){
            this.x = this.minX;
            this.direction = 1;
        }
    }

    render(context, camera){
        context.drawImage(this.texture, this.x-camera.x, this.y, this.width, this.height);
    }
}

export default MovingPlatform;