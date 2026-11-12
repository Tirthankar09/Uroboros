import GameObject from "./GameObject";

class CircularPlatform extends GameObject {
    constructor(centerX, centerY, radius, width, height, angle, angularSpeed, texture){
        super(centerX, centerY, width, height)

        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.angularSpeed = angularSpeed;
        this.texture = texture;
        this.angle = angle * (Math.PI / 180);
        this.previousX = this.x;
        this.previousY = this.y;

    }

    update(deltatime){

        this.previousX = this.x;
        this.previousY = this.y;

        this.angle += this.angularSpeed * deltatime;

        this.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.y = this.centerY + Math.sin(this.angle) * this.radius;
    }

    render(context, camera){
        context.fillStyle = "red";
        context.fillRect(this.x - camera.x, this.y, this.width, this.height);
    }

}

export default CircularPlatform;