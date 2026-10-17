import GameObject from "./GameObject";

class Floor extends GameObject {
    constructor(x, y, width, height, texture) {
        super(x, y, width, height);
        this.texture = texture;
    }

    render(context, camera) {
        context.fillStyle = "green";
        context.fillRect(this.x - camera.x, this.y, this.width, this.height-145);
        /*context.drawImage(this.texture, this.x - camera.x, this.y, this.width, this.height);*/

    }
}

export default Floor
