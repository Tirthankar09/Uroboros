import GameObject from "./GameObject.js"
import Camera from "../camera/Camera.js"

class Platform extends GameObject {

    constructor(x, y, width, height) {

        super(x, y, width, height);
    }

    render(context, camera) {
        context.fillStyle = "white";
        context.fillRect(this.x - camera.x, this.y, this.width, this.height);
    }
}
export default Platform