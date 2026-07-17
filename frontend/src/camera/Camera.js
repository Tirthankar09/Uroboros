class Camera {
    constructor(target, width, height, worldWidth) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.worldWidth = worldWidth
        this.x = 0;
        this.y = 0;
    }

    update() {

        if (this.target.x > this.width / 2) {

            this.x = this.target.x - this.width / 2;

        } else {
            
            this.x = 0;
        }

        if (this.x + this.width > this.worldWidth) {

            this.x = this.worldWidth - this.width;
        }

}
}
export default Camera