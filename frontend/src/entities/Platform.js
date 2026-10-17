import GameObject from "./GameObject.js"

class Platform extends GameObject {

    constructor(x, y, width, height, texture) {

        super(x, y, width, height);
        
        this.texture = texture;
    }

    render(context, camera) {
        context.drawImage(this.texture, this.x - camera.x, this.y, this.width, this.height);
    }
}
export default Platform