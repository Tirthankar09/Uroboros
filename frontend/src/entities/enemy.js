import GameObject from "./GameObject";

class Enemy extends GameObject {
    constructor() {

        super(300,550,100,100);
        this.health = 100;

    }

    render(context,camera) {

        if (!this.isDead()) {

            context.strokeStyle = "blue";
            context.strokeRect(this.x - camera.x,this.y,this.width,this.height);
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