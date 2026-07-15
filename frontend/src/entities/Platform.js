import GameObject from "./GameObject.js";

class Platform extends GameObject {

    constructor(x, y, width, height) {

        super(x, y, width, height);
    }

    render(context) {
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
export default Platform