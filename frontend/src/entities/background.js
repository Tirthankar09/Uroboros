import GameObject from "./GameObject";

class Background extends GameObject {
    constructor(x, y, width, height, texture) {
        super(x, y, width, height);
        this.texture = texture;
    }

    render(context, camera) {

        context.drawImage(this.texture, this.x - camera.x, this.y, this.width, this.height);
    }
}

export default Background;